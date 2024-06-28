import { MongoClient } from "mongodb";
import dotenv from "dotenv";

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
