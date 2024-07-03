import { Client, CommandInteraction, Guild, GuildMember } from "discord.js";
import Level from "@/models/Level";

export const name = "rename";
export const description = "rename all the users from the database";
export const devOnly = false;
export const testOnly = false;
export const deleted = true;
const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID!;

async function findMemberByUsername(guild: Guild, username: string) {
  try {
    // Fetch all members of the guild
    const members = await guild.members.fetch();

    // Find the member with the given username
    const member = members.find((member) => member.user.username === username);

    if (member) {
      console.log(`Found member: ${member.user.tag}`);
      return member;
    } else {
      console.log(`No member found with username: ${username}`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch members for guild: ${guild.name}`, error);
  }
}

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  const member = interaction.member as GuildMember;
  if (!interaction.guild) {
    await interaction.reply({
      content: "This command can only be used in a server.",
      ephemeral: true,
    });
    return;
  }

  if (!member.roles.cache.has(ADMIN_ROLE_ID)) {
    await interaction.reply({
      content: "You do not have permission to use this command.",
      ephemeral: true,
    });
    return;
  }
  await interaction.deferReply();
  const userData = await Level.find();

  for (const user of userData) {
    const member = await findMemberByUsername(interaction.guild, user.username);
    if (member) {
      await member.setNickname(user.name);
    }
  }

  await interaction.editReply({
    content: "All users have been renamed.",
  });

  //   await interaction.editReply({
  //     content: content.join("\n"),
  //   });
}
