import { Client, CommandInteraction, GuildMember } from "discord.js";
import { ProblemRole } from "@/utils/types";
import Level, { LevelDocument } from "@/models/Level";
export const name = "reassign";
export const description = "assign the roles from the database to the user";
export const devOnly = false;
export const testOnly = false;
export const options = [];
export const deleted = false;

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID!;

const roleMap: {
  [key in ProblemRole]: string;
} = {
  easy: process.env.EASY_ROLE_ID!,
  "medium-1": process.env.MEDIUM1_ROLE_ID!,
  "medium-2": process.env.MEDIUM2_ROLE_ID!,
  hard: process.env.HARD_ROLE_ID!,
};

async function getAllUsernamesByRole(role: ProblemRole): Promise<string[]> {
  const users = (await Level.find({ role })) as LevelDocument[];
  const usernames = users.map((user) => user.username);
  return usernames;
}
function getRoleIds(member: GuildMember): string[] {
  return member.roles.cache.map((role) => role.id);
}

function arrayIntersection<T>(array1: T[], array2: T[]): T[] {
  return array1.filter((value) => array2.includes(value));
}
function mentionRoleId(roleId: string): string {
  return `<@&${roleId}>`;
}

async function assignRoleToUsers(
  interaction: CommandInteraction,
  roleID: string,
  usernames: string[]
) {
  const guild = interaction.guild;
  if (!guild) {
    await interaction.editReply({
      content: "Guild not found.",
    });
    return;
  }

  try {
    const members = await guild.members.fetch();

    const usernameList = usernames.map((username) => username.trim());
    const content: string[] = [];

    for (const username of usernameList) {
      const guildMember = members.find((m) => m.user.username === username);
      if (guildMember) {
        const roleIds = getRoleIds(guildMember);
        const commonRoles = arrayIntersection(roleIds, Object.values(roleMap));
        console.log(commonRoles);
        if (commonRoles.length == 1 && commonRoles[0] == roleID) {
          content.push(
            `${
              guildMember.user
            } Already has the role ${guildMember.roles.cache.get(roleID)}`
          );
          continue;
        } else if (commonRoles.length == 0) {
          await guildMember.roles.add(roleID);
          content.push(
            `Assign Role ${mentionRoleId(roleID)} to ${guildMember.user}`
          );
        } else {
          await guildMember.roles.remove(commonRoles);
          await guildMember.roles.add(roleID);
          content.push(
            `**Reassign** Role ${mentionRoleId(roleID)} to ${guildMember.user}`
          );
        }
      } else {
        content.push(`User ${username} not found`);
        console.log(`User ${username} not found`);
      }
    }
    return content;
  } catch (error) {
    console.error("Error fetching guild members or assigning roles:", error);
    await interaction.editReply({
      content: "An error occurred while assigning roles.",
    });
    return;
  }
}

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  const member = interaction.member as GuildMember;

  console.log("object");
  if (!member.roles.cache.has(ADMIN_ROLE_ID)) {
    await interaction.reply({
      content: "You do not have permission to use this command.",
      ephemeral: true,
    });
    return;
  }

  await interaction.deferReply();
  const content: string[] = [];
  // Getting the role ID and list of usernames from interaction options
  for (const role of Object.keys(roleMap)) {
    const usernames = await getAllUsernamesByRole(role as ProblemRole);
    console.log(usernames);
    const roleID = roleMap[role as ProblemRole];
    const newContent = await assignRoleToUsers(interaction, roleID, usernames);
    if (newContent) {
      content.push(...newContent);
    }
  }
  console.log(content);
  await interaction.editReply({
    content: content.join("\n"),
  });
}
