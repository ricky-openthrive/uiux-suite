import path from "node:path";
import fs from "fs-extra";

// ─── Config shape (lives in user's project as uiux.json) ───
export interface Config {
  registryUrl: string;
  aliases: {
    components: string;
    ui: string;
    utils: string;
    hooks: string;
  };
  tsx: boolean;
}

const CONFIG_FILE = "uiux.json";

const DEFAULT_REGISTRY_URL = "https://cxful-registry.ricky-l.workers.dev/";

const DEFAULT_CONFIG: Config = {
  registryUrl: DEFAULT_REGISTRY_URL,
  aliases: {
    components: "@/components",
    ui: "@/components/ui",
    utils: "@/lib",  
    hooks: "@/hooks",
  },
  tsx: true,
};

// ─── Read config from user's project ────────
export async function getConfig(
  cwd: string = process.cwd(),
): Promise<Config | null> {
  const filePath = path.resolve(cwd, CONFIG_FILE);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = await fs.readJSON(filePath);
    return { ...DEFAULT_CONFIG, ...raw };
  } catch {
    return null;
  }
}

// ─── Create default config in user's project ───
export async function createConfig(
  cwd: string = process.cwd(),
): Promise<Config> {
  const filePath = path.resolve(cwd, CONFIG_FILE);
  await fs.writeJSON(filePath, DEFAULT_CONFIG, { spaces: 2 });
  return DEFAULT_CONFIG;
}

// ─── Resolve where a file should be written ───
export function resolveFilePath(
  config: Config,
  target: string,
  cwd: string = process.cwd(),
): string {
  const normalizeAlias = (alias: string) =>
    alias.startsWith("@/") ? alias.replace("@/", "src/") : alias;

  let resolved = target;

  // UI components
  if (resolved.startsWith("components/ui/")) {
    resolved = resolved.replace(
      "components/ui",
      normalizeAlias(config.aliases.ui),
    );

  // Generic components
  } else if (resolved.startsWith("components/")) {
    resolved = resolved.replace(
      "components",
      normalizeAlias(config.aliases.components),
    );

  // Utils / lib (FIXED)
  } else if (resolved.startsWith("lib/")) {
    resolved = resolved.replace(
      "lib",
      normalizeAlias(config.aliases.utils),
    );

  // Hooks
  } else if (resolved.startsWith("hooks/")) {
    resolved = resolved.replace(
      "hooks",
      normalizeAlias(config.aliases.hooks),
    );
  }

  return path.resolve(cwd, resolved);
}