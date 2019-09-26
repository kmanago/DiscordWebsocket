module.exports = {
	name: 'echo',
	cooldown: 5,
	description: 'Echo back',
	category: 'Misc',
	execute(message, args) {
		message.channel.send(args);
	},
};