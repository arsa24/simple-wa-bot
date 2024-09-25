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
exports.check = void 0;
const { bot } = require("../../config");
exports.check = {
    isGroup: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield ((_a = msg.messages[0].key.remoteJid) === null || _a === void 0 ? void 0 : _a.endsWith("@g.us"));
    }),
    isFromMe: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        return yield msg.messages[0].key.fromMe;
    }),
    messageType: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        return Object.keys(yield msg.messages[0].message)[0];
    }),
    isQuotedMediaMsg: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const messageType = (yield ((_e = (_d = (_c = (_b = (_a = msg.messages[0].message) === null || _a === void 0 ? void 0 : _a.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.contextInfo) === null || _c === void 0 ? void 0 : _c.quotedMessage) === null || _d === void 0 ? void 0 : _d.imageMessage) === null || _e === void 0 ? void 0 : _e.url))
            ? true
            : (yield ((_k = (_j = (_h = (_g = (_f = msg.messages[0].message) === null || _f === void 0 ? void 0 : _f.extendedTextMessage) === null || _g === void 0 ? void 0 : _g.contextInfo) === null || _h === void 0 ? void 0 : _h.quotedMessage) === null || _j === void 0 ? void 0 : _j.videoMessage) === null || _k === void 0 ? void 0 : _k.url))
                ? true
                : false;
        return messageType;
    }),
    isOwner: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        let number = (yield msg.messages[0].key.participant) == undefined
            ? msg.messages[0].key.remoteJid
            : yield msg.messages[0].key.participant;
        return (yield number.split("@")[0]) == bot.ownerPhoneNumber ? true : false;
    }),
};
