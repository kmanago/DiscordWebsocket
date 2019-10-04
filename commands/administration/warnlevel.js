const Discord = require('discord.js');
const config = require('../../config.json');
let purple = config.colors.purple;
var source = require('../../main.js');
var userprofile = source.up;
module.exports = {
    name: 'warnlevel',
    description: '',
    category: 'Users',
    usage: '!warnlevel',
    async execute(message, args) {
      

        const key = `${message.guild.id}-${message.author.id}`;
        let warnLvl = `${userprofile.get(key, "warnlevel")}`;
    
        let lvlEmbed = new Discord.RichEmbed()
        .setTitle ("**"+message.author.username+"**")
        .setThumbnail( message.author.displayAvatarURL)
        .setColor(purple)
        .addField("**__Current  Warning Level:__**", warnLvl, true)
        message.channel.send(lvlEmbed);
     
    }
}