// welcome.ts
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from "discord.js";

export const name = "welcome";
export const description = "Welcome a user to the server";
export const devOnly = false;
export const testOnly = false;
export const options = [
  {
    name: "targeted-user",
    description: "The user you want to greet",
    type: ApplicationCommandOptionType.User,
    required: true,
  },
];
export const deleted = true;

export function callback(client: Client, interaction: CommandInteraction) {
  const targetUser = interaction.options.get("targeted-user")!.user;
  interaction.reply(
    `Welcome ${targetUser} to this magical Developers' Dungeon!`
  );
}
