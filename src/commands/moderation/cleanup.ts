import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
  TextChannel,
  CommandInteractionOptionResolver,
  GuildMember,
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const DAILYPROGRESS_CHANNEL_ID = process.env.DAILYPROGRESS_CHANNEL_ID!;
const STATUS_CHANNEL_ID = process.env.STATUS_CHANNEL_ID!;
const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID!;

module.exports = {
  name: "clear",
  description:
    "Clears messages in specific channels based on the provided prompt",
  devOnly: false,
  testOnly: false,
  options: [
    {
      name: "prompt",
      description: "The prompt to determine which channel to clear",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Daily Progress",
          value: "d",
        },
        {
          name: "Status",
          value: "s",
        },
      ],
    },
  ],
  deleted: false,

  callback: async (client: Client, interaction: CommandInteraction) => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const prompt = options.getString("prompt");
    const member = interaction.member as GuildMember;

    if (!member.roles.cache.has(ADMIN_ROLE_ID)) {
      await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
      return;
    }

    let channelId: string | null = null;
    if (prompt === "d") {
      channelId = DAILYPROGRESS_CHANNEL_ID;
    } else if (prompt === "s") {
      channelId = STATUS_CHANNEL_ID;
    }

    if (channelId) {
      const channel = client.channels.cache.get(channelId) as TextChannel;

      if (channel) {
        await interaction.deferReply();

        try {
          const fetchedMessages = await channel.messages.fetch({ limit: 100 });
          await channel.bulkDelete(fetchedMessages);
          await interaction.editReply({
            content: `Cleared messages in ${channel.name}.`,
          });
        } catch (error) {
          console.error("Failed to clear messages:", error);
          await interaction.editReply({
            content: `Failed to clear messages in ${channel.name}.`,
          });
        }
      } else {
        await interaction.reply({
          content: "Channel not found.",
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: "Invalid prompt provided.",
        ephemeral: true,
      });
    }
  },
};
