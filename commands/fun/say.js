
module.exports = {
	name: "say",
	category: "fun",
	aliases: ["say"],
  description: "Resends the message",
  run: async (client, message, args) => {
	message.channel.send(args.join(" "))
	}
}