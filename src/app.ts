import { Client, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "tsconfig-paths/register";
import eventHandler from "./handlers/eventHandler";
import { verifyEnvVariables } from "./utils/functions";
require("module-alias/register");
dotenv.config();
verifyEnvVariables();
const app = express();
const port = Number(process.env.PORT) || 4000;

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

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on PORT: ${port}`);
});
loginBot();
