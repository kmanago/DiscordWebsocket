module.exports = {
	name: 'rolldie',
	aliases: ['rolldice'],
	cooldown: 2,
	description: 'Rolls a die. 6 is the default, but it can take in a variable if more sides are needed',
	category: 'Misc',
	usage: '!rolldie <# of sides>',
	execute(message,args) {
        if (!args.length){
			var dievalue = Math.floor(Math.random() * (6 - 1 + 1) + 1);
			message.channel.send("🎲 You rolled the number " + dievalue);
		}
		else{
			var sides = args[0];
			var dievalue = Math.floor(Math.random() * (sides - 1 + 1) + 1);
			message.channel.send("🎲 You rolled the number " + dievalue);
		}
	},
};
