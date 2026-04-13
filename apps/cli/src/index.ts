import { Command } from "commander";
import { add } from "./add.js";

const program = new Command();

program
  .name("uiux-cli")
  .description("Add React Aria components to your project")
  .version("1.0.0");

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Component names to install")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .option("-o, --overwrite", "Overwrite existing files", false)
  .option(
    "-c, --cwd <path>",
    "Working directory",
    process.cwd()
  )
  .option("-p, --path <path>", "Custom output directory")
  .action(add);

program.parse();
