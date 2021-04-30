const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports.run = async (client, message, args) => {



    const user = message.author.tag
    const urls = args[0];
    if (!urls)
      return message.channel
        .send(`\`\`\`\n${user},Provide a link -_-\n\`\`\``)
        
    if (urls.length < 8)
      return message
        .reply(
          "<> https is too short to reach - 8 limit"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );

      return message.channel.send(
        `Here is the screenshot`,
        {
          files: [{ attachment: body, name: "Screenshot.png" }]
        }
      );
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Could not find any results. Invalid URL?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        
    };
}

    module.exports.help = {
    name: 'screenshot',
 aliases: [],
 category: 'image',
 description: 'Screenshot!',
 usage: 'screenshot <url>',
};
