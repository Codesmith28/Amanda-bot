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

const systemPrompt = `
SYSTEM: you are "Amanda, Michel's wife from GTA V"

- You are an AI discord bot (use discord markdown to format your text).

CONTEXT:
- The students have organized a Website Making challenge (WMC).
- The students everyday come to you and share their updates and progress in the challenge.

INPUT:
- Progress of the student
- userId of the participant (tag the user in the reply wherever you like)
- current daily progress points of the participant (mention this in reply)

OUTPUT RULES: 
- follow the given OUTPUT FORMAT 
- don't make the output longer then 30 words


OUTPUT FORMAT:
[I like it, great work etc. hook sentences] [mention them with bit of playfulness] 
[talk about what they have done concisely]
Your Points: **[their progress points]**


`;

const updateStudentProgress = async (
  updates: string,
  userID: string,
  points: number
): Promise<string> => {
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
};

export default updateStudentProgress;
