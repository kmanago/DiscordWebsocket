const Discord = require('discord.js');
const config = require('../../config.json');
let orange = config.colors.orange;
var source = require('../../main.js');
var userprofile = source.up;
module.exports = {
    name: 'warnlevel',
    description: 'Shows the warning level of a user/mentioned user',
    category: 'Users',
    usage: '!warnlevel <@user>',
    async execute(message, args) {
        if (!message.mentions.users.size) {
			const key = `${message.guild.id}-${message.author.id}`;
            let warnLvl = `${userprofile.get(key, "warnlevel")}`;
        
            let lvlEmbed = new Discord.RichEmbed()
            .setTitle ("**"+message.author.username+"**")
            .setThumbnail( message.author.displayAvatarURL)
            .setColor(orange)
            .addField("**__Current  Warning Level:__**", warnLvl, true)
            return message.channel.send(lvlEmbed);
		}

        else {
            const userID = message.mentions.users.map(user => {
                return `${user.id}`;
            });

            const key = `${message.guild.id}-${userID}`;
            let warnLvl = `${userprofile.get(key, "warnlevel")}`;
            let user = message.mentions.users.first();
            let lvlEmbed = new Discord.RichEmbed()
            .setTitle ("**"+user.username+"**")
            .setThumbnail( user.displayAvatarURL)
            .setColor(orange)
            .addField("**__Current  Warning Level:__**", warnLvl, true)
            return message.channel.send(lvlEmbed);

        }
     
    }
}