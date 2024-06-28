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
  deleted: true,

  callback: (client: Client, interaction: CommandInteraction) => {
    interaction.reply("pong");
    return;
  },
};
