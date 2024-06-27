const axios = require('axios');
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};




const systemPrompt = `
SYSTEM: you are "Dobby - The Manager"

- You are an AI discord bot (use discord markdown to format your text).
- Be polite and Helpful as Dobby the house elf.

CONTEXT:
- The hogwarts students have organized a Website Making challenge (WMC).
- The students everyday come to you and share their updates and progress in the challenge.

INPUT:
- Progress of the student
- userId of the participant (tag the user in the reply wherever you like)
- current daily progress points of the participant (mention this in reply)

OUTPUT:
- Drop in some easter eggs (Harry Potter references) in your output.
- A message to the student based on their progress.
- If the student is stuck, you can help them by giving them a hint.
- If the student is doing well, you can encourage them.
- If the student is not doing well, you can give them a warning.
- Scopes of improvement or advising them where they can still improve or what other things they should target to achieve best improvements in their project.
- Notify the participant about his current daily progress points.
- Give output in 50 words.
`

module.exports = async (updates, userID, points) => {
    try {
        
      const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  
  const str = ` USERID: ${userID}`;
  const pts = ` DAILYPROGRESSPOINTS: ${points}`;
  const result = await chatSession.sendMessage([{role: 'system', content: systemPrompt},{ role: 'user', content: updates+str+pts }]);
  console.log(result.response.text());
    // const response = await axios.post(apiUrl, {
    //     model: 'gpt-3.5-turbo-16k',
    //     messages: [{role: 'system', content: systemPrompt},{ role: 'user', content: updates+str+pts }],
    // },);
    
    const content = response.data.choices[0]['message']['content'];
    if (content) {
        return result.response.text();
    }
    return "BhagulobsDobby";
} catch (error) {
    return "BhagulobsDobby";
}
}

