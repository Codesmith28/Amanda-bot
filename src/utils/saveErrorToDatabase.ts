import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { CustomError } from "./types";

dotenv.config();

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

const logErrorToDatabase = async (error: Error): Promise<void> => {
  throw error;
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
};

export default logErrorToDatabase;
