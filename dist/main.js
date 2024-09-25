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
const { pino } = require("pino");
const { makeWASocket, useMultiFileAuthState, } = require("@whiskeysockets/baileys");
const { commandHandler } = require("./src/handler");
const { reply, check, gemini, getMessage, filter, simulate } = require("./src/lib");
const { bot } = require("./config");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { state, saveCreds } = yield useMultiFileAuthState("state");
        const sock = makeWASocket({
            printQRInTerminal: !bot.pairingCode,
            logger: pino({ level: "silent" }),
            // browser: ["", "", ""],
            auth: state,
            defaultQueryTimeoutMs: undefined,
            syncFullHistory: false,
        });
        if (bot.pairingCode && !sock.authState.creds.registered) {
            setTimeout(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const pairing = yield sock.requestPairingCode(bot.botNumber);
                    console.log(`Pairing code: ${pairing}`);
                });
            }, 3000);
        }
        sock.ev.on("connection.update", (m) => {
            var _a;
            const { connection, lastDisconnect } = m;
            if (connection === "close") {
                console.log(lastDisconnect);
                main();
            }
            if (connection === "open") {
                console.log(`Connected at ${(_a = sock.user) === null || _a === void 0 ? void 0 : _a.id}`);
            }
        });
        sock.ev.on("creds.update", saveCreds);
        sock.ev.on("messages.upsert", (msg) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const key = {
                remoteJid: msg.messages[0].key.remoteJid,
                id: msg.messages[0].key.id,
                participant: msg.messages[0].key.participant,
            };
            if ((yield check.isFromMe(msg)))
                return;
            const mentioned = ((_c = (_b = (_a = msg.messages[0].message) === null || _a === void 0 ? void 0 : _a.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.contextInfo) === null || _c === void 0 ? void 0 : _c.mentionedJid) &&
                msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid
                    .length > 0
                ? msg.messages[0].message.extendedTextMessage.contextInfo.mentionedJid[0].split("@")[0]
                : "";
            const botId = (_d = sock.user) === null || _d === void 0 ? void 0 : _d.id.split(":")[0];
            if (((yield check.messageType(msg)) == "extendedTextMessage" &&
                mentioned == botId) ||
                !(yield check.isGroup(msg))) {
                try {
                    let input = yield getMessage(msg);
                    if ((yield check.messageType(msg)) == "extendedTextMessage" &&
                        mentioned == botId) {
                        input = yield filter.position(msg, "except first");
                    }
                    yield simulate.typing(sock, msg);
                    let text = yield gemini(input, (_f = (_e = msg.messages[0]) === null || _e === void 0 ? void 0 : _e.key) === null || _f === void 0 ? void 0 : _f.remoteJid);
                    return yield reply(sock, msg, (yield text.response.text()) + "\n_~Rin_");
                }
                catch (e) {
                    return yield reply(sock, msg, `[ ! ] ${e}`);
                }
            }
            yield sock.readMessages([key]);
            yield commandHandler(sock, msg);
        }));
    });
}
main();
