import { CommandInteraction } from "discord.js";

const User = require("../../models/User");
const saveErrorToDatabase = require("../../utils/saveErrorToDatabase");
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
} = require("discord.js");
const reply = require("../../utils/reply");

module.exports = {
  name: "progress",
  description: "Update your daily progress",
  devOnly: false,
  testOnly: false,
  options: [
    {
      name: "updates",
      description: "Progress made",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  deleted: false,
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client: typeof Client, interaction: CommandInteraction) => {
    // Ensure the command is used in the correct channel
    if (interaction.channelId !== process.env.DAILYPROGRESS_CHANNEL_ID) {
      interaction.reply({
        content: `The command ${interaction.commandName} can only be used in <#${process.env.DAILYPROGRESS_CHANNEL_ID}> channel.`,
        ephemeral: true,
      });
      return;
    }

    try {
      const query = {
        // @ts-ignore
        userId: interaction.member!.id,
        guildId: interaction.guild!.id,
      };

      let user = await User.findOne(query);

      if (user) {
        // Check if the user has already updated progress today (disabled in your original code)
        // const lastDailyDate = user.lastDaily.toDateString();
        // const currentDate = new Date().toDateString();
        // if (lastDailyDate === currentDate) {
        //     interaction.reply({
        //         content: `${interaction.member.user}, you have already updated your progress today.`,
        //         ephemeral: true,
        //     });
        //     return;
        // }

        // Update user data and points
        user.data.push(interaction.options.get("updates")!.value);
        user.lastDaily = new Date();
      } else {
        // If user document doesn't exist, create a new one
        user = new User({
          ...query,
          lastDaily: new Date(),
          data: [interaction.options.get("updates")!.value],
          points: 25, // Initial points for new users
        });
      }

      // Add daily points
      user.points += 25;

      // Save user data
      await user.save();

      // Respond to the interaction
      interaction.deferReply();
      const message = await reply(
        interaction.options.get("updates")!.value,
        interaction.user.id,
        user.points
      );
      if (message === "BhagulobsDobby") {
        interaction.editReply({
          content: `Good progress, ${
            interaction.member!.user
          }! You have earned 25 points. Your total points: ${user.points}`,
        });
      } else {
        interaction.editReply({
          content: message,
        });
      }
    } catch (error) {
      // Handle and log errors
      console.error(error);
      saveErrorToDatabase(error);
      interaction.reply({
        content:
          "An error occurred while processing your command. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
