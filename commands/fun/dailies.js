var source = require('../../main.js');
var pts = source.points;
module.exports = {
	name: 'dailies',
	description: 'Play your luck at the slots! To play costs 200 coins.',
	category: 'Fun',
    usage: '!dailies',
    cooldown: 43200,
	execute(message, args) {
        const key =`${message.guild.id}-${message.author.id}`;
        pts.get(key, "coins");
        pts.math(key, "+",200, "coins");
    
        message.reply(":atm: | You\'ve collected your 200 daily credits :yen: for today!");
	},
};