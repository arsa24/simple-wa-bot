export const textFormatter = {
    bold: (message: string): string => {
      return `*${message}*`;
    },
    italic: (message: string): string => {
      return `_${message}_`;
    },
    strikethrough: (message: string): string => {
      return `~${message}~`;
    },
    monospace: (message: string): string => {
      return "```" + message + "```";
    },
    bulletedlist: (message: string[]): string => {
      const arLength = message.length;
      let res = "";
      let i = 0;
      message.forEach((list: string) => {
        i++;
        if (i === arLength) {
          res += `* ${list}`;
        } else {
          res += `* ${list}\n`;
        }
      });
      return res;
    },
    numberedlist: (message: string[]): string => {
      const arLength = message.length;
      let res = "";
      let i = 1;
      message.forEach((list: string) => {
        if (i === arLength) {
          res += `${i++}. ${list}`;
        } else {
          res += `${i++}. ${list}\n`;
        }
      });
      return res;
    },
    quote: (message: string): string => {
      return `> ${message}`;
    },
    code: (message: string): string => {
      return "`" + message + "`";
    },
  };
  