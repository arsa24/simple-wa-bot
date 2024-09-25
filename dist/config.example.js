"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sticker = exports.api = exports.Gemini = exports.bot = void 0;
exports.bot = {
    // bot
    name: "", //nama bot
    prefix: ".", // prefix untuk mentrigger command
    pairingCode: false, //ubah menjadi true jika ingin menggunakan pairing code
    botNumber: "", // Isi dengan nomor yang akan dijadikan bot
    // owner
    owner: "", // Nama pemilik bot
    ownerPhoneNumber: "", // nomor pemilik bot
};
exports.Gemini = {
    GEMINI_APIKEY: "", //apikey dari gemini. silahkan kunjungi https://ai.google.dev/gemini-api?hl=id
    instruction: "" //contoh: "Nama mu adalah Rin, kamu adalah asisten Whatsapp yang membalas pesan dengan ramah.",
};
exports.api = {
    nyxs: "https://api.nyxs.pw",
    ryzen: "",
};
exports.sticker = {
    author: "",
    packname: ""
};
