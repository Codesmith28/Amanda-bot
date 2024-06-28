import {
  APIApplicationCommandOptionChoice,
  ApplicationCommandOption,
  Client,
  Interaction,
  Snowflake,
} from "discord.js";

export interface CommandOption {
  name: string;
  description: string;
  type: number;
  required?: boolean;
  choices?: APIApplicationCommandOptionChoice[];
  options?: CommandOption[];
  devOnly?: boolean;
  testOnly?: boolean;
  permissionsRequired?: Snowflake[];
  botPermissions?: Snowflake[];
  callback: (client: Client, interaction: Interaction) => Promise<void>;
  deleted: boolean;
}
export type Option = ApplicationCommandOption & {
  nameLocalized?: string | undefined;
  descriptionLocalized?: string | undefined;
  required?: boolean;
  choices?: APIApplicationCommandOptionChoice[];
};
