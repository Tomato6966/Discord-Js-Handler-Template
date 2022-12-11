const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require('moment');
const { GetRole } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "roleinfo", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Information", //the command category for helpcmd [OPTIONAL]
  aliases: ["rinfo"], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "roleinfo <@ROLE>", //the command usage for helpcmd [OPTIONAL]
  description: "Shows Information about a role", //the command description for helpcmd [OPTIONAL]
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
      var role;
      if(args[0]){
        try{
          role = await GetRole(message, args)
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE ROLE")
          return message.reply(e)
        }
      }else{
        return message.reply("❌ Please retry but add a Role/Rolename/Roleid");
      }
      if(!role || role == null || role.id == null || !role.id) message.reply("❌ Could not find the ROLE")
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor({ name: "Information about:   " + role.name, iconURL: message.guild.iconURL({ dynamic: true })})
        embeduserinfo.addFields(
          { name: '❱ Name:', value: `\`${role.name}\``, inline: true },
          { name: '❱ ID:', value: `\`${role.id}\``, inline: true },
          { name: '❱ Color:', value: `\`${role.hexColor}\``, inline: true },
          { name: '❱ Date Created:', value: "\`"+moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(role.createdAt).format("hh:mm:ss") + "\`", inline: true },
          { name: '❱ Position:', value: `\`${role.rawPosition}\``, inline: true },
          { name: '❱ MemberCount:', value: `\`${role.members.size} Members have it\``, inline: true },
          { name: '❱ Hoisted:', value: `\`${role.hoist ? "✔️" : "❌"}\``, inline: true },
          { name: '❱ Mentionable:', value: `\`${role.mentionable ? "✔️" : "❌"}\``, inline: true },
          { name: '❱ Permissions:', value: `${role.permissions.toArray().map(p=>`\`${p}\``).join(", ")}` },
        )
        embeduserinfo.setColor(role.hexColor)
        embeduserinfo.setFooter({ text: ee.footertext, iconURL: ee.footericon})
        //send the EMBED
        message.reply({embeds: [embeduserinfo]})
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substring(0, 2000) : String(e).substring(0, 2000)}\`\`\``)
      ]});
    }
  }
}

