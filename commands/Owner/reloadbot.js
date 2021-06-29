var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var settings = require(`../../botconfig/settings.json`);
var {
  delay
} = require(`../../handlers/functions`);
const fs = require("fs")
module.exports = {
  name: "reloadbot",
  category: "Owner",
  aliases: ["botreloadbot"],
  cooldown: 5,
  usage: "reloadbot",
  description: "Reloads the Bot, All Commands Events, etc.",
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: settings.ownerIDS, //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      //define the index file
      const index = require("../../index")
      //define a counter variable
      let eventcount = 0;
      //get the folders in events
      await fs.readdirSync("./events/").forEach(async (dir) => {
        //for each folder get all files
        const events = fs.readdirSync(`./events/${dir}/`).filter((file) => file.endsWith(".js"));
        //add the amount of files to the counter
        eventcount += events.length
      })
      //send a temp message
      let tempmsg = await message.channel.send(new MessageEmbed()
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setAuthor("Reloading ...", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/FQGXbypRf8")
        .setTitle(`> Reloading **\`${client.commands.size} Commands\`**\n\n> Reloading **\`${eventcount} Events\`**\n\n> Reloading **\`${client.handlers.length} Modules/Features\`**`)
      )
      //clear the commands collection
      await client.commands.clear();
      //Delete all files from the cache
      await fs.readdirSync("./commands/").forEach(async (dir) => {
        //get all commands from the folder
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
        //loop throug all cmds
        for (let file of commands) {
          try {
            //delete it from the cache
            delete require.cache[require.resolve(`../../commands/${dir}/${file}.js`)]
            //log if successful
            console.log(`SUCCESS :: ../../commands/${dir}/${file}.js`)
          } catch {}
        }
      })
      //WAIT 1 SEC
      await delay(1000);
      //clear all events
      await client.removeAllListeners()
      //wait 1 Sec
      await delay(1000);
      //REMOVE ALL BASICS HANDLERS
      await client.handlers.forEach(handler => {
        try {
          //delete it from the cache
          delete require.cache[require.resolve(`../../handlers/${handler}`)];
          //log if successful
          console.log(`SUCCESS :: ../../handlers/${handler}`);
        } catch (e) {
          console.log(e)
        }
      });
      //if you are having cronjobs in your bot, stop them here and restart if needed!


      //wait 1 Sec
      await delay(1000);
      //Load the basics, (commands, dbs, events, etc.)
      index.handlers();
      //SEND CMDS SUCCESS
      console.log(client.commands.map(cmd => cmd.name))
      //edit the embed
      await tempmsg.edit({
        embed: new MessageEmbed()
          .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
          .setAuthor("Successfully Reloaded:", "https://cdn.discordapp.com/emojis/833101995723194437.gif?v=1", "https://discord.gg/FQGXbypRf8")
          .setTitle(`> **\`${client.commands.size} Commands\`**\n\n> **\`${eventcount} Events\`**\n\n> **\`${client.handlers.length} Modules/Features\`**`)
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon)
        .setTitle(`:x: Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
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