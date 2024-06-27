import dotenv from "dotenv";
import { Client, IntentsBitField, ActivityType } from "discord.js";
import mongoose from "mongoose";
import eventHandler from "./handlers/eventHandler";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

async function loginBot() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI!, { keepAlive: true });
    console.log("Connected to Database");

    eventHandler(client);

    await client.login(process.env.TOKEN!);
  } catch (error) {
    console.error(error);
  }
}
loginBot();

app.listen(8080, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
