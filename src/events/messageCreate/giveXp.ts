import { Client, Collection, Message, Role, TextChannel } from "discord.js";

import { calculateLevelUpXp, getRoleName } from "@/utils/functions";
import { saveErrorToDatabase } from "@/utils/functions";
import Level from "@/models/Level";

const cooldowns = new Set();
// const roleDistribution = require('@/utils/roleDistribution');

function getRandomXp(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function giveXp(client: Client, message: Message) {
  if (
    !message.guild ||
    message.author.bot ||
    cooldowns.has(message.author.id) ||
    getRoleName(message).includes("admin") ||
    getRoleName(message).includes("mentors")
  ) {
    return;
  }

  const xpToGive = getRandomXp(1, 15);

  const query = {
    username: message.author.username,
  };

  try {
    const level = await Level.findOne(query);
    if (level) {
      level.xp += xpToGive;

      if (level.xp > calculateLevelUpXp(level.level)) {
        level.xp = 0;
        level.level += 1;
        const statusChannelID = process.env.STATUS_CHANNEL_ID;
        const statusChannel = client.channels.cache.get(
          statusChannelID!
        ) as TextChannel;

        statusChannel!.send(
          `${message.member} you have leveled up to **level ${level.level}**.`
        );
      }

      await level.save().catch((e: Error) => {
        console.log(`Error saving updated level ${e}`);
        return;
      });
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 60000);
    } else {
      //   get the control-center channel
      const controlCenterChannel = client.channels.cache.get(
        process.env.CONTROL_CENTER_CHANNEL_ID!
      ) as TextChannel;

      controlCenterChannel.send(
        `${message.member} haven't registered in the db`
      );
      //message.channel.send(
      //    `${message.author} you haven't registered in the db`,
      //);
    }
  } catch (error) {
    saveErrorToDatabase(error as Error);
  }
}
