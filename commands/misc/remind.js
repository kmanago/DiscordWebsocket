module.exports = {
	name: 'remind',
	cooldown: 5,
	description: 'Remind the user to do something.',
	category: 'Misc',
	usage: '!remind',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};