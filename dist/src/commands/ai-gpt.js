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
const { reply, filter, progress } = require("../lib");
const { nyxs } = require("../config/apikey");
module.exports = {
    name: "GPT 4",
    triggers: ["gpt"],
    code: (sock, msg) => __awaiter(void 0, void 0, void 0, function* () {
        yield progress.waiting(sock, msg);
        const prompt = yield filter.position(msg, "except first");
        const url = `${nyxs}/ai/gpt4?text=${encodeURIComponent(prompt)}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.status == "true") {
                yield progress.done(sock, msg);
                return yield reply(sock, msg, data.result);
            }
            else {
                yield progress.fail(sock, msg);
                yield reply(sock, msg, "[ ! ] Terjadi kesalahan dalam API");
            }
        }))
            .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
            yield progress.fail(sock, msg);
            return yield reply(sock, msg, `[ ! ] ${e}`);
        }));
    }),
};
