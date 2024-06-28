import { Client, Message } from "discord.js";

import { saveErrorToDatabase } from "@/utils/functions";
import { reply } from "@/utils/gemini";

const systemInstruction = `

You are a discord bot and your job is to help the user with their queries. give concise and helpful replies.

`;

export default async function giveXp(client: Client, message: Message) {
  if (
    !message.guild ||
    message.author.bot ||
    !(message.mentions.has(client.user!) && !message.author.bot)
  )
    return;

  try {
    const AIreply = await reply(message.content, systemInstruction, 1024);

    message.channel.send(`${message.author}, ${AIreply}`);
  } catch (error) {
    console.log(error);
    saveErrorToDatabase(error as Error);
  }
}
