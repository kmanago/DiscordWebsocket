module.exports = {
	name: 'remind',
    description: 'Remind the user to do something. Time units are s(seconds), m(minutes), h(hours), and d(days',
	category: 'Misc',
	usage: '!remind [reminder message] | [duration s/m/h/d]',
	async execute(message,args) {
        let str = args.join(' ').split('|');
        let array = str.map(Function.prototype.call, String.prototype.trim);
        console.log(array);

        var duration = array[1];
        var filteredMessage = array[0];;
        console.log(filteredMessage);

        var filteredTime = duration.slice(0, -1);
        var timeUnit =duration.slice(-1);

        console.log(filteredTime);
        console.log(timeUnit);

        
        function reminder() {
            message.reply("\n**REMINDER:**\n" + filteredMessage);
          }

          switch(timeUnit) {
            case 's': {
              var msDelay =filteredTime * 1000;
              message.reply("Your reminder has been set. I will remind you in " + filteredTime + " seconds.");
              setTimeout(reminder, msDelay);
              break;
            }
            case 'm': {
              var msDelay = filteredTime * 60000;
              message.reply("Your reminder has been set. I will remind you in " + filteredTime + " minutes.");
              setTimeout(reminder, msDelay);
              break;
            }
            case 'h': {
              var msDelay = filteredTime * 3600000;
              message.reply("Your reminder has been set. I will remind you in " +filteredTime + " hours.");
              setTimeout(reminder, msDelay);
              break;
            }
            case 'd': {
              var msDelay = filteredTime * 86400000;
              message.reply("Your reminder has been set. I will remind you in " + filteredTime + " days.");
              setTimeout(reminder, msDelay);
              break;
            }
        }

	},
};
