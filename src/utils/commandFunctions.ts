import {
  APIApplicationCommandOptionChoice,
  ApplicationCommand,
  ApplicationCommandManager,
  Client,
  GuildApplicationCommandManager,
  GuildResolvable,
} from "discord.js";
import { CommandOption, Option } from "./types";
import path from "path";
import { getAllFiles } from "./functions";

function areChoicesDifferent(
  existingChoices: APIApplicationCommandOptionChoice[],
  localChoices: APIApplicationCommandOptionChoice[]
): boolean {
  for (const localChoice of localChoices) {
    const existingChoice = existingChoices?.find(
      (choice) => choice.name === localChoice.name
    );

    if (!existingChoice) {
      return true;
    }

    if (localChoice.value !== existingChoice.value) {
      return true;
    }
  }
  return false;
}

function areOptionsDifferent(
  existingOptions: Option[],
  localOptions: CommandOption[]
): boolean {
  for (const localOption of localOptions) {
    const existingOption = existingOptions?.find(
      (option) => option.name === localOption.name
    );

    if (!existingOption) {
      return true;
    }

    if (
      localOption.description !== existingOption.description ||
      localOption.type !== existingOption.type ||
      (localOption.required || false) !== existingOption.required ||
      (localOption.choices?.length || 0) !==
        (existingOption.choices?.length || 0) ||
      areChoicesDifferent(
        localOption.choices || [],
        existingOption.choices || []
      )
    ) {
      return true;
    }
  }
  return false;
}

export function areCommandsDifferent(
  existingCommand: ApplicationCommand<{
    guild: GuildResolvable;
  }>,
  localCommand: CommandOption
): boolean {
  if (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(
      existingCommand.options as Option[],
      localCommand.options || []
    )
  ) {
    return true;
  }

  return false;
}

export function getLocalCommands(exceptions: string[] = []): CommandOption[] {
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

export async function getApplicationCommands(
  client: Client,
  guildID?: string
): Promise<GuildApplicationCommandManager | ApplicationCommandManager> {
  let applicationCommands:
    | GuildApplicationCommandManager
    | ApplicationCommandManager;

  if (guildID) {
    try {
      // Log the guild ID being fetched
      console.log(`Fetching commands for guild ID: ${guildID}`);
      const guild = await client.guilds.fetch(guildID);
      applicationCommands = guild.commands;
    } catch (error) {
      console.error(`Failed to fetch guild with ID: ${guildID}`, error);
      throw error;
    }
  } else {
    console.log("Fetching application commands");
    applicationCommands = client.application!.commands;
  }

  try {
    await applicationCommands.fetch({});
  } catch (error) {
    console.error("Failed to fetch application commands", error);
    throw error;
  }

  return applicationCommands;
}
