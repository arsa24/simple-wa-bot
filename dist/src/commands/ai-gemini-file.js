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
const { reply, progress, getMessage } = require("../lib");
module.exports = {
    name: "Gemini File",
    triggers: ["gf", "gemini-file"],
    code: (sock, msg) => __awaiter(void 0, void 0, void 0, function* () {
        yield progress.waiting(sock, msg);
        const prompt = yield filter.position(msg, "except first");
        const url = "";
        const payload = {
            prompt,
            url,
            gaya: "",
        };
        const endpoint = `https://api.nyxs.pw/ai/gemini-input?text=${encodeURIComponent(payload.prompt)}&url=${payload.url}&gaya=${payload.gaya}`;
        fetch(endpoint)
            .then((res) => res.json())
            .then((out) => __awaiter(void 0, void 0, void 0, function* () {
            if (out.status == "true") {
                return yield reply(sock, msg, `[ ! ] ${out.result}`);
            }
            else if (out.status == "false") {
                return yield reply(sock, msg, `[ ! ] ${out.message}`);
            }
        }))
            .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
            return yield reply(sock, msg, `[ ! ] ${e}`);
        }));
    }),
};
