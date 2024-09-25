const { reply, filter, progress } = require("../lib");
const { nyxs } = require("../config/apikey");

export = {
  name: "GPT 4",
  triggers: ["gpt"],
  code: async (sock: any, msg: any) => {
    await progress.waiting(sock, msg);
    const prompt = await filter.position(msg, "except first");
    const url = `${nyxs}/ai/gpt4?text=${encodeURIComponent(prompt)}`;
    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == "true") {
          await progress.done(sock, msg);
          return await reply(sock, msg, data.result);
        } else {
          await progress.fail(sock, msg);
          await reply(sock, msg, "[ ! ] Terjadi kesalahan dalam API");
        }
      })
      .catch(async (e) => {
        await progress.fail(sock, msg);
        return await reply(sock, msg, `[ ! ] ${e}`);
      });
  },
};
