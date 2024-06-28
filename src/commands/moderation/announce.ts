// ping.ts

import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  GuildMember,
  TextChannel,
} from "discord.js";

export const name = "announce";
export const description = "announce a message to the server";
export const devOnly = false;
export const testOnly = false;
export const options = [
  {
    name: "message",
    description: "Progress made",
    type: ApplicationCommandOptionType.String,
    required: true,
  },
];
export const deleted = false;

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID!;
export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  const member = interaction.member as GuildMember;

  if (!member.roles.cache.has(ADMIN_ROLE_ID)) {
    await interaction.reply({
      content: "You do not have permission to use this command.",
      ephemeral: true,
    });
    return;
  }
  await interaction.deferReply();
  const message = interaction.options.get("message")!.value as string;

  const announcementChannelID = process.env.ANNOUNCEMENT_CHANNEL_ID;
  const announcementChannel = client.channels.cache.get(
    announcementChannelID!
  ) as TextChannel;

  announcementChannel!.send(message);

  await interaction.editReply({
    content: "Announcement sent!",
  });
}
