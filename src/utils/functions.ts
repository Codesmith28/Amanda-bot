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
