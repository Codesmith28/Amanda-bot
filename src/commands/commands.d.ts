// commands.d.ts
import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
  PermissionResolvable,
} from "discord.js";

interface Command {
  name: string;
  description: string;
  devOnly: boolean;
  testOnly: boolean;
  options?: {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean;
  }[];
  deleted: boolean;
  botPermissions?: PermissionResolvable[];
  callback: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

export { Command };
