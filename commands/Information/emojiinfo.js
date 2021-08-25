const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require("moment")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "emojiinfo", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Information", //the command category for helpcmd [OPTIONAL]
  aliases: [], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "emojiinfo <Emoji>", //the command usage for helpcmd [OPTIONAL]
  description: "Shows Information about an Emoji", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      let hasEmoteRegex = /<a?:.+:\d+>/gm
      let emoteRegex = /<:.+:(\d+)>/gm
      let animatedEmoteRegex = /<a:.+:(\d+)>/gm

      if(!message.content.match(hasEmoteRegex))
        return message.reply("❌ Your message does not include a VALID Emoji, please retry by adding a guild specific emoji!")
      
      if (emoji1 = emoteRegex.exec(message)) {
        let url = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".png?v=1"
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if(!emoji) return message.reply("Please provide a custom Emoji from **THIS GUILD**")
      
        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌" ;
        const embed = new MessageEmbed()
        .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
        .setColor(ee.color)
        .setThumbnail(emoji.url)
        .addField("**General:**", [
          `**ID:** \`${emoji.id}\``,
          `**URL:** [\`LINK\`](${emoji.url})`,
          `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
          `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " +  moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
        ])
        .addField("**Others:**", [
          `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
          `**Animated:** \`${checkOrCross(emoji.animated)}\``,
          `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
          `**Managed:** \`${checkOrCross(emoji.managed)}\``,
        ]).setFooter(ee.footertext, ee.footericon)
        message.reply({embeds: [embed]})
      }
      else if (emoji1 = animatedEmoteRegex.exec(message)) {
        let url2 = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".gif?v=1"
        let attachment2 = new Discord.MessageAttachment(url2, "emoji.gif")
        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emoji1[1] || emj.id == emoji1[1])
        if(!emoji) return message.reply("Please provide a custom Emoji from **THIS GUILD**")
      
        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? "✅" : "❌" ;
        const embed = new MessageEmbed()
        .setTitle(`**Emoji Information for: __\`${emoji.name.toLowerCase()}\`__**`)
        .setColor(ee.color)
        .setThumbnail(emoji.url)
        .addField("**General:**", [
          `**ID:** \`${emoji.id}\``,
          `**URL:** [\`LINK\`](${emoji.url})`,
          `**AUTHOR:** ${authorFetch} (\`${authorFetch.id}\`)`,
          `**CREATED AT:** \`${moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " +  moment(emoji.createdTimestamp).format("hh:mm:ss")}\``
        ])
        .addField("**Others:**", [
          `**Requires Colons:** \`${checkOrCross(emoji.requireColons)}\``,
          `**Animated:** \`${checkOrCross(emoji.animated)}\``,
          `**Deleteable:** \`${checkOrCross(emoji.deleteable)}\``,
          `**Managed:** \`${checkOrCross(emoji.managed)}\``,
        ]).setFooter(ee.footertext, ee.footericon)
        message.reply({embeds: [embed]})
      }
      else {
        message.reply("Couldn't find an emoji to paste! if it's uniced(standard) and not a guild Emoji, it's not possible!")
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
