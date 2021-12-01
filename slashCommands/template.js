const config = require("../botconfig/config.json"); // Change `../botconfig` to `../../botconfig` whenever in a folder
const ee = require("../botconfig/embed.json"); // Change `../botconfig` to `../../botconfig` whenever in a folder
const settings = require("../botconfig/settings.json"); // Change `../botconfig` to `../../botconfig` whenever in a folder
module.exports = {
	name: "template",
	description: "Template command example",
	cooldown: 3,
	memberpermissions: [],
	requiredroles: [],
	alloweduserids: [],
	options: [
		//INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
		// {"Integer": { name: "integer", description: "Type an integer (decimals not-supported)", required: true }}, //to use in the code: interacton.getInteger("integer")
		// {"Number": { name: "number", description: "Type a number (decimals supported)", required: true }}, //to use in the code: interacton.getNumber("number")
		// {"Boolean": { name: "boolean", description: "True or False", required: true }}, //to use in the code: interacton.getBoolean("boolean")
		// {"String": { name: "string", description: "Write a string message", required: true }}, //to use in the code: interacton.getString("string")
		// {"User": { name: "user", description: "Pick a user", required: true }}, //to use in the code: interacton.getUser("user")
		// {"Channel": { name: "channel", description: "Pick a channel", required: true }}, //to use in the code: interacton.getChannel("channel")
		// {"Role": { name: "role", description: "Pick a role", required: true }}, //to use in the code: interacton.getRole("role")
		// {"IntChoices": { name: "intchoice", description: "Select an IntChoice", required: true, choices: [["Int1", 1], ["Int2", 2]] }}, //here the second array input MUST BE A INTEGER // TO USE IN THE CODE: interacton.getInteger("intchoice")
		// {"NumChoices": { name: "numchoice", description: "Select a NumChoice", required: true, choices: [["Num1", 1.1], ["Num2", 2]] }}, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getNumber("numchoice")
		// {"StringChoices": { name: "stringchoice", description: "Select a StringChoice", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("stringchoice")
	],
	run: async (client, interaction) => {
		try{
			const { user, member, channel, channelId, guild, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp} = interaction;
			interaction.reply({content: `You've executed the template command!`, ephemeral: true});
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}
