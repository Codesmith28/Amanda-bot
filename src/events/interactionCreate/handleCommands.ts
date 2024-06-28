import { Client, Interaction, Snowflake } from "discord.js";
import { devs, testServer } from "../../../config.json";
import getLocalCommands from "../../utils/getLocalCommands";
import { saveErrorToDatabase } from "../../utils/functions";
import { CommandOption } from "../../utils/types";

export default async function handleInteraction(
  client: Client,
  interaction: Interaction
): Promise<void> {
  const localCommands: CommandOption[] = getLocalCommands();

  if (interaction.isCommand()) {
    try {
      const commandObject = localCommands.find(
        (cmd) => cmd.name === interaction.commandName
      );

      if (!commandObject) return;
      //   @ts-ignore
      if (commandObject.devOnly && !devs.includes(interaction.member!.id)) {
        await interaction.reply({
          content: "This command can be used by Devs only",
          ephemeral: true,
        });
        return;
      }

      if (commandObject.testOnly && testServer !== interaction.guild?.id) {
        await interaction.reply({
          content: "This command cannot be run here",
          ephemeral: true,
        });
        return;
      }

      if (commandObject.permissionsRequired?.length) {
        for (const permission of commandObject.permissionsRequired) {
          // @ts-ignore
          if (!interaction.member?.permissions.has(permission)) {
            await interaction.reply({
              content: "Not enough permissions",
              ephemeral: true,
            });
            return;
          }
        }
      }

      if (commandObject.botPermissions?.length) {
        // @ts-ignore
        const bot = interaction.guild?.me;
        if (!bot) return;

        for (const permission of commandObject.botPermissions) {
          if (!bot.permissions.has(permission)) {
            await interaction.reply({
              content: "I don't have enough permissions",
              ephemeral: true,
            });
            return;
          }
        }
      }

      await commandObject.callback(client, interaction);
    } catch (error) {
      saveErrorToDatabase(error as Error);
    }
  } else if (interaction.isButton()) {
    try {
      if (
        interaction.channelId === process.env.REGISTRATION_CHANNEL_ID &&
        interaction.message.author.bot
      ) {
        const commandObject = localCommands.find(
          (cmd) => cmd.name === "roleassignment"
        );
        if (commandObject) {
          await commandObject.callback(client, interaction);
        }
      }
    } catch (error) {
      saveErrorToDatabase(error as Error);
    }
  }
}
