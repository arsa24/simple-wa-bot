"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveHistory = exports.gemini = void 0;
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } = require("@google/generative-ai");
const fs = require("fs");
const { Gemini } = require("../../config");
const gemini = (prompt, jid) => __awaiter(void 0, void 0, void 0, function* () {
    const id = jid.split("@")[0];
    const historyPath = `./src/log/${id}.json`;
    const genAI = new GoogleGenerativeAI(Gemini.GEMINI_APIKEY);
    if (!fs.existsSync(`./src/log/${id}.json`))
        fs.writeFileSync(`./src/log/${id}.json`, "[]");
    let dataHistory = fs.readFileSync(historyPath);
    if (dataHistory == "")
        dataHistory = "[]";
    const history = JSON.parse(dataHistory);
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
    let result = yield chat.sendMessage(prompt);
    yield (0, exports.saveHistory)("user", prompt, id);
    yield (0, exports.saveHistory)("model", result.response.text(), id);
    return result;
});
exports.gemini = gemini;
const saveHistory = (role, text, id) => __awaiter(void 0, void 0, void 0, function* () {
    const historyPath = `./src/log/${id}.json`;
    let history = [];
    if (fs.existsSync(historyPath)) {
        try {
            const data = fs.readFileSync(historyPath, "utf8");
            if (data) {
                history = JSON.parse(data);
            }
        }
        catch (e) {
            console.error(e);
            history = [];
        }
    }
    history.push({
        role: role,
        parts: [{ text: text }],
    });
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
});
exports.saveHistory = saveHistory;
