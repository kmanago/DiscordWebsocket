const Discord = require('discord.js');
module.exports = {
    name: 'unban',
    description: 'Unbans a member from the server. Add a reasoning.',
    category: 'Administration',
    usage: '!unban [user id] [reason]',
    args: true,
    execute(message, args) {

          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR");
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
            if (!message.mentions.users.size) {
                return message.reply('you need to tag a user in order to kick them!');
            }
            else{
                let statedUser = args [0];
              
                if(!statedUser){
                    return message.reply("You must supply a User Resolvable, such as a user id. Check the previous logs for user ids.")
                }

                //checks for modlog channel
                let modlog = message.guild.channels.find('name', 'mod-log');
                if (!modlog){
                    return message.reply('I cannot find a mod-log channel.');
                }

                let reason = args.slice(1).join(' ');
                if(!reason){
                   return message.reply('You must supply a reason for kicking.');
                }

                //ban the member and supply it to the log
                message.guild.member(statedUser).unban(reason);
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('Action:', 'Unban')
                .addField('User:', `${statedUser.username}#${statedUser.discriminator} (${statedUser.id})`)
                .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);
                return message.guild.channels.get(modlog.id).sendEmbed(embed);
            }    
             
              
          }
          else{
              message.channel.send("You don't have permissions to do this action!");
              console.log("User attempted to ban a member but doesn't have required permissions.");
          }
        
      },
    
  };
   