const {
  MessageEmbed,
  Util: {
    splitMessage
  }
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var settings = require(`../../botconfig/settings.json`);
var ee = require(`../../botconfig/embed.json`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `eval`,
  category: `Owner`,
  aliases: [`evaluate`, "evaluate", "eval"],
  description: `Eval a Command!`,
  usage: `eval <CODE>`,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: settings.ownerIDS, //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      //define a global variable
      let evaled;
      //if the args include the word token, return console error
      if (args.join(` `).includes(`token`)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);
      //get the evaled content
      evaled = await eval(args.join(` `));
      //make string out of the evaluation
      let string = inspect(evaled);
      //if the token is included return error
      if (string.includes(client.token)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);
      //define queueembed
      let evalEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} | Evaluation`)
        .setColor(ee.color);
      //split the description
      const splitDescription = splitMessage(string, {
        maxLength: 2040,
        char: `\n`,
        prepend: ``,
        append: ``
      });
      //array for embeds
      let embeds = []
      //For every description send a new embed
      await splitDescription.forEach(async (m) => {
        //(over)write embed description
        evalEmbed.setDescription(`\`\`\`` + m + `\`\`\``);
        embeds.push(evalEmbed)
        //send embed
      });
      message.reply({embeds: embeds});
    } catch (e) {
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
