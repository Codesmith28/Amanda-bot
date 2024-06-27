import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from "discord.js";

module.exports = {
  name: "welcome",
  description: "Welcome a user to the server",
  devOnly: false,
  testOnly: false,
  options: [
    {
      name: "targeted-user",
      description: "The user you want to greet",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  deleted: true, // Assuming this is for internal tracking, if the command is deleted

  callback: (client: Client, interaction: CommandInteraction) => {
    const targetUser = interaction.options.get("targeted-user")!.user;
    interaction.reply(
      `Welcome ${targetUser} to this magical Developers' Dungeon!`
    );
  },
};
