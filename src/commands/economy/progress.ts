import giveXp from "@/events/messageCreate/giveXp";
import User from "@/models/User";
import { formatDate, saveErrorToDatabase } from "@/utils/functions";
import { replyWithData } from "@/utils/gemini";
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from "discord.js";

const systemPrompt = `
SYSTEM:
- you are "Amanda, Michel's wife from GTA V"
- You are an AI discord bot (use discord markdown to format your text).

CONTEXT:
- The students have organized a Website Making challenge (WMC).
- The students everyday come to you and share their updates and progress in the challenge.

INPUT:
- Progress of the student
- userId of the participant (tag the user in the reply wherever you like)
- current daily progress points of the participant (mention this in reply)

OUTPUT RULES:
- follow the given OUTPUT FORMAT
- don't make the output longer then 30 words

OUTPUT FORMAT (if any progress):
[I like it, great work etc compliments. ] [mention them with bit of playfulness and flirty tone]
[talk about what they have done concisely]
Total Points: **[their progress points]**

OUTPUT FORMAT (if no progress at all):
Great work! [mention them and give them hope]
Total Points: **[their progress points]**
`;

export const name = "progress";
export const description = "Update your daily progress";
export const devOnly = false;
export const testOnly = false;
export const options = [
  {
    name: "updates",
    description: "Progress made",
    type: ApplicationCommandOptionType.String,
    required: true,
  },
];
export const deleted = false;

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  if (interaction.channelId !== process.env.DAILYPROGRESS_CHANNEL_ID) {
    await interaction.reply({
      content: `The command ${interaction.commandName} can only be used in <#${process.env.DAILYPROGRESS_CHANNEL_ID}> channel.`,
      ephemeral: true,
    });
    return;
  }

  try {
    const query = {
      userId: interaction.user.id,
      guildId: interaction.guild!.id,
    };

    let user = await User.findOne(query);

    if (user) {
      const lastDailyDate = user.lastDaily;
      const currentDate = new Date();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const timeDiff = currentDate.getTime() - lastDailyDate.getTime();

      if (timeDiff < millisecondsPerDay) {
        const nextDate = new Date(
          user.lastDaily.getTime() + millisecondsPerDay
        );

        await interaction.reply({
          content: `${
            interaction.user
          } You have already updated your progress. Please come back after **${formatDate(
            nextDate
          )}** to update again.`,
          ephemeral: true,
        });
        return;
      }

      user.data.push(interaction.options.get("updates")?.value as string);
      user.lastDaily = new Date();

      // Use giveXp function to add XP
      await giveXp(client, interaction as any, 25);
      
    } else {
      console.log("Creating new user");
      user = new User({
        ...query,
        lastDaily: new Date(),
        data: [interaction.options.get("updates")?.value as string],
        points: 25,
      });

      // Use giveXp function for new user as well
      await giveXp(client, interaction as any, 25);
    }

    user.points += 25;
    await user.save();

    await interaction.deferReply();
    const message = await replyWithData(
      interaction.options.get("updates")?.value as string,
      interaction.user.id,
      user.points,
      systemPrompt
    );

    if (message === "BhagulobsDobby") {
      await interaction.editReply({
        content: `Good progress, ${interaction.user}! You have earned 25 points. Your total points: ${user.points}`,
      });
    } else {
      await interaction.editReply({
        content: message,
      });
    }
  } catch (error) {
    console.error(error);
    saveErrorToDatabase(error as Error);
    await interaction.reply({
      content:
        "An error occurred while processing your command. Please try again later.",
      ephemeral: true,
    });
  }
}
