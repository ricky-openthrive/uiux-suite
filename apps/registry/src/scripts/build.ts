import fs from "node:fs";
import path from "node:path";
import { registry } from "../registry/index.js";

const ROOT = process.cwd();

const UI_ROOT = path.resolve(ROOT, "../../packages/ui/src");

const OUT = path.resolve(ROOT, "dist/r");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function resolveFile(filePath: string) {
  return path.join(UI_ROOT, filePath);
}

function main() {
  console.log("\nBuilding registry JSON...\n");
  ensureDir(OUT);

  for (const entry of registry) {
    const files = entry.files.map((f) => {
      const fullPath = resolveFile(f.path);

      if (!fs.existsSync(fullPath)) {
        throw new Error(`❌ File not found: ${fullPath}`);
      }

      return {
        path: f.path,
        target: f.target,
        type: f.type,
        content: fs.readFileSync(fullPath, "utf-8"),
      };
    });

    const json = {
      name: entry.name,
      type: entry.type,
      title: entry.title,
      description: entry.description,
      dependencies: entry.dependencies,
      devDependencies: entry.devDependencies,
      registryDependencies: entry.registryDependencies,
      files,
    };

    const outPath = path.join(OUT, `${entry.name}.json`);
    fs.writeFileSync(outPath, JSON.stringify(json, null, 2));
    console.log(`✔ ${entry.name}.json`);
  }

  // index.json
  const index = {
    name: "uiux-registry",
    items: registry.map((e) => ({
      name: e.name,
      type: e.type,
      title: e.title,
      description: e.description,
      dependencies: e.dependencies,
      registryDependencies: e.registryDependencies,
    })),
  };

  fs.writeFileSync(
    path.join(OUT, "index.json"),
    JSON.stringify(index, null, 2)
  );

  console.log(`✔ index.json`);
  console.log(`\nBuilt ${registry.length} components → dist/r/\n`);
}

main();