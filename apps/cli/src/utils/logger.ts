import chalk from "chalk";

export const logger = {
  info(...args: unknown[]) {
    console.log(chalk.blue("i"), ...args);
  },
  success(...args: unknown[]) {
    console.log(chalk.green("✔"), ...args);
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow("⚠"), ...args);
  },
  error(...args: unknown[]) {
    console.log(chalk.red("✖"), ...args);
  },
  break() {
    console.log();
  },
  component(name: string) {
    console.log(chalk.cyan(`  ◦ ${name}`));
  },
  file(filePath: string) {
    console.log(chalk.gray(`    → ${filePath}`));
  },
};
