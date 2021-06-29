const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "membercount", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Information", //the command category for helpcmd [OPTIONAL]
  aliases: [], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "membercount", //the command usage for helpcmd [OPTIONAL]
  description: "Shows the Amount of Members in DETAIL", //the command description for helpcmd [OPTIONAL]
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
      await message.guild.members.fetch();
        message.channel.send(new Discord.MessageEmbed()
        .setAuthor("Member-Count Information About: " +  message.guild.name, message.guild.iconURL({
          dynamic: true
        }), "https://clan.milrato.eu")
        .setColor(ee.color)
        .addField("❱ Total USERS", "😀 \`" + message.guild.memberCount + "\`", true)
        .addField("❱ Total HUMANS", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("❱ Total BOTS", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)
        
        .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
        .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status != "offline").size + "\`", true)
        .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status != "offline").size + "\`", true)
        
        .addField("❱ IDLE", "🟠 \`" + message.guild.members.cache.filter(member => member.presence.status == "idle").size + "\`", true)
        .addField("❱ IDLE", "🟠 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "idle").size + "\`", true)
        .addField("❱ IDLE", "🟠 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "idle").size + "\`", true)
        
        .addField("❱ DND", "🔴 \`" + message.guild.members.cache.filter(member => member.presence.status == "dnd").size + "\`", true)
        .addField("❱ DND", "🔴 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "dnd").size + "\`", true)
        .addField("❱ DND", "🔴 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "dnd").size + "\`", true)
        
        .addField("❱ OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
        .addField("❱ OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "offline").size + "\`", true)
        .addField("❱ OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "offline").size + "\`", true)
        .setTimestamp()
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
