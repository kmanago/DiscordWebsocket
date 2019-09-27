module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping!',
	category: 'Misc',
	usage: '!ping',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};