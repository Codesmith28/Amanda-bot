import path from "path";
import getAllFiles from "./getAllFiles";
import { CommandOption } from "./types";

export default function getLocalCommands(
  exceptions: string[] = []
): CommandOption[] {
  const localCommands: CommandOption[] = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const category of commandCategories) {
    const commandFiles = getAllFiles(category, false);

    for (const commandFile of commandFiles) {
      const commandObject: CommandOption = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }
      localCommands.push(commandObject);
    }
  }

  return localCommands;
}
