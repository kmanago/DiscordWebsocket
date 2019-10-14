const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
module.exports = {
	name: 'whois',
	description: 'Display info about a user.',
	category: 'Users',
	aliases: ['user', 'info', 'userinfo'],
	usage: '!whois',
	execute(message) {
		if (!message.mentions.users.size) {
			const mem = message.member;

			const avatar = mem.user.displayAvatarURL;
			const joined = mem.joinedAt;
			const color = mem.displayHexColor;
			const ID = mem.id;
			const roles = mem.roles
				.filter(r => r.id !== message.guild.id)
            	.map(r => r).join(", ") || 'none';
			const tag = mem.user.tag;
			const created = mem.user.createdAt;
			const displayName = mem.displayName;
			const username = mem.user.username;

			const userEmbed = new Discord.RichEmbed()
			.setThumbnail(avatar)
			.setColor(color)
			.addField('Member information:', stripIndents`**> Display name:** ${displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)
			
			.addBlankField()
			.addField('User information:', stripIndents`**> ID:** ${ID}
            **> Username**: ${username}
            **> Tag**: ${tag}
			**> Created at**: ${created}`)
			
			.setTimestamp()
			return message.channel.send(userEmbed);
		}

		else{
			const mem = message.mentions.members.first();

			const avatar = mem.user.displayAvatarURL;
			const joined = mem.joinedAt;
			const color = mem.displayHexColor;
			const ID = mem.id;
			const roles = mem.roles
				.filter(r => r.id !== message.guild.id)
            	.map(r => r).join(", ") || 'none';
			const tag = mem.user.tag;
			const created = mem.user.createdAt;
			const displayName = mem.displayName;
			const username = mem.user.username;

			const userEmbed = new Discord.RichEmbed()
			.setThumbnail(avatar)
			.setColor(color)
			.addField('Member information:', stripIndents`**> Display name:** ${displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)
			
			.addBlankField()
			.addField('User information:', stripIndents`**> ID:** ${ID}
            **> Username**: ${username}
            **> Tag**: ${tag}
			**> Created at**: ${created}`)
			
			.setTimestamp()
			return message.channel.send(userEmbed);

		}
	},
};