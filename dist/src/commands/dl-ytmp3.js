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
const { filter, youtube, reply, y2mate, progress } = require("../lib");
module.exports = {
    name: "Youtube MP3",
    triggers: ["ytmp3"],
    code: (sock, msg) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            progress.waiting(sock, msg);
            const url = yield filter.position(msg, "except first");
            const data = yield youtube(url);
            const result = yield y2mate(yield data.vid, yield data.links.mp3.mp3128.k);
            yield reply(sock, msg, {
                audio: {
                    url: yield result.data.dlink,
                },
                mimetype: "audio/mp4",
            });
            progress.done(sock, msg);
        }
        catch (e) {
            yield reply(sock, msg, `[ ! ] ${e}`);
            progress.fail(sock, msg);
        }
    }),
};
