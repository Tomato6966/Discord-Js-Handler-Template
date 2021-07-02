/**
 * @INFO
 * Loading all needed File Information Parameters
 */
const config = require("../../botconfig/config.json"); //loading config file with token and prefix
const settings = require("../../botconfig/settings.json"); //loading settings file with the settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
//rpelace
const {
  escapeRegex,
  onCoolDown,
  replacemsg
} = require("../../handlers/functions"); //Loading all needed functions
//here the event starts
module.exports = async (client, message) => {
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the botconfig/config.json
    let prefix = config.prefix
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/).filter(Boolean);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.length > 0 ? args.shift().toLowerCase() : "";
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id) && settings.messages.ping_message)
        return message.channel.send({embed: new Discord.MessageEmbed()
            .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
            .setTitle(replacemsg(settings.messages.ping_message, {
              prefix: prefix
            }))
        });
      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command) {
      //Check if user is on cooldown with the cmd, with Tomato#6966's Function from /handlers/functions.js
      if (onCoolDown(message, command)) {
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(replacemsg(settings.messages.cooldown, {
              prefix: prefix,
              command: command,
              timeLeft: onCoolDown(message, command)
            }))
        });
      }
      try {
        //try to delete the message of the user who ran the cmd, if the setting is enabled
        if (settings.delete_commands) {
          try {
            message.delete()
          } catch {}
        }
        //if Command has specific permission return error
        if (command.memberpermissions && command.memberpermissions.length > 0 && !message.member.hasPermission(command.memberpermissions)) {
          return message.channel.send({ embed: new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
              .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.memberpermissions, {
                command: command,
                prefix: prefix
              }))
          }).then(msg => msg.delete({
            timeout: settings.timeout.notallowed_to_exec_cmd.memberpermissions
          }).catch((e) => {}));
        }
        //if Command has specific needed roles return error
        if (command.requiredroles && command.requiredroles.length > 0 && message.member.roles.cache.size > 0 && !message.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
            .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.requiredroles, {
              command: command,
              prefix: prefix
            }))
          ).then(msg => msg.delete({
            timeout: settings.timeout.notallowed_to_exec_cmd.requiredroles
          }).catch((e) => {}));
        }
        //if Command has specific users return error
        if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(message.author.id)) {
          return message.channel.send({embed: new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
            .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.alloweduserids, {
              command: command,
              prefix: prefix
            }))
          }).then(msg => msg.delete({
            timeout: settings.timeout.notallowed_to_exec_cmd.alloweduserids
          }).catch((e) => {}));
        }
        //if command has minimum args, and user dont entered enough, return error
        if(command.minargs && command.minargs > 0 && args.length < command.minargs) {
          return message.channel.send({embed: new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(":x: Wrong Command Usage!")
            .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")
          }).then(msg => msg.delete({
            timeout: settings.timeout.minargs
          }).catch((e) => {}));
        }
        //if command has maximum args, and user enters too many, return error
        if(command.maxargs && command.maxargs > 0 && args.length > command.maxargs) {
          return message.channel.send({embed: new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(":x: Wrong Command Usage!")
            .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argstoomany_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")
          }).then(msg => msg.delete({
            timeout: settings.timeout.maxargs
          }).catch((e) => {}));
        }
        
        //if command has minimum args (splitted with "++"), and user dont entered enough, return error
        if(command.minplusargs && command.minplusargs > 0 && args.join(" ").split("++").filter(Boolean).length < command.minplusargs) {
          return message.channel.send({embed: new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(":x: Wrong Command Usage!")
            .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")
          }).then(msg => msg.delete({
            timeout: settings.timeout.minplusargs
          }).catch((e) => {}));
        }
        //if command has maximum args (splitted with "++"), and user enters too many, return error
        if(command.maxplusargs && command.maxplusargs > 0 && args.join(" ").split("++").filter(Boolean).length > command.maxplusargs) {
          return message.channel.send({embed: new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(":x: Wrong Command Usage!")
            .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")
          }).then(msg => msg.delete({
            timeout: settings.timeout.maxplusargs
          }).catch((e) => {}));
        }
        //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
        command.run(client, message, args, args.join(" ").split("++").filter(Boolean), message.member, args.join(" "), prefix);
      } catch (error) {
        if (settings.somethingwentwrong_cmd) {
          return message.channel.send({
            embed: new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(replacemsg(settings.messages.somethingwentwrong_cmd.title, {
                prefix: prefix,
                command: command
              }))
              .setDescription(replacemsg(settings.messages.somethingwentwrong_cmd.description, {
                error: error,
                prefix: prefix,
                command: command
              }))
          }).then(msg => msg.delete({
            timeout: 5000
          }).catch((e) => {}));
        }
      }
    } else //if the command is not found send an info msg
      return message.channel.send({
        embed: new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(replacemsg(settings.messages.unknown_cmd, {
            prefix: prefix
          }))
      }).then(msg => msg.delete({
        timeout: 5000
      }).catch((e) => {}));
  } catch (e) {
    console.log(e)
    return message.channel.send({
      embed: new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(replacemsg(settings.messages.error_occur))
        .setDescription(replacemsg(settings.messages.error_occur_desc, {
          error: error
        }))
    });
  }
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
   * @INFO
   * Work for Milrato Development | https://milrato.eu
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */
}
