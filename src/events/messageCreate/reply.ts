import { Client, Message } from "discord.js";

import { saveErrorToDatabase } from "@/utils/functions";
import { reply } from "@/utils/gemini";
import { getSystemInstruction } from "@/utils/getSystemInstructions";

export default async function giveXp(client: Client, message: Message) {
  if (
    !message.guild ||
    message.author.bot ||
    !(message.mentions.has(client.user!) && !message.author.bot)
  )
    return;

  try {
    message.member?.roles.cache.map((role) => console.log(role.name));
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
      1024,
      message.author.username
    );

    message.channel.send(`${message.author}, ${AIreply}`);
  } catch (error) {
    console.log(error);
    saveErrorToDatabase(error as Error);
  }
}
