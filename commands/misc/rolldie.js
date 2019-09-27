module.exports = {
	name: 'rolldie',
	aliases: ['rolldice'],
	cooldown: 5,
	description: 'Rolls a 6 sided die',
	category: 'Misc',
	usage: '!rolldie',
	execute(message,args) {
        var dievalue = Math.floor(Math.random() * (6 - 1 + 1) + 1);
		message.channel.send("🎲 You rolled the number " + dievalue);
	},
};
