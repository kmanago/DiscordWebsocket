module.exports = {
	name: 'cointoss',
	description: 'Flip a coin. Heads or Tails?',
    category: 'Misc',
    usage: '!cointoss <Heads | Tails> ',
	execute(message, args) {
        if (!args[0]) {
            message.channel.send('No arguments were added! Will you pick **heads** or **tails**?');
        } 
        
        else{
            let choice = args[0];
            let coin = [ 'Heads','Tails'];
            let coinResults = coin[Math.floor(Math.random()*coin.length)];
            let coinID = "<:coin:626867330387017730>";
            if(choice === coinResults){
                message.reply(coinID+' Flipping coin...');
                message.channel.send('**'+coinResults+"!** You **win**!");
            }
            else{
                message.reply(coinID+' Flipping coin...');
                message.channel.send('**'+coinResults+"!** You **lose**! Better luck next time.");
            }

        }
        
	},
};