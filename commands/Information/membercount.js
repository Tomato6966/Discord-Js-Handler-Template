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
        message.reply({embeds: [new Discord.MessageEmbed()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setColor(ee.color)
        .addFields(
        { name: "❱ Total USERS", value: "😀 \`" + message.guild.memberCount + "\`", inline: true},
        { name: "❱ Total HUMANS", value: "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", inline: true},
        { name: "❱ Total BOTS", value: "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", inline: true},

        { name: "❱ ONLINE", value: "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", inline: true},
        { name: "❱ ONLINE", value: "🟢 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status != "offline").size + "\`", inline: true},
        { name: "❱ ONLINE", value: "🟢 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status != "offline").size + "\`", inline: true},

        { name: "❱ IDLE", value: "🟠 \`" + message.guild.members.cache.filter(member => member.presence.status == "idle").size + "\`", inline: true},
        { name: "❱ IDLE", value: "🟠 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "idle").size + "\`", inline: true},
        { name: "❱ IDLE", value: "🟠 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "idle").size + "\`", inline: true},

        { name: "❱ DND", value: "🔴 \`" + message.guild.members.cache.filter(member => member.presence.status == "dnd").size + "\`", inline: true},
        { name: "❱ DND", value: "🔴 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "dnd").size + "\`", inline: true},
        { name: "❱ DND", value: "🔴 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "dnd").size + "\`", inline: true},

        { name: "❱ OFFLINE", value: "⚫ \`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", inline: true},
        { name: "❱ OFFLINE", value: "⚫ \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "offline").size + "\`", inline: true},
        { name: "❱ OFFLINE", value: "⚫ \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "offline").size + "\`", inline: true},
        )
        .setTimestamp()
      ]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  }
}

