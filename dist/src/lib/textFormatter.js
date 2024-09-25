"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textFormatter = void 0;
exports.textFormatter = {
    bold: (message) => {
        return `*${message}*`;
    },
    italic: (message) => {
        return `_${message}_`;
    },
    strikethrough: (message) => {
        return `~${message}~`;
    },
    monospace: (message) => {
        return "```" + message + "```";
    },
    bulletedlist: (message) => {
        const arLength = message.length;
        let res = "";
        let i = 0;
        message.forEach((list) => {
            i++;
            if (i === arLength) {
                res += `* ${list}`;
            }
            else {
                res += `* ${list}\n`;
            }
        });
        return res;
    },
    numberedlist: (message) => {
        const arLength = message.length;
        let res = "";
        let i = 1;
        message.forEach((list) => {
            if (i === arLength) {
                res += `${i++}. ${list}`;
            }
            else {
                res += `${i++}. ${list}\n`;
            }
        });
        return res;
    },
    quote: (message) => {
        return `> ${message}`;
    },
    code: (message) => {
        return "`" + message + "`";
    },
};
