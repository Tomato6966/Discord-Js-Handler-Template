//Modules
const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Client({
disableEveryone: true
, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Discord Bot is online!`);
});

client.on("message", async message => {
    const prefix = (config.prefix);
    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

   
    if (command) 
        command.run(client, message, args);
    
});

client.login(config.token);