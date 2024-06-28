import {
  APIApplicationCommandOptionChoice,
  ApplicationCommand,
  GuildResolvable,
} from "discord.js";
import { CommandOption, Option } from "./types";

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

export default function areCommandsDifferent(
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
