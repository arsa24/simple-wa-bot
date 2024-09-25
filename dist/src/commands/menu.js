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
const { reply, textFormatter } = require("../lib");
const { bot } = require("../../config");
const fs = require("fs");
const path = require("path");
module.exports = {
    name: "Bot Menu",
    triggers: ["menu", "info"],
    code: (sock, msg) => __awaiter(void 0, void 0, void 0, function* () {
        let text = `『 *Info Bot* 』\n\n> Owner: ${bot.owner}\n> Prefix: ${bot.prefix}\n\n`;
        text += `『 *Menu Bot* 』\n\n`;
        //   const commandsPath = "./commands";
        const pathCmds = path.join(__dirname);
        let cmdFiles = fs.readdirSync(pathCmds);
        cmdFiles.forEach((file) => {
            const command = require(path.join(__dirname, file));
            text += `┌[ ${textFormatter.bold(command.name)} ]\n`;
            let triggers = command.triggers;
            triggers.forEach((trigger) => {
                text += `│⇨ .${trigger}\n`;
            });
            text += `└\n\n`;
        });
        text += `${textFormatter.italic("Rin Bot")}`;
        yield reply(sock, msg, text);
    }),
};
