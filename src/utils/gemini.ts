import axios from "axios";
import dotenv from "dotenv";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 128,
  maxOutputTokens: 100,
  responseMimeType: "text/plain",
};

export async function reply(
  updates: string,
  userID: string,
  points: number,
  systemPrompt: string
): Promise<string> {
  try {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings

      history: [],
    });

    const str = ` USERID: ${userID}`;
    const pts = ` DAILYPROGRESSPOINTS: ${points}`;
    const result = await chatSession.sendMessage([
      { text: systemPrompt },
      { text: updates + str + pts },
    ]);

    const content = result.response.text();

    if (content) {
      return content;
    }

    return "BhagulobsDobby";
  } catch (error) {
    console.log(error);
    return "BhagulobsDobby";
  }
}
