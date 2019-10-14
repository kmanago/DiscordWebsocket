module.exports = {
	name: 'purge',
	description: 'Clean up to 99 messages. You must have the ADMINISTRATOR permissions to run the command.',
	category: 'Administration',
	usage: '!purge [# of posts]',
	args: true,
	guildOnly: true,
	execute(message, args) {
		let perms = message.member.permissions;
		let hasAdmin = perms.has("ADMINISTRATOR");
		if (hasAdmin === true){
			const amount = parseInt(args[0]) + 1;

			if (isNaN(amount)) {
				return message.reply('that doesn\'t seem to be a valid number.');
			} else if (amount <= 1 || amount > 100) {
				return message.reply('you need to input a number between 1 and 99.');
			}

			message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				message.channel.send('there was an error trying to prune messages in this channel!');
			});
		}
		else {
			message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
            console.log("User attempted to purge messages but doesn't have required permissions.");
		}	
		
	},
};