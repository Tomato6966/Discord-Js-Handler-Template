const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");
module.exports = {
    name: "help",
    aliases: ["h", "cmds"],
    category: "info",
    description: "Returns all Commands, or one specific Command information",
    usage: "[command], [aliases], [command <cmd>]",
    run: async (client,message,args) => {
        if(args[0]){
            return getCMD(client,message,args[0]);
        }
        else{
            return getAll(client, message);
        }
    }
}

function getAll(client,message){
const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle("HELP MENU")
    .addField("**__BOT BY:__**", `
    >>> <@442355791412854784> \`Tomato#6966\` [\`Website\`](https://musicium.eu)
    `)
    .setFooter(`TO see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
    const commands = (category) => {
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``).join(", ")
    }
    const info = client.categories.map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__**\n> ${commands(cat)}`)
    .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info))
}
function getCMD(client,message,input){
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()))
    let info = `No Information found for command **${input.toLowerCase()}**`;
    if(!cmd){
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }
    info = "";
    if(cmd.name) info += `**Command name**: \`${cmd.name}\`\n`
    if(cmd.aliases) info += `**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}\n`
    if(cmd.description) info += `**Description**: \`${cmd.description}\`\n`
    if(cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter("Syntax: <> = required, [] = optional"); 
    }
    return message.channel.send(embed.setColor("ORANGE").setDescription(info))
}
