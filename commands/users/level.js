const Discord = require('discord.js');
const Enmap = require("enmap");
const config = require('../../config.json');
let purple = config.colors.purple;
let xp = require ("../../xp.json");
var source = require('../../main.js');
var pts = source.points;
module.exports = {
    name: 'level',
    description: '',
    category: 'users',
    usage: '!level',
    async execute(message, args) {
        /*console.log(pts);
        if(!xp[message.author.id]){
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };//inner iff
        }//first if*/

        const key = `${message.guild.id}-${message.author.id}`;

        let curXP = `${pts.get(key, "points")}`;
        let curLvl = `${pts.get(key, "level")}`;
        let nxtLvlXp = curLvl * 300;
        let diff = nxtLvlXp - curXP;

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