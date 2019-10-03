const { SlotMachine, SlotSymbol } = require('slot-machine');
 
const cherry = new SlotSymbol('cherry', {
    display: '🍒',
    points: 10,
    weight: 100
});
 
const money = new SlotSymbol('money', {
    display: '💰',
    points: 100,
    weight: 50
});
 
const wild = new SlotSymbol('wild', {
    display: '❔',
    points: 10,
    weight: 50,
    wildcard: true
});
 
const machine = new SlotMachine(3, [cherry, money, wild]);
var source = require('../../main.js');
var userprofile = source.up;
module.exports = {
	name: 'slots',
	description: 'Play your luck at the slots! To play costs 200 coins.',
	category: 'Fun',
	usage: '!slots',
	execute(message, args) {
        const key =`${message.guild.id}-${message.author.id}`;
        const currentPoints= userprofile.get(key, "coins");
        if(currentPoints <= 200){
            return message.channel.send("You don't have enough coins to play....Collect your dailies, gain a new level, or keep being active to earn more. Minimum amount of coins needed is 200.");
        }
        
        userprofile.math(key, "-",200, "coins");
        //console.log(currentuserprofile);

        const results = machine.play();
        message.channel.send(results.visualize());
        
        //console.log(results.totalPoints, results.winCount);
        if(results.totalPoints != 0){
            message.channel.send(`Congrats! You won ` + results.totalPoints + ' coins! :money_mouth: ');
            userprofile.math(key, "+",results.totalPoints, "coins");
          //  console.log(earnings);
        }
        else{
            message.channel.send(`Bummer...you didn't win anything. Better luck next time!`);
        }
        
	},
};