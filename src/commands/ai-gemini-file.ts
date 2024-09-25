const { reply, progress, getMessage } = require("../lib");

export = {
  name: "Gemini File",
  triggers: ["gf", "gemini-file"],
  code: async (sock: any, msg: any) => {
    await progress.waiting(sock, msg);
    const prompt = await filter.position(msg, "except first");
    const url: string = "";

    const payload = {
      prompt,
      url,
      gaya: "",
    };

    const endpoint: string = `https://api.nyxs.pw/ai/gemini-input?text=${encodeURIComponent(
      payload.prompt
    )}&url=${payload.url}&gaya=${payload.gaya}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then(async (out) => {
        if (out.status == "true") {
          return await reply(sock, msg, `[ ! ] ${out.result}`);
        } else if (out.status == "false") {
          return await reply(sock, msg, `[ ! ] ${out.message}`);
        }
      })
      .catch(async (e) => {
        return await reply(sock, msg, `[ ! ] ${e}`);
      });
  },
};
