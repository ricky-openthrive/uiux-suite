import type { Config } from "./config.js";

// Transform component source code imports to match user's aliases
export function transformImports(
  content: string,
  config: Config
): string {
  let result = content;

  // @/lib/utils → user's utils alias
  result = result.replace(
    /from\s+["']@\/lib\/utils["']/g,
    `from "${config.aliases.utils}"`
  );

  // @/components/ui/<name> → user's ui alias/<name>
  result = result.replace(
    /from\s+["']@\/components\/ui\/([^"']+)["']/g,
    `from "${config.aliases.ui}/$1"`
  );

  // @/components/<name> → user's components alias/<name>
  result = result.replace(
    /from\s+["']@\/components\/([^"']+)["']/g,
    `from "${config.aliases.components}/$1"`
  );

  // @/hooks/<name> → user's hooks alias/<name>
  result = result.replace(
    /from\s+["']@\/hooks\/([^"']+)["']/g,
    `from "${config.aliases.hooks}/$1"`
  );

  return result;
}
