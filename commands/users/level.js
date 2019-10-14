const Discord = require('discord.js');

const config = require('../../config.json');
let purple = config.colors.purple;
var source = require('../../main.js');
var userprofile = source.up;
module.exports = {
    name: 'level',
    description: '',
    category: 'Users',
    usage: '!level',
    async execute(message, args) {
        const key = `${message.guild.id}-${message.author.id}`;

        let curXP = `${userprofile.get(key, "points")}`;
        let curLvl = `${userprofile.get(key, "level")}`;

        const curLevel = Math.floor(0.1 * Math.sqrt(userprofile.get(key, "points")))+1;
        const x = (curLevel) / 0.1;
        const nxt = Math.pow(x,2);
        const cur = (userprofile.get(key, "points"));
        const diff = nxt - cur;

        let lvlEmbed = new Discord.RichEmbed()
        .setTitle ("**"+message.author.username+"**")
        .setThumbnail( message.author.displayAvatarURL)
        .setColor(purple)
        .addField("**__Current Level:__**", curLvl, true)
        .addField("**__XP:__**",curXP,true)
        .setFooter(`${diff} XP until next level`);

        message.channel.send(lvlEmbed);
     
    }
}