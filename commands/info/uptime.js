module.exports = {
    name: "uptime",
    aliases: ["uptime"],
    category: "info",
    description: "Returns the duration of how long the Bot is online",
    usage: "[command], [aliases]",
    run: async (client,message,args) => {
        function duration(ms) {
            const sec = Math.floor(ms / 1000 % 60).toString();
            const min = Math.floor(ms / (60*1000) % 60).toString();
            const hrs = Math.floor(ms / (60*60*1000) % 60).toString();
            const days = Math.floor(ms / (24*60*60*1000) % 60).toString();
            return `\`${days} Days\`, \`${hrs} Hours\`, \`${min} Minutes\`, \`${sec} Seconds\``
        }
        message.reply(`:white_check_mark: **${client.user.username}** is since ${duration(client.uptime)} online`);
    }
}