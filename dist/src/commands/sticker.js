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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { packname, author } = require("./../config/bot");
const { createSticker } = require("wa-sticker-formatter");
const { reply, check, textFormatter, progress } = require("../lib");
module.exports = {
    name: "Sticker",
    triggers: ["sticker", "stiker", "s"],
    code: (sock, msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        try {
            yield progress.waiting(sock, msg);
            if ((yield check.messageType(msg)) !== "imageMessage" &&
                (yield check.messageType(msg)) !== "videoMessage" &&
                !(yield check.isQuotedMediaMsg(msg))) {
                yield progress.fail(sock, msg);
                return yield reply(sock, msg, textFormatter.bold("[ ! ] Sertakan gambar atau reply gambarnya!"));
            }
            else {
                let buffer;
                if (!(yield check.isQuotedMediaMsg(msg))) {
                    buffer = yield downloadMediaMessage(msg.messages[0], "buffer");
                }
                else {
                    const quotedMessage = yield ((_f = (_e = (_d = msg.messages[0].message) === null || _d === void 0 ? void 0 : _d.extendedTextMessage) === null || _e === void 0 ? void 0 : _e.contextInfo) === null || _f === void 0 ? void 0 : _f.quotedMessage);
                    const typeMedia = (yield ((_h = (_g = msg.messages[0]) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.videoMessage))
                        ? "video"
                        : (yield ((_k = (_j = msg.messages[0]) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.imageMessage))
                            ? "image"
                            : (yield ((_p = (_o = (_m = (_l = msg.messages[0].message) === null || _l === void 0 ? void 0 : _l.extendedTextMessage) === null || _m === void 0 ? void 0 : _m.contextInfo) === null || _o === void 0 ? void 0 : _o.quotedMessage) === null || _p === void 0 ? void 0 : _p.imageMessage))
                                ? "image"
                                : (yield ((_t = (_s = (_r = (_q = msg.messages[0].message) === null || _q === void 0 ? void 0 : _q.extendedTextMessage) === null || _r === void 0 ? void 0 : _r.contextInfo) === null || _s === void 0 ? void 0 : _s.quotedMessage) === null || _t === void 0 ? void 0 : _t.videoMessage))
                                    ? "video"
                                    : "";
                    const stream = yield downloadContentFromMessage(quotedMessage[(yield ((_x = (_w = (_v = (_u = msg.messages[0].message) === null || _u === void 0 ? void 0 : _u.extendedTextMessage) === null || _v === void 0 ? void 0 : _v.contextInfo) === null || _w === void 0 ? void 0 : _w.quotedMessage) === null || _x === void 0 ? void 0 : _x.imageMessage))
                        ? "imageMessage"
                        : (yield ((_1 = (_0 = (_z = (_y = msg.messages[0].message) === null || _y === void 0 ? void 0 : _y.extendedTextMessage) === null || _z === void 0 ? void 0 : _z.contextInfo) === null || _0 === void 0 ? void 0 : _0.quotedMessage) === null || _1 === void 0 ? void 0 : _1.videoMessage))
                            ? "videoMessage"
                            : ""], typeMedia);
                    buffer = Buffer.from([]);
                    try {
                        for (var _2 = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a; _2 = true) {
                            _c = stream_1_1.value;
                            _2 = false;
                            const chunk = _c;
                            buffer = Buffer.concat([buffer, chunk]);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_2 && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                const sticker = yield createSticker(buffer, {
                    metadata: {
                        author: author,
                        packname: packname,
                    }
                });
                yield progress.done(sock, msg);
                yield reply(sock, msg, { sticker });
            }
        }
        catch (e) {
            yield progress.fail(sock, msg);
            return yield reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
        }
    }),
};
