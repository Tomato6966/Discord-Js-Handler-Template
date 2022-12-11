const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const mongoose = require("mongoose");
const testSchema = require("../../test-schema.js");

module.exports = {
    name: "description", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Information", //the command category for helpcmd [OPTIONAL]
    aliases: ["devinfo"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "description <user>", //the command usage for helpcmd [OPTIONAL]
    description: "Information about our developers and there ranks", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 1, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "Missing Args", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "Too many words", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
        const target = message.mentions.users.first();
        const targetId = target.id;
        const result = await testSchema.findOne({
            id: targetId,
        });
        if (!result) {
            message.reply("No results found");
            return;
        }

        const embed = new MessageEmbed()
            .setTitle(`Information about ${target.username}`)
            .setDescription(`Rank: ${result.rank || "Not set"}\nDescription: ${result.description || "Not set"}`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
        message.reply({
            embeds: [embed],
        });
    }
}