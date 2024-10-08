import {
  areCommandsDifferent,
  getLocalCommands,
  getApplicationCommands,
} from "@/utils/commandFunctions";

import { saveErrorToDatabase } from "@/utils/functions";

import { testServer } from "../../../config.json";
import { Client, ApplicationCommand } from "discord.js";

export default async function manageCommands(client: Client): Promise<void> {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options, deleted } = localCommand;

      const existingCommand = applicationCommands.cache.find(
        (cmd: ApplicationCommand) => cmd.name === name
      );

      if (existingCommand) {
        if (deleted) {
          // To delete the command
          await applicationCommands.delete(existingCommand.id);
          console.log(`Command ${name} deleted 🗑️`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          // To update the command
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`Command ${name} edited 🔂`);
        }
      } else {
        if (deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}".`);
      }
    }
  } catch (error) {
    saveErrorToDatabase(error as Error);
  }
}
