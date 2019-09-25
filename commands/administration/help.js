const { prefix } = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	category: 'Administration',
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const modules = ['Administration', 'Misc', 'Roles', 'Users']; 
		const helpEmbed = new Discord.RichEmbed().setTitle('**Commands**');
		helpEmbed.setFooter('\nYou can send  \`!help [command name]\` to get info on a specific command!');
		helpEmbed.setColor('#0099ff');
		if (!args.length) {
			//data.push('Here\'s a list of all my commands:\n');

			//for each module
			var count = 0;
			modules.forEach(cat => {
				//data.push(`**${cat}** `); //print module category
				//filter commands that are in this category
				if(count == 3){
					helpEmbed.addBlankField;
					count=0;
				}
				var command = commands.filter(u => u.category === `${cat}`);
				var cmdNames="";
				command.forEach(cmd =>{
					//data.push(cmd.name); //print name of the command
					cmdNames += cmd.name + '\n';
				});
				helpEmbed.addField(`__${cat}:__`, cmdNames, true);
				count++;
				//data.push('\n');
			});	
			message.reply('Here\'s a list of all my commands:\n');
			message.channel.send(helpEmbed);
			//message.channel.send(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
			//data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			//return message.author.send(data, { split: true })
			/*.message.channel.send(data, { split: true })
				then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});*/
		}

		
		else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}

			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
			
			data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

			message.channel.send(data, { split: true });
		}
		
	},
};