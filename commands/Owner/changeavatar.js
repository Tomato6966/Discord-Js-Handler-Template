var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var settings = require(`../../botconfig/settings.json`);
var ee = require(`../../botconfig/embed.json`);
const fs = require('fs');
const fetch = require('node-fetch');
module.exports = {
  name: "changeavatar",
  category: "Owner",
  aliases: ["changebotavatar", "botavatar", "botprofilepicture", "botpfp"],
  cooldown: 5,
  usage: "changeavatar <Imagelink/Image>",
  description: "Changes the Avatar of the BOT: I SUGGEST YOU TO DO IT LIKE THAT: Type the command in the Chat, attach an Image to the Command (not via link, just add it) press enter",
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: settings.ownerIDS, //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      //define a global var
      var url;
      //if there is an attachment
      if (message.attachments.size > 0) {
        //loop through all attachments
        if (message.attachments.every(attachIsImage)) {
          //get a response from the fetcher
          const response = await fetch(url);
          //create a buffer from it
          const buffer = await response.buffer();
          //write the file and log the state
          await fs.writeFile(`./image.jpg`, buffer, () =>{
            console.log('finished downloading!')
          });
          //set the avatar from the file
          client.user.setAvatar(`./image.jpg`)
            .then(user => {
              try {
                //try to delete it if possible
                fs.unlinkSync("./image.jpg")
              } catch {}
              //send a success message
              return message.reply({embeds: [new MessageEmbed()
                .setTitle(`Successfully, changed the Bot avatar!`)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
              ]});
            })
            .catch(e => {
              //send an error message
              return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`:x: Something went Wrong`)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
              ]});
            });
        } else {
          return message.reply({embeds: [new MessageEmbed()
            .setTitle(`:x: ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\``)
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
          ]});
        }
      } else if (message.content && textIsImage(message.content)) {
        url = args.join(" ")
        const response = await fetch(url);
        const buffer = await response.buffer();
        await fs.writeFile(`./image.jpg`, buffer, () =>
          console.log('finished downloading!'));
        client.user.setAvatar(`./image.jpg`)
          .then(user => {
            try {
              fs.unlinkSync("./image.jpg")
            } catch {

            }
            return message.reply({embeds: [new MessageEmbed()
              .setTitle(`Successfully, changed the Bot avatar!`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            ]});
          })
          .catch(e => {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`:x: Something went Wrong`)
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            ]});
          });

      } else {
        return message.reply({embeds: [new MessageEmbed()
          .setTitle(`:x: ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\` / \`webp\``)
          .setDescription(`Useage: \`${prefix}changeavatar <AVATARLINK/IMAGE>\``)
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
        ]});
      }

      function attachIsImage(msgAttach) {
        url = msgAttach.url;

        //True if this url is a png image.
        return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
      }

      function textIsImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
      }


    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
