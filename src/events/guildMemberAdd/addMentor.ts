import {
  Client,
  GuildMember,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import Level from "../../models/Level";
import saveErrorToDatabase from "../../utils/saveErrorToDatabase";

/**
 * @param {Client} client
 * @param {GuildMember} member
 */
export default async function assignMentorRole(
  client: Client,
  member: GuildMember
) {
  const registrationChannel = client.channels.cache.get(
    process.env.REGISTRATION_CHANNEL_ID!
  );
  try {
    const memberUsername = member.user.username;
    const query = {
      username: memberUsername,
      role: "wmc-mentor",
    };

    const level = await Level.findOne(query);
    if (level) {
      await member.roles.add(process.env.MENTOR_ROLE_ID!);
    }
    return;
  } catch (error) {
    saveErrorToDatabase(error);
  }
}
