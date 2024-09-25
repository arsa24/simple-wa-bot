const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");
const {Gemini} = require("../../config")

export const gemini: any = async (prompt: string, jid: string) => {
  const id = jid.split("@")[0]
  const historyPath: string = `./src/log/${id}.json`;
  const genAI: any = new GoogleGenerativeAI(Gemini.GEMINI_APIKEY);

  if(!fs.existsSync(`./src/log/${id}.json`)) fs.writeFileSync(`./src/log/${id}.json`, "[]")

  let dataHistory: any = fs.readFileSync(historyPath);
  if(dataHistory == "") dataHistory = "[]"
  const history: any = JSON.parse(dataHistory);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: Gemini.instruction,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  const chat = model.startChat({
    history: history,
  });

  let result = await chat.sendMessage(prompt);

  await saveHistory("user", prompt, id);
  await saveHistory("model", result.response.text(), id);
  
  return result;
};

export const saveHistory: any = async (role: string, text: string, id: string) => {
  const historyPath: string = `./src/log/${id}.json`;
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      const data = fs.readFileSync(historyPath, "utf8");
      if (data) {
        history = JSON.parse(data);
      }
    } catch (e) {
      console.error(e);
      history = []
    }
  }
  history.push({
    role: role,
    parts: [{ text: text }],
  });

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
};
