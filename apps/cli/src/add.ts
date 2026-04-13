import path from "node:path";
import fs from "fs-extra";
import prompts from "prompts";
import ora from "ora";
import chalk from "chalk";
import { execa } from "execa";
import { logger } from "./utils/logger.js";
import {
  getConfig,
  createConfig,
  resolveFilePath,
} from "./utils/config.js";
import {
  resolveComponents,
  fetchIndex,
} from "./utils/registry.js";
import { transformImports } from "./utils/transformer.js";
import {
  getPackageManager,
  getInstallArgs,
} from "./utils/get-package-manager.js";
import type { RegistryItem } from "./utils/registry.js";
import type { Config } from "./utils/config.js";

interface AddOptions {
  yes: boolean;
  overwrite: boolean;
  cwd: string;
  path?: string;
}

export async function add(components: string[], opts: AddOptions) {
  const cwd = path.resolve(opts.cwd);
  logger.break();

  // ─── 1. Load or create config ──────────────
  let config = await getConfig(cwd);

  if (!config) {
    logger.warn("No uiux.json found in this project.");

    const { shouldInit } = await prompts({
      type: "confirm",
      name: "shouldInit",
      message: "Create uiux.json with default config?",
      initial: true,
    });

    if (!shouldInit) {
      logger.error("Cannot proceed without config. Run init first.");
      process.exit(1);
    }

    config = await createConfig(cwd);
    logger.success("Created uiux.json");
    logger.break();
  }

  // ─── 2. If no components passed, show picker ───
  if (components.length === 0) {
    const spinner = ora("Fetching available components...").start();

    let index;
    try {
      index = await fetchIndex(config);
      spinner.stop();
    } catch (err: any) {
      spinner.fail("Failed to fetch component list");
      logger.error(err.message);
      process.exit(1);
    }

    const { selected } = await prompts({
      type: "multiselect",
      name: "selected",
      message: "Which components do you want to add?",
      choices: index.items.map((item) => ({
        title: `${chalk.cyan(item.name)} ${chalk.gray(
          `— ${item.description ?? item.type}`
        )}`,
        value: item.name,
      })),
      min: 1,
      hint: "Space to select, Enter to confirm",
    });

    if (!selected || selected.length === 0) {
      logger.warn("Nothing selected. Exiting.");
      process.exit(0);
    }

    components = selected;
  }

  // ─── 3. Resolve all components + dependencies ───
  const resolveSpinner = ora(
    "Resolving components and dependencies..."
  ).start();

  let resolved: RegistryItem[];
  try {
    resolved = await resolveComponents(components, config);
    resolveSpinner.succeed(
      `Resolved ${resolved.length} component${
        resolved.length !== 1 ? "s" : ""
      }`
    );
  } catch (err: any) {
    resolveSpinner.fail(err.message);
    process.exit(1);
  }

  // ─── 4. Show what will be installed ────────
  logger.break();
  logger.info("Components to install:");
  logger.break();

  const allDeps = new Set<string>();
  const allDevDeps = new Set<string>();

  for (const item of resolved) {
    logger.component(
      `${item.name} ${chalk.gray(`(${item.type})`)}`
    );
    for (const file of item.files) {
      const target = resolveFilePath(config!, file.target, cwd);
      logger.file(path.relative(cwd, target));
    }
    for (const d of item.dependencies) allDeps.add(d);
    for (const d of item.devDependencies) allDevDeps.add(d);
  }

  if (allDeps.size > 0) {
    logger.break();
    logger.info(
      `Dependencies: ${chalk.yellow([...allDeps].join(", "))}`
    );
  }
  if (allDevDeps.size > 0) {
    logger.info(
      `Dev dependencies: ${chalk.yellow(
        [...allDevDeps].join(", ")
      )}`
    );
  }

  logger.break();

  // ─── 5. Confirm ────────────────────────────
  if (!opts.yes) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: "Proceed with installation?",
      initial: true,
    });

    if (!proceed) {
      logger.warn("Aborted.");
      process.exit(0);
    }
  }

  // ─── 6. Write files ───────────────────────
  const writeSpinner = ora("Writing component files...").start();

  for (const item of resolved) {
    for (const file of item.files) {
      const targetPath = resolveFilePath(
        config!,
        file.target,
        cwd
      );

      // Check existing
      if (fs.existsSync(targetPath) && !opts.overwrite) {
        writeSpinner.stop();

        const { ow } = await prompts({
          type: "confirm",
          name: "ow",
          message: `${path.relative(
            cwd,
            targetPath
          )} already exists. Overwrite?`,
          initial: false,
        });

        if (!ow) {
          logger.warn(
            `Skipped ${path.relative(cwd, targetPath)}`
          );
          writeSpinner.start();
          continue;
        }

        writeSpinner.start();
      }

      // Transform imports to match user's aliases
      const content = transformImports(file.content, config!);

      // Write file
      await fs.ensureDir(path.dirname(targetPath));
      await fs.writeFile(targetPath, content, "utf-8");
    }
  }

  writeSpinner.succeed("Component files written!");

  // ─── 7. Install npm dependencies ──────────
  if (allDeps.size > 0 || allDevDeps.size > 0) {
    const pm = getPackageManager(cwd);
    const depSpinner = ora(
      `Installing dependencies with ${pm}...`
    ).start();

    try {
      if (allDeps.size > 0) {
        const args = [
          ...getInstallArgs(pm, false),
          ...allDeps,
        ];
        await execa(pm, args, { cwd });
      }

      if (allDevDeps.size > 0) {
        const args = [
          ...getInstallArgs(pm, true),
          ...allDevDeps,
        ];
        await execa(pm, args, { cwd });
      }

      depSpinner.succeed("Dependencies installed!");
    } catch {
      depSpinner.warn(
        "Auto-install failed. Install manually:"
      );
      if (allDeps.size > 0) {
        console.log(
          `    ${pm} ${getInstallArgs(pm, false).join(
            " "
          )} ${[...allDeps].join(" ")}`
        );
      }
      if (allDevDeps.size > 0) {
        console.log(
          `    ${pm} ${getInstallArgs(pm, true).join(
            " "
          )} ${[...allDevDeps].join(" ")}`
        );
      }
    }
  }

  // ─── 8. Done ──────────────────────────────
  logger.break();
  logger.success("Done! Components added to your project. 🎉");
  logger.break();
}
