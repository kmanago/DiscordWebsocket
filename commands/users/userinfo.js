module.exports = {
	name: 'userinfo',
	description: 'Display info about yourself.',
	category: 'Users',
	execute(message) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};