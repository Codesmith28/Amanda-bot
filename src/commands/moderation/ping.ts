// ping.ts
import { Client, CommandInteraction } from "discord.js";

export const name = "ping";
export const description = "pong";
export const devOnly = false;
export const testOnly = false;
export const options = [];
export const deleted = false;

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  await interaction.deferReply();
  await interaction.editReply({
    content: `Pong, ${interaction.member!.user}!`,
  });
}
