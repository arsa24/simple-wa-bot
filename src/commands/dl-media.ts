const axios = require("axios");
const { reply, filter, progress } = require("../lib");

export = {
  name: "Video Downloader (IG, TT, YT)",
  triggers: ["dl"],
  code: async (sock: any, msg: any) => {
    await progress.waiting(sock, msg);
    interface ConverterResponse {
      dlink: string;
    }

    interface Y2MateResponse {
      extractor: string;
      title: string;
      author: { username: string };
      links: {
        video: { q_text: string; url: string }[];
        mp4: { auto: { k: string; q_text: string } };
        mp3: { mp3128: { k: string; q_text: string } };
      };
      vid: string;
      a: string;
    }

    const converter = async (
      vidId: string,
      k: string
    ): Promise<ConverterResponse> => {
      const options = {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "Sec-Ch-Ua":
            '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie:
            "_ga=GA1.1.1785880904.1723306133; _ga_79G1567X4W=GS1.1.1723949738.7.0.1723949738.0.0.0",
          Origin: "https://id-y2mate.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      };

      const response = await axios.post(
        "https://id-y2mate.com/mates/convertV2/index",
        {
          vid: vidId,
          k,
        },
        options
      );
      return response.data;
    };

    const y2mate = async (url: string): Promise<any> => {
      let payload = {
        k_query: url,
        k_page: "home",
        hl: "id",
        q_auto: 0,
      };

      const options = {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "Sec-Ch-Ua":
            '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie:
            "_ga=GA1.1.1785880904.1723306133; _ga_79G1567X4W=GS1.1.1723949738.7.0.1723949738.0.0.0",
          Origin: "https://id-y2mate.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      };

      let result: any;
      const response = await axios.post(
        "https://id-y2mate.com/mates/analyzeV2/ajax",
        payload,
        options
      );

      const data: Y2MateResponse = response.data;

      if (data.extractor === "tiktok") {
        const dltt = data.links.video;
        result = {
          title: data.title,
          name: data.author.username,
          quality: dltt[dltt.length - 1].q_text,
          linkdl: dltt[dltt.length - 1].url,
        };
      } else if (data.extractor === "youtube") {
        const mp4link = await converter(data.vid, data.links.mp4.auto.k);
        result = {
          name: data.a,
          title: data.title,
          linkdl: mp4link.dlink,
          quality: data.links.mp4.auto.q_text,
        };
      } else {
        payload = {
          k_query: url,
          k_page: "Instagram",
          hl: "id",
          q_auto: 0,
        };

        const instagramResponse = await axios.post(
          "https://id-y2mate.com/mates/analyzeV2/ajax",
          payload,
          options
        );
        const instagramData: Y2MateResponse = instagramResponse.data;

        if (instagramData.extractor === "instagram-downloader") {
          result = {
            name: instagramData.author.username,
            title: instagramData.title,
            quality: instagramData.links.video[0].q_text,
            linkdl: instagramData.links.video[0].url,
          };
        }
      }
      return result;
    };
    try {
      const input: string = await filter.position(msg, "except first");
      const response: any = await y2mate(input);
      await reply(sock, msg, {
        video: {
          url: await response.linkdl,
        },
        gifPlayback: false,
        caption: `> *Nama*: ${await response.name}\n\n> *Judul*: ${await response.title}\n\n> *Kualitas*: ${await response.quality}`,
      });
      await progress.done(sock, msg);
    } catch (e) {
      console.error(e);
      await reply(sock, msg, `[ ! ] ${e}`);
      progress.fail(sock, msg);
    }
  },
};
