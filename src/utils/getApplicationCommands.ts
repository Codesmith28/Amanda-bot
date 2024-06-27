import {
  Client,
  GuildApplicationCommandManager,
  ApplicationCommandManager,
} from "discord.js";

const getApplicationCommands = async (
  client: Client,
  guildID?: string
): Promise<GuildApplicationCommandManager | ApplicationCommandManager> => {
  let applicationCommands:
    | GuildApplicationCommandManager
    | ApplicationCommandManager;

  if (guildID) {
    try {
      // Log the guild ID being fetched
      console.log(`Fetching commands for guild ID: ${guildID}`);
      const guild = await client.guilds.fetch(guildID);
      applicationCommands = guild.commands;
    } catch (error) {
      console.error(`Failed to fetch guild with ID: ${guildID}`, error);
      throw error;
    }
  } else {
    console.log("Fetching application commands");
    applicationCommands = client.application!.commands;
  }

  try {
    await applicationCommands.fetch({});
  } catch (error) {
    console.error("Failed to fetch application commands", error);
    throw error;
  }

  return applicationCommands;
};

export default getApplicationCommands;
