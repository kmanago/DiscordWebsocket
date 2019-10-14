const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
	name: 'botinfo',
	description: 'Display info about the bot.',
	category: 'Management',
	usage: '!bot',
	async execute(message) {
        let bot = message.client;
        const cmd = message.client.commands;

        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const devID = '252638038650257429';
        const dev = bot.users.get(devID);

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription('A multi-purpose bot made in node.js.')
        .setThumbnail(bicon)
        .setColor('#BAF0BA') 
        .addField('Bot information information:', stripIndents`**> Name:** ${bot.user.username}
            **> Author :** ${dev.tag}  
            **> # of Commands : ** ${cmd.size} 
           `, true)
            .addBlankField()
            .addField('Bot Stats:', stripIndents`**> Presence:** ${bot.user.presence.status}
            **> Status : ** ${bot.user.presence.game}
            **> Uptime : ** ${uptime}   
            **> Created :** ${bot.user.createdAt}`, true);
        message.channel.send(botembed);
    },
};