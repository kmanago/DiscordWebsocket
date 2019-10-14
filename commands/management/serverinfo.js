const Discord = require('discord.js');
module.exports = {
	name: 'serverinfo',
	description: 'Display info about this server.',
	category: 'Management',
	usage: '!serverinfo',
	guildOnly: true,
	execute(message) {
		const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
		const textChannels =  message.guild.channels.filter(c => c.type === 'text');
		const channelsCats = message.guild.channels.filter(c => c.type === 'category');

		const bots =  message.guild.members.filter(member => member.user.bot);
		const humans =  message.guild.members.filter(member => !member.user.bot);

		const allroles =  message.guild.roles;
		var rolesList="";
		allroles.forEach(role =>{
		  //data.push(cmd.name); //print name of the command
		  if (role.name != '@everyone'){
			rolesList += role.name + ", ";
		  }
		});
		var roles = rolesList.substring(0, rolesList.length - 2);

		const serverEmbed = new Discord.RichEmbed()
		.setTitle(`${message.guild.name} Stats`)
		.setThumbnail(message.guild.iconURL)
		.setColor('#BAF0BA')

		.addField(`ID`, `${message.guild.id}`,true)
		.addField('Owner', `${message.guild.owner.user.tag}`,true)
		.addField('Region', `${message.guild.region}`, true)
		.addBlankField()
	
		.addField(`Channel Categories`, channelsCats.size, false)
		.addField(`Text Channels`, textChannels.size + ' Text', true)
		.addField(`Voice Channels`,voiceChannels.size+' Voice', true)
		.addBlankField()

		.addField('# of Members', `${message.guild.memberCount}`,false)
		.addField('Bots', `${bots.size}`,true)
		.addField('Humans', `${humans.size}`,true)
		.addBlankField()

		.addField(`Roles`, '**['+allroles.size+']** '+roles, true)
	
		.setFooter(`Created: ${message.guild.createdAt}`)
		message.channel.send(serverEmbed);
	},
};