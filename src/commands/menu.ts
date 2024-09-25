const {reply, textFormatter} = require("../lib")
const {bot} = require("../../config")
const fs = require("fs");
const path = require("path");

export = {
    name: "Bot Menu",
    triggers: ["menu", "info"],
    code: async (sock: any, msg: any) => {
        interface Command {
          name: string;
          triggers: string[];
        }
        
          let text = `『 *Info Bot* 』\n\n> Owner: ${bot.owner}\n> Prefix: ${bot.prefix}\n\n`;
          text += `『 *Menu Bot* 』\n\n`;
          
        //   const commandsPath = "./commands";
          const pathCmds = path.join(__dirname)
          let cmdFiles = fs.readdirSync(pathCmds);
        
          cmdFiles.forEach((file: string) => {
            const command: Command = require(path.join(__dirname, file));
            text += `┌[ ${textFormatter.bold(command.name)} ]\n`;
        
            let triggers = command.triggers;
            triggers.forEach((trigger: string) => {
              text += `│⇨ .${trigger}\n`;
            });
        
            text += `└\n\n`;
          });
        
          text += `${textFormatter.italic("Rin Bot")}`;
          await reply(sock, msg, text);
  },
};
