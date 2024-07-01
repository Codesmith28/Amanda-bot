import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export function calculateLevelUpXp(level: number): number {
  return 100 * level || 1;
}

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function saveErrorToDatabase(error: Error): Promise<void> {
  console.log(error);
  const db = client.db("WMC5");

  try {
    const errorCollection = db.collection("errors");
    const result = await errorCollection.insertOne({
      error: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });

    console.log("Error saved to database:", result.insertedId);
  } catch (err) {
    console.error("Error saving error to database:", err);
  }
}

export function getAllFiles(
  directory: string,
  foldersOnly: boolean = false
): string[] {
  let fileNames: string[] = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
}

const envs = [
  "TOKEN",
  "GEMINI_API_KEY",
  "CLIENT_ID",
  "MONGODB_URI",
  "NODE_VERSION",
  "GUILD_ID",
  "MENTOR_ROLE_ID",
  "ADMIN_ROLE_ID",
  "REGISTRATION_CHANNEL_ID",
  "STATUS_CHANNEL_ID",
  "DAILYPROGRESS_CHANNEL_ID",
  "EASY_CHANNEL_ID",
  "MEDIUM1_CHANNEL_ID",
  "MEDIUM2_CHANNEL_ID",
  "HARD_CHANNEL_ID",
  "EASY_ROLE_ID",
  "MEDIUM1_ROLE_ID",
  "MEDIUM2_ROLE_ID",
  "HARD_ROLE_ID",
  "ANNOUNCEMENT_CHANNEL_ID",
  "CONTROL_CENTER_CHANNEL_ID",
];

export function verifyEnvVariables(): void {
  const missingEnvs = envs.filter((env) => !process.env[env]);

  if (missingEnvs.length > 0) {
    console.error("Missing environment variables:", missingEnvs);
    process.exit(1);
  }
}

export function formatDate(nextDate: Date) {
  const currentDate = new Date();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const isNextTomorrow =
    new Date(currentDate.getTime() + millisecondsPerDay).getDate() ===
    nextDate.getDate();

  const isNextToday = currentDate.getDate() === nextDate.getDate();
  console.log(currentDate.getDate(), nextDate.getDate());
  const timeString = nextDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let formattedDate = "";
  if (isNextTomorrow) {
    formattedDate = `Tomorrow ${timeString}`;
  } else if (isNextToday) {
    formattedDate = `Today ${timeString}`;
  } else {
    formattedDate = `${nextDate.toLocaleDateString()} ${timeString}`;
  }
  return formattedDate;
}
