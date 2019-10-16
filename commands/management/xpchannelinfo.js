const Discord = require('discord.js');
const configCH= require('../../channels.json');

module.exports = {
    name: 'xpchannelinfo',
    description: 'Gets a list of channels that you can gain points within the server.',
    category: 'Roles',
    usage: '!xpchannelinfo',
    guildOnly: true,
    execute(message) {
        const ac = configCH.allowed;
        var count = ac.length;
        channelsEmbed = new Discord.RichEmbed().setTitle('Approved Channels');
        channelsEmbed.setColor('#BAF0BA');
        channelsEmbed.setDescription('The channels listed below are the channels that allow users to gain XP which has been set by the Admins.');

        for(i=0;i<count;i++){
            channelsEmbed.addField('**'+(i+1)+'. '+ac[i].name+'**', '\n\u200b', false)
        }
        return message.channel.send(channelsEmbed);
    },
};