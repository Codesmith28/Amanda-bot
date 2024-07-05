import { Client, Message } from "discord.js";

import { saveErrorToDatabase } from "@/utils/functions";
import { reply } from "@/utils/gemini";
import { getSystemInstruction } from "@/utils/getSystemInstructions";

export default async function giveXpAmandaReply(
  client: Client,
  message: Message
) {
  //   respond to DMs

  if (
    !message.guild ||
    message.author.bot ||
    (!(message.mentions.has(client.user!) && !message.author.bot) &&
      !message.content.toLowerCase().includes("amanda")) ||
    message.mentions.everyone
  )
    return;

  try {
    const AIreply = await reply(
      message.content,
      getSystemInstruction({
        currentTime: new Date().toISOString(),
        username: message.author.username,
        Roles: message.member?.roles.cache.map((role) => {
          if (role.name !== "@everyone" && role.name !== "admin")
            return role.name;
        }),
      }),
      128,
      message.author.username
    );

    message.channel.send(`${message.author}, ${AIreply}`);
  } catch (error) {
    if ((error as Error).name === "GoogleGenerativeAIFetchError") {
      message.channel.send(
        `${message.author}, I'm sorry, I'm having trouble connecting to the internet right now. Please try again later.`
      );
      return;
    }
    console.log(error);
    saveErrorToDatabase(error as Error);
  }
}
