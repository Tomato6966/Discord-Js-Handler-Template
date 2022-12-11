const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const mongoose = require("mongoose");
const testSchema = require("../../test-schema.js");

module.exports = {
    name: "log", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Development", //the command category for helpcmd [OPTIONAL]
    aliases: ["actionlog"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "log <action (save or publish)> <reason>", //the command usage for helpcmd [OPTIONAL]
    description: "A dev command for developers to log there actions in studio.", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: ["1046095898209431603"], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 1, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "Missing Args", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "Too many words", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
        action = args[0];
        reason = args.slice(1).join(" ");
        message.delete();
        if (action == "Save" || action == "save") {
            const test = await testSchema.findOne({ id: message.author.id });
            if (test === null || test === undefined) {
                setTimeout(async () => {
                    await new testSchema({
                        id: message.author.id,
                        Updates: null,
                        rank: null,
                        description: null,
                    }).save();
                }, 1000);
            }
            else {
                test.Updates = test.Updates + 1;
                test.save();
            }
            client.channels.cache.get("1046104346741452831").send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                .setTitle(`Studio Log`)
                .addFields(
                    { name: "User", value: `${message.author}`, inline: true },
                    { name: "Action", value: "Save", inline: false },
                    { name: "Message", value: `${reason}`, inline: false },
                    { name: "Total Updates", value: `${test.Updates}`, inline: false },
                )
            ]});
        } else if (action == "Publish" || action == "publish") {
            const test = await testSchema.findOne({ id: message.author.id });
            if (test === null || test === undefined) {
                setTimeout(async () => {
                    await new testSchema({
                        id: message.author.id,
                        Updates: null,
                    }).save();
                }, 1000);
            }
            else {
                test.Updates = test.Updates + 1;
                test.save();
            }
            client.channels.cache.get("1046104346741452831").send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                .setTitle(`Studio Log`)
                .addFields(
                    { name: "Action", value: "Publish", inline: true },
                    { name: "User", value: `${message.author}`, inline: false },
                    { name: "Message", value: `${reason}`, inline: false },
                    { name: "Total Updates", value: `${test.Updates}`, inline: false },
                )
            ]});
        } else if (action == "Revert" || action == "revert") {
            client.channels.cache.get("1046104346741452831").send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                .setTitle(`Studio Log`)
                .addFields(
                    { name: "Action", value: "Revert", inline: true },
                    { name: "User", value: `${message.author}`, inline: false },
                    { name: "Message", value: `${reason}`, inline: false },
                    { name: "Total Updates", value: `${test.Updates}`, inline: false },
                )
            ]});
        } else {
            message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                .setTitle(`Error`)
                .setDescription(`You need to specify a valid action!`)
                .addFields(
                    { name: "Valid Actions", value: "Save, Publish, Revert", inline: false },
                )
            ]});




        }
    }
    
}
