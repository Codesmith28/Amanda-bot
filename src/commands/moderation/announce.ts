// ping.ts

import { reply } from "@/utils/gemini";
import { getSystemInstruction } from "@/utils/getSystemInstructions";
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
  {
    name: "channel",
    description: "Channel to send the announcement",
    type: ApplicationCommandOptionType.Channel,
    required: false,
  },
  {
    name: "ai-assistance",
    description: "Enable AI assistance for the message",
    type: ApplicationCommandOptionType.Boolean,
    required: false,
  },
];
export const deleted = false;

const announcementSystemPrompt = `
Now, You are an announcer for the server. you will be given some information to announce to the server. 
make sure your message is clear, concise, straight to the point, and not too long

`;

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
  let message: string;

  if (interaction.options.get("ai-assistance")?.value) {
    message = await reply(
      interaction.options.get("message")!.value as string,
      getSystemInstruction() + announcementSystemPrompt
    );
  } else {
    message = interaction.options.get("message")!.value as string;
  }
  if (interaction.options.get("channel")) {
    const channel = interaction.options.get("channel")!.channel!.id;
    const announcementChannel = client.channels.cache.get(
      channel
    ) as TextChannel;
    announcementChannel!.send(message);
    await interaction.editReply({
      content: "Announcement sent!",
    });
    return;
  }
  const announcementChannelID = process.env.ANNOUNCEMENT_CHANNEL_ID;
  const announcementChannel = client.channels.cache.get(
    announcementChannelID!
  ) as TextChannel;

  announcementChannel!.send(message);

  await interaction.editReply({
    content: "Announcement sent!",
  });
}
