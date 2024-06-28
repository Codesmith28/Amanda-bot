// roleassignment.ts
import { Client, CommandInteraction, PermissionFlagsBits } from "discord.js";
import Level from "../../models/Level";
import { saveErrorToDatabase } from "../../utils/functions";

export const name = "roleassignment";
export const description = "Will assign roles to members";
export const devOnly = false;
export const testOnly = false;
export const options = [];
export const deleted = false;
export const botPermissions = [PermissionFlagsBits.ManageRoles];

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  try {
    await interaction.deferReply({ ephemeral: true });

    //   @ts-ignore
    const role = interaction.guild!.roles.cache.get(interaction.customId);
    if (!role) {
      await interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const query = {
      username: interaction.user.username,
    };

    const level = await Level.findOne(query);

    if (level) {
      // @ts-ignore
      await interaction.member!.roles.add(role);
      level.role = role.name;
      await level.save().catch((e) => {
        console.log(`Error saving updated level ${e}`);
      });

      await interaction.editReply({
        content: `You got the role of ${role.name} successfully`,
      });
    } else {
      await interaction.editReply({
        content: `You are not eligible for the role of ${role.name}`,
      });
    }
  } catch (error) {
    saveErrorToDatabase(error as Error);
  }
}
