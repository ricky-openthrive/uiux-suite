import path from "node:path";
import fs from "fs-extra";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export function getPackageManager(cwd: string = process.cwd()): PackageManager {
  if (
    fs.existsSync(path.join(cwd, "bun.lockb")) ||
    fs.existsSync(path.join(cwd, "bun.lock"))
  )
    return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function getInstallArgs(
  pm: PackageManager,
  isDev: boolean
): string[] {
  switch (pm) {
    case "bun":
      return isDev ? ["add", "-d"] : ["add"];
    case "pnpm":
      return isDev ? ["add", "-D"] : ["add"];
    case "yarn":
      return isDev ? ["add", "--dev"] : ["add"];
    default:
      return isDev ? ["install", "-D"] : ["install"];
  }
}
