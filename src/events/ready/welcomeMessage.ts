import {
  Client,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} from "discord.js";
import saveErrorToDatabase from "../../utils/saveErrorToDatabase";

/**
 * @param {Client} client
 */
export default function welcomeMessage(client: Client) {
  try {
    // Selecting channel to send message
    const registrationChannel = client.channels.cache.get(
      process.env.REGISTRATION_CHANNEL_ID!
    );

    // Setting up the buttons
    const statement1 = new ButtonBuilder()
      .setCustomId(process.env.EASY_ROLE_ID || "")
      .setLabel("LEGENDS")
      .setStyle(ButtonStyle.Secondary);

    const statement2 = new ButtonBuilder()
      .setCustomId(process.env.MEDIUM1_ROLE_ID || "")
      .setLabel("LUXURY")
      .setStyle(ButtonStyle.Primary);

    const statement3 = new ButtonBuilder()
      .setCustomId(process.env.MEDIUM2_ROLE_ID || "")
      .setLabel("CULT")
      .setStyle(ButtonStyle.Success);

    const statement4 = new ButtonBuilder()
      .setCustomId(process.env.HARD_ROLE_ID || "")
      .setLabel("WANTED")
      .setStyle(ButtonStyle.Danger);

    const row1 = new ActionRowBuilder().addComponents(statement1, statement2);
    const row2 = new ActionRowBuilder().addComponents(statement3, statement4);

    const message =
      "🎉🌟 Welcome to the Website Making Challenge Discord Server! 🌟🎉\n\n We are thrilled to have you here, ready to embark on an exciting journey of creativity and innovation in web design! 🚀💻 \n\nIn this server, you will find a vibrant community of talented individuals who share a passion for crafting extraordinary websites. 🌐✨\n\nTo get started, we have assigned roles based on your preferred problem statement. This will help you connect with like-minded participants and foster collaboration. 🤝🌈\n\nPlease react to this message accordingly to find your preferred role. If you have any questions or need assistance, feel free to reach out to our friendly moderators or admins. They are here to guide and support you every step of the way! 🙌🔍\n\nThroughout the challenge, this server will be your hub for updates, announcements, discussions, and sharing your progress. We encourage you to engage, collaborate, and inspire one another. 🌟💡\n\nRemember, the journey is just as important as the destination. Embrace the challenges, learn from one another, and let your creativity soar! 🚀✨\n\nWe wish you the best of luck and look forward to witnessing the magic you bring to life through your web designs. Together, let's make this challenge an unforgettable experience! 🎩🌌\n\n";
    // return;
    // @ts-ignore
    registrationChannel?.send({
      content: message,
      components: [row1, row2],
    });

    return;
  } catch (error) {
    saveErrorToDatabase(error as any);
  }
}
