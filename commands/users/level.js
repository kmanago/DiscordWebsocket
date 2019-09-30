const Discord = require('discord.js');
const config = require('../../config.json');
let purple = config.colors.purple;
let xp = require ("../../xp.json");

module.exports = {
    name: 'level',
    description: '',
    category: 'fun',
    usage: '!level',
    async execute(message, args) {

        if(!xp[message.author.id]){
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };//inner iff
        }//first if

        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 300;
        let diff = nxtLvlXp - curxp;

        let lvlEmbed = new Discord.RichEmbed()
        .setTitle ("**"+message.author.username+"**")
        .setThumbnail( message.author.displayAvatarURL)
        .setColor(purple)
        .addField("**__Current Level:__**", curlvl, true)
        .addField("**__XP:__**", curxp,true)
        .setFooter(`${diff} XP until next level`);

        message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

    }
}