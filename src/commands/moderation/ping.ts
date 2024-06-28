import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
} from "discord.js";

module.exports = {
  name: "ping",
  description: "pong",
  devOnly: false,
  testOnly: false,
  // options: [{    }],
  deleted: false,

  callback: async (client: Client, interaction: CommandInteraction) => {
    await interaction.deferReply();
    await interaction.editReply({
      content: `Pong, ${interaction.member!.user}! `,
    });
    return;
  },
};
