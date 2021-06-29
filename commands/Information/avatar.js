const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "avatar", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Information", //the command category for helpcmd [OPTIONAL]
  aliases: ["useravatar", "logo"], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "avatar [@USER] [global]", //the command usage for helpcmd [OPTIONAL]
  description: "Shows the Avatar of a User", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {

      var user;
      try{
        if(args[1] && args[1].toLowerCase() == "global"){
          args.pop()
          user = await GetGlobalUser(message, args)
        }else {
          user = await GetUser(message, args)
        }
      }catch (e){
        return message.reply(e)
      }
      message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`Avatar from: ${user.tag}`, user.displayAvatarURL({dynamic: true}), "https://discord.gg/FQGXbypRf8")
        .setColor(ee.color)
        .addField("❱ PNG",`[\`LINK\`](${user.displayAvatarURL({format: "png"})})`, true)
        .addField("❱ JPEG",`[\`LINK\`](${user.displayAvatarURL({format: "jpg"})})`, true)
        .addField("❱ WEBP",`[\`LINK\`](${user.displayAvatarURL({format: "webp"})})`, true)
        .setURL(user.displayAvatarURL({
          dynamic: true
        }))
        .setFooter(ee.footertext, ee.footericon)
        .setImage(user.displayAvatarURL({
          dynamic: true, size: 512,
        }))
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
