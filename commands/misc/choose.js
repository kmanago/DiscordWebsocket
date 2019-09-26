module.exports = {
	name: 'choose',
	cooldown: 5,
	description: 'Choose randomly from given list. Items are separated by a space.',
	category: 'Misc',
	execute(message, args) {
        let choice = args[Math.floor(Math.random()*args.length)];
        message.channel.send(choice);
	},
};