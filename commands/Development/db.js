const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const mongoose = require("mongoose");
const testSchema = require("../../test-schema.js");

module.exports = {
    name: "db", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Development", //the command category for helpcmd [OPTIONAL]
    aliases: ["database"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "db <add | remove> <user>", //the command usage for helpcmd [OPTIONAL]
    description: "Command to add or remove update count from people", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: ["1051431287077998603"], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 1, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "Missing Args", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "Too many words", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
        const user = message.mentions.users.first() || message.author;
        if (!user) {
            message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                .setTitle(`Error!`)
                .setDescription(`You did not mention a user!`)
            ]});
        } else {
            const test = await testSchema.findOne({ id: user.id });
            if (test === null || test === undefined) {
                setTimeout(async () => {
                    await new testSchema({
                        id: user.id,
                        Updates: 0,
                        rank: 0,
                        description: "No description set",
                    }).save();
                }, 1000);
                message.channel.send({embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                    .setTitle(`Error!`)
                    .setDescription(`The user is not in the database! Please try again!`)
                ]});
            } else {
                if (args[0] === "add") {
                    if(message.author.id )
                    test.Updates = test.Updates + 1;
                    test.save();
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                        .setTitle(`Database Results`)
                        .setDescription(`You have added an update to \`${user.username}\`!`)
                        .addFields(
                            { name: "Total Updates", value: `\`${test.Updates}\``, inline: true }
                        )
                    ]});
                } else if (args[0] === "remove") {
                    test.Updates = test.Updates - 1;
                    test.save();
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                        .setTitle(`Database Results`)
                        .setDescription(`You have removed an update from \`${user.username}\`!`)
                        .addFields(
                            { name: "Total Updates", value: `\`${test.Updates}\``, inline: true }
                        )
                    ]});
                } else {
                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter({ text: ee.footertext, iconURL: ee.footericon})
                        .setTitle(`Error!`)
                        .setDescription(`You did not specify if you wanted to add or remove an update!`)
                    ]});
                }
            }
        }
    }
    }