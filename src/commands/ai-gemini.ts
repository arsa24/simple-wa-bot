const {reply, progress, filter} = require("../lib")

export = {
  name: "Gemini",
  triggers: ["gemini", "g"],
  code: async (sock: any, msg: any) => {
    await progress.fail(sock, msg);
    return await reply(sock, msg, "Dalam pengembangan")
  },
};
