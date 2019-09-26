module.exports = {
	name: 'rps',
	description: 'Rock, Paper, Scissors!',
	category: 'Misc',
	execute(message, args) {
        if (!args[0]) {
            message.channel.send('No arguments were added! Will you pick **heads** or **tails**?');
        } 
        
        else{
            let choice = args[0];
            let rps = [ 'Rock','Paper','Scissors'];
            let rpsResults = rps[Math.floor(Math.random()*rps.length)];
            message.reply('Rock! Paper Scissors! Shoot!');

            if (rpsResults == "Rock"){
                let rpsID = "<:rock:626867371205984266>";
                if(choice === rpsResults){   
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** It\'s a draw...');
                }
                else if (choice === 'paper'){
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** You win!');
                }
                else if (choice === 'scissors'){
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** You lose!');
                }
            }
            
            else if(rpsResults == "Paper"){
                let rpsID  = ":page_facing_up:";
                if(choice === rpsResults){   
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** It\'s a draw...');
                }
                else if (choice === 'rock'){
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** You lose!');
                }
                else if (choice === 'scissors'){
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** You win!');
                }
            }
            
            else if(rpsResults == "Scissors"){
                let rpsID  = ":scissors:";
                if(choice === rpsResults){   
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** It\'s a draw...');
                }
                else if (choice === 'paper'){
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** You lose!');
                }
                else if (choice === 'rock'){
                    message.channel.send('I choose **'+rpsResults+rpsID+'!** You win!');
                }
            }      

        }
        
	},
};