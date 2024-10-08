// test.ts
import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { replyWithData } from "@/utils/gemini";
import { saveErrorToDatabase } from "@/utils/functions";

export const name = "test";
export const description = "Testing new features";
export const devOnly = false;
export const testOnly = false;
export const options = [
  {
    name: "updates",
    description: "Progress made",
    type: ApplicationCommandOptionType.String,
    required: true,
  },
];
export const deleted = true;

export async function callback(
  client: Client,
  interaction: CommandInteraction
) {
  try {
    await interaction.deferReply();

    if (interaction.channelId !== "1134034886240518205") {
      await interaction.editReply("This command can't be used here.");
      return;
    }

    if (interaction.user.id !== "508258668312002574") {
      await interaction.editReply(
        "Only the server admin can run this command."
      );
      return;
    }

    const message = await replyWithData(
      interaction.options.get("updates") as any,
      interaction.user.id,
      25,
      "hi"
    );
    await interaction.editReply(message);
  } catch (error) {
    console.error(error);
    saveErrorToDatabase(error as Error);
  }
}
