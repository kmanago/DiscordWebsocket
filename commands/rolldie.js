module.exports = {
	name: 'rolldie',
	aliases: ['rolldice'],
	description: 'Rolls a 6 sided die',
	execute(message) {
        var dievalue = Math.floor(Math.random() * (6 - 1 + 1) + 1);
		message.channel.send("🎲 You rolled the number " + dievalue);
	},
};
