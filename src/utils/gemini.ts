import dotenv from "dotenv";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const history: Content[] = [];
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 128,
  maxOutputTokens: 100,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

export async function replyWithData(
  updates: string,
  userID: string,
  points: number,
  systemPrompt: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",

      safetySettings,
      systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings

      history: [],
    });

    const str = ` USERID: ${userID}`;
    const pts = ` DAILYPROGRESSPOINTS: ${points}`;
    const result = await chatSession.sendMessage([
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

export async function reply(
  message: string,
  system?: string,
  maxOutputTokens?: number,
  username?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: system,

    safetySettings,
  });

  if (maxOutputTokens) {
    generationConfig.maxOutputTokens = maxOutputTokens;
  }
  try {
    history.push({
      role: "user",
      parts: [{ text: username ? username + ": " + message : message }],
    });

    const chatSession = model.startChat({
      generationConfig,
      history: history,
    });
    const result = await chatSession.sendMessage([{ text: message }]);
    const textResponse = result.response.text();
    if (!textResponse) {
      return "I am sorry. I have bugs.";
    }
    history.push({
      role: "model",
      parts: [{ text: textResponse }],
    });
    return textResponse;
  } catch (error) {
    console.log(error);
    return "I am sorry. I have bugs.";
  }
}
