const fs = require("fs");
const path = require("path");
const {bot} = require("../../config")
const { getMessage, simulate } = require("./../lib");

export = {
  commandHandler: async (sock: any, msg: any) => {
    const message = await getMessage(msg);
    const pathCmds = path.join(__dirname, "../commands");
    const commands = fs.readdirSync(pathCmds);
    const cmd = msg.messages[0].message;
    commands?.forEach((cmd: any) => {
      const pathCmd = path.join(pathCmds, cmd);
      const re = require(pathCmd);
      re?.triggers?.forEach((trigger: any) => {
        if (message.split(" ")[0].toLowerCase() == bot.prefix + trigger) {
          simulate.typing(sock, msg);
          return re.code(sock, msg);
        }
      });
    });
  },
};
