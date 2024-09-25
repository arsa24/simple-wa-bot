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
const { reply, progress, filter } = require("../lib");
module.exports = {
    name: "Gemini",
    triggers: ["gemini", "g"],
    code: (sock, msg) => __awaiter(void 0, void 0, void 0, function* () {
        yield progress.fail(sock, msg);
        return yield reply(sock, msg, "Dalam pengembangan");
    }),
};
