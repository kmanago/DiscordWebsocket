const Discord = require('discord.js');
var source = require('../../main.js');
var userprofile = source.up;

module.exports = {
    name: 'leaderboard',
    description: '',
    category: 'Users',
    usage: '!leaderboard',
    async execute(message, args) {
         // Get a filtered list (for this guild only), and convert to an array while we're at it.
        const filtered = userprofile.filter( p => p.guild === message.guild.id ).array();

        // Sort it to get the top results... well... at the top. Y'know.
        const sorted = filtered.sort((a, b) => b.points - a.points);
        console.log (sorted);
        //sorted.indexof('')
        // Slice it, dice it, get the top 10 of it!
        const top10 = sorted.splice(0, 10);
       var count = 1;
        // Now shake it and show it! (as a nice embed, too!)
       const embed = new Discord.RichEmbed()
            .setTitle("Leaderboard")
            //.setAuthor(bot.user.username, bot.user.avatarURL)
            .setDescription("Our Top 10 Leaders!")
            .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/223/sports-medal_1f3c5.png')
            .setColor(0x00AE86);
            top10.forEach (t => {
                const mem= message.guild.members.get(t.user);
                console.log(count);
                const name = mem.user.username;
                const points = t.points;
                embed.addField('**'+count+'. '+name+'**', `Points: `+ points, true);
                count++;
            });
       return message.channel.send({embed});
     
    }
}