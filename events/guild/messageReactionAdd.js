/**
 * @INFO
 * Loading all needed File Information Parameters
 */
 const config = require("../../botconfig/config.json"); //loading config file with token and prefix
 const settings = require("../../botconfig/settings.json"); //loading settings file with the settings
 const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
 const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
 //here the event starts
 module.exports = async (client, reaction, user) => {
    //logs when a reaction appears
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    //REST OF THE CODE HERE
  }