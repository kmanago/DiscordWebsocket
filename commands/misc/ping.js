module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping!',
	category: 'Misc',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};