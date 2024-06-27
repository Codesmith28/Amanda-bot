import reply from "../../utils/reply";
import {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import saveErrorToDatabase from "../../utils/saveErrorToDatabase";

module.exports = {
  name: "test",
  description: "Testing new features",
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
  callback: async (client: Client, interaction: CommandInteraction) => {
    try {
      await interaction.deferReply();

      // Check if command is used in the correct channel
      if (interaction.channelId !== "1134034886240518205") {
        interaction.editReply("This command can't be used here.");
        return;
      }

      // Check if user is the server admin
      if (interaction.user.id !== "508258668312002574") {
        interaction.editReply("Only the server admin can run this command.");
        return;
      }

      // Process the updates using the reply function
      const message = await reply(
        interaction.options.get("updates")!.value as string,
        interaction.user.id,
        25
      );

      // Update the interaction with the processed message
      interaction.editReply(message);
      return;
    } catch (error) {
      console.error(error);
      saveErrorToDatabase(error as Error);
    }
  },
};
