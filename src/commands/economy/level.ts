// level.ts
import {
  Client,
  ApplicationCommandOptionType,
  GuildMember,
  CommandInteraction,
  AttachmentBuilder,
  User,
} from "discord.js";
import canvacord from "canvacord";
import { calculateLevelUpXp } from "@/utils/functions";
import { saveErrorToDatabase } from "@/utils/functions";
import Level from "@/models/Level";

function getRole(targetUserObj: GuildMember): string {
  const authorRoles = targetUserObj.roles.cache;
  let roleArr: string[] = [];
  authorRoles.forEach((role) => {
    roleArr.push(role.name);
  });
  return roleArr[0];
}

export const name = "level";
export const description = "Shows XP and level of a user.";
export const devOnly = false;
export const testOnly = false;
export const options = [
  {
    name: "target-user",
    description: "User whose level you want to see.",
    type: ApplicationCommandOptionType.User,
    required: false,
  },
];
export const deleted = false;

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  try {
    await interaction.deferReply();

    // Ensure the command is only run in the specified status channel
    if (interaction.channelId !== process.env.STATUS_CHANNEL_ID) {
      await interaction.editReply(
        "You can only run this command in the status channel"
      );
      return;
    }

    let targetUser = interaction.member;

    let targetUserObj = await interaction.guild!.members.fetch(
      targetUser!.user.id
    );

    // If 'target-user' option is provided, fetch the user object
    if (interaction.options.get("target-user")) {
      // @ts-ignore
      targetUser = interaction.options.get("target-user")!.user as User;
      // @ts-ignore
      targetUserObj = await interaction.guild!.members.fetch(targetUser!.id);
    }

    // Fetch level data from the database
    const fetchedLevel = await Level.findOne({
      username: targetUserObj.user.username,
      //   role: getRole(targetUserObj),
    });

    // Fetch all levels and sort them based on level and XP
    let allLevels = await Level.find().select("-_id username level xp");
    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    // Determine the current rank of the user
    let currentRank =
      allLevels.findIndex((lvl) => lvl.username === fetchedLevel!.username) + 1;

    // Generate the rank card using Canvacord
    const rank = new canvacord.Rank()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel!.level)
      .setCurrentXP(fetchedLevel!.xp)
      .setRequiredXP(calculateLevelUpXp(fetchedLevel!.level))
      .setProgressBar("#800000", "COLOR")
      .setUsername(fetchedLevel!.username)
      .setDiscriminator(targetUserObj.user.discriminator);

    // Build the rank card image
    const data = await rank.build();
    const attachment = new AttachmentBuilder(data, "rank.png" as any);

    // Send the rank card as a reply to the interaction
    await interaction.editReply({ files: [attachment] });
  } catch (error) {
    console.error(error);
    saveErrorToDatabase(error as Error);
  }
}
