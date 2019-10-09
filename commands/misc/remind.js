module.exports = {
	name: 'remind',
    description: 'Remind the user to do something. Time units are s(seconds), m(minutes), h(hours), and d(days',
	category: 'Misc',
	usage: '!remind [# timeunits] [reminder message]',
	async execute(message,args) {
        var filteredTime = args.shift();
        var filteredMessage = args.join(" ");;
        console.log(filteredTime);
        console.log(filteredMessage);
        var x = filteredTime.slice(-1);
        console.log(x);
        
        function reminder() {
            message.reply("\n**REMINDER:**\n" + filteredMessage);
          }

          switch(filteredTime.slice(-1)) {
            case 's': {
              var msDelay =filteredTime.slice(0, -1) * 1000;
              message.reply("Your reminder has been set. I will remind you in " + filteredTime.slice(0, -1) + " seconds.");
              setTimeout(reminder, msDelay);
              break;
            }
            case 'm': {
              var msDelay = filteredTime.slice(0, -1) * 60000;
              message.reply("Your reminder has been set. I will remind you in " + splitMessage[0].slice(0, -1) + " minutes.");
              setTimeout(reminder, msDelay);
              break;
            }
            case 'h': {
              var msDelay = filteredTime.slice(0, -1) * 3600000;
              message.reply("Your reminder has been set. I will remind you in " +filteredTime.slice(0, -1) + " hours.");
              setTimeout(reminder, msDelay);
              break;
            }
            case 'd': {
              var msDelay = filteredTime.slice(0, -1) * 86400000;
              message.reply("Your reminder has been set. I will remind you in " + filteredTime.slice(0, -1) + " days.");
              setTimeout(reminder, msDelay);
              break;
            }
        }

	},
};
