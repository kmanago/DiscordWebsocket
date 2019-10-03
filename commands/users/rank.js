const Discord = require('discord.js');
var source = require('../../main.js');
var userprofile = source.up;

module.exports = {
    name: 'rank',
    description: '',
    category: 'Users',
    usage: '!rank',
    async execute(message, args) {
         // Get a filtered list (for this guild only), and convert to an array while we're at it.
        const filtered = userprofile.filter( p => p.guild === message.guild.id ).array();
        const sorted = filtered.sort((a, b) => b.points - a.points);
        const mem = message.author.id;
        const results = sorted.find( ({user}) => user ===  mem);
        const rank = (sorted.indexOf(results)+1);      
       return message.reply(`**your rank is #${rank} **`);
    }
}