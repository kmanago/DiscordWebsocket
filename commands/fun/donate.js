var source = require('../../main.js');
var userprofile = source.up;
module.exports = {
	name: 'donate',
	description: 'Donate some of your coins to another user',
	category: 'Fun',
    usage: '!donate',
	execute(message, args) {
        //only do this within the guild
        if (message.guild) {
            const user = message.mentions.users.first();
            const mem = message.mentions.members.first();

            if(!user) return message.reply("You must mention someone or give their ID!"); 

            const pointsToAdd = args[1];
            //console.log(pointsToAdd)
            if(!pointsToAdd){
                return message.reply("You didn't tell me how many points to give...");
            }
            const key = `${message.guild.id}-${user.id}`;
            const keyD =`${message.guild.id}-${message.author.id}`;

            const pool = userprofile.get(keyD, "coins");
            if(pool <= pointsToAdd){
                return message.reply("You don't have enough coins to donate that amount!");
            }

            else{
                
              // If the points database does not have the message author in the database...
              if (!userprofile.has(key)){
                console.log('no profile for user so we create');
                userprofile.set(key, {
                  user: user.id,
                  guild: message.guild.id,
                  points: 10,
                  level: 1,
                  coins: 500,
                  warnlevel: 0,
                  bgcolor: '#f2f2f2',
                  maincolor: '#BAF0BA',
                  txtcolor: '#23272A',
                  title: 'This is a Title',
                  info: 'This is some text to act as my own personal status/info/about me. Whatever. Good news! It wraps text on its own.',
                  headerimg: 'https://pbs.twimg.com/media/CkCp_VhWYAAJcrU.jpg',
                  lastSeen: new Date()
                  });
              }
             
              let receptPoints = userprofile.get(key, "coins");
              receptPoints += pointsToAdd;
              console.log(receptPoints);

              let donerPoints =  userprofile.get(keyD, "coins");
              donerPoints -= pointsToAdd;
              console.log(donerPoints);

              //userprofile.math(key, "+",pointsToAdd, "coins");
              userprofile.set(key,receptPoints,"coins");
              userprofile.set(keyD,donerPoints,"coins");
              //userprofile.math(keyD, "",pointsToAdd, "coins");
              message.channel.send('Points have been given');
            }

        }
        //const key =`${message.guild.id}-${message.author.id}`;
        //userprofile.get(key, "coins");
        //userprofile.math(key, "+",200, "coins");
    
        //message.reply(":atm: | You\'ve collected your 200 daily credits :yen: for today!");
	},
};