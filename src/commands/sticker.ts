const {downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys")
const {packname, author} = require("./../config/bot")
const {createSticker} = require("wa-sticker-formatter")
const {reply, check, textFormatter, progress} = require("../lib")

export = {
  name: "Sticker",
  triggers: ["sticker", "stiker", "s"],
  code: async (sock: any, msg: any) => {
    try {
      await progress.waiting(sock, msg)
        if (
          (await check.messageType(msg)) !== "imageMessage" &&
          (await check.messageType(msg)) !== "videoMessage" &&
          !(await check.isQuotedMediaMsg(msg))
        ) {
          await progress.fail(sock, msg)
          return await reply(
            sock,
            msg,
            textFormatter.bold("[ ! ] Sertakan gambar atau reply gambarnya!")
          );
        } else {
          let buffer;
          if (!(await check.isQuotedMediaMsg(msg))) {
            buffer = await downloadMediaMessage(msg.messages[0], "buffer");
          } else {
            const quotedMessage = await msg.messages[0].message
              ?.extendedTextMessage?.contextInfo?.quotedMessage;
  
            const typeMedia = (await msg.messages[0]?.message?.videoMessage)
              ? "video"
              : (await msg.messages[0]?.message?.imageMessage)
              ? "image"
              : (await msg.messages[0].message?.extendedTextMessage?.contextInfo
                  ?.quotedMessage?.imageMessage)
              ? "image"
              : (await msg.messages[0].message?.extendedTextMessage?.contextInfo
                  ?.quotedMessage?.videoMessage)
              ? "video"
              : "";
  
            const stream: any = await downloadContentFromMessage(
              quotedMessage[
                (await msg.messages[0].message?.extendedTextMessage?.contextInfo
                  ?.quotedMessage?.imageMessage)
                  ? "imageMessage"
                  : (await msg.messages[0].message?.extendedTextMessage
                      ?.contextInfo?.quotedMessage?.videoMessage)
                  ? "videoMessage"
                  : ""
              ],
              typeMedia
            );
            buffer = Buffer.from([]);
            for await (const chunk of stream) {
              buffer = Buffer.concat([buffer, chunk]);
            }
          }
  
          const sticker = await createSticker(buffer, {
            metadata: {
              author: author,
              packname: packname,
            }
          })
          await progress.done(sock, msg)
          await reply(sock, msg, {sticker})
        }
      } catch (e) {
        await progress.fail(sock, msg)
        return await reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
      }
  },
};
