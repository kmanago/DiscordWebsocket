//const { prefix } = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	category: 'Administration',
	usage: '!help (command name)',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const modules = ['Administration', 'Misc', 'Roles', 'Users']; 
		if (!args.length) {
			const helpEmbed = new Discord.RichEmbed().setAuthor('SubiBot','https://cdn.bulbagarden.net/upload/thumb/a/a1/Substitute_artwork.png/200px-Substitute_artwork.png');
			helpEmbed.setColor('#BAF0BA');
			helpEmbed.setDescription('A multi-purpose bot made in node.js. Each command is separated into its respective category. [Arguments] are mandatory. (Arguments) are optional. <Arguments> are the different options.');
			helpEmbed.addBlankField();
			//for each module
			var count = 0;
			modules.forEach(cat => {
				//data.push(`**${cat}** `); //print module category
				//filter commands that are in this category
				if(count == 2){
					helpEmbed.addBlankField();
					count=0;
				}
				var command = commands.filter(u => u.category === `${cat}`);
				var cmdNames="";
				command.forEach(cmd =>{
					//data.push(cmd.name); //print name of the command
					cmdNames += cmd.usage + '\n';
				});
				let allcommands = "```" + cmdNames+ "```";
				helpEmbed.addField(`__${cat}:__`, allcommands, true);
				count++;
				//data.push('\n');
			});	
			helpEmbed.addBlankField();
			helpEmbed.setFooter('\nYou can send  \`!help [command name]\` to get info on a specific command!');
			
			//attempts to send the message as a DM
			return message.author.send({ embed: helpEmbed })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		
		else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}
			const helpEmbed = new Discord.RichEmbed().setColor('#BAF0BA');
			let commandInfo  = `**Name:** ${command.name} \n`;

			if (command.description){
				var descri = `**Description:** ${command.description}\n`;
				commandInfo += descri;
			}
			if (command.usage){
				var usage = `**Usage:** ${command.usage}\n`;
				commandInfo += usage;
			}
			if (command.aliases){
				var alias = `**Aliases:** ${command.aliases.join(', ')}\n`;
				commandInfo += alias;
			} 

			helpEmbed.addField('Command Glossary',commandInfo,false);
			message.reply(helpEmbed);
			
		}
		
	},
};