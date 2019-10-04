const Discord = require('discord.js');
module.exports = {
    name: 'kick',
    description: 'Kicks a member from the server. Add a reasoning.',
    category: 'Administration',
    usage: '!kick [@user] [reason]',
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
                let taggedUser = message.mentions.users.first();
                
                if(!taggedUser){
                    return message.reply("Please mention a valid user!")
                }
 
                //looks for the mod-log channel
                let modlog = message.guild.channels.find('name', 'mod-log');
                if (!modlog){
                    return message.reply('I cannot find a mod-log channel.');
                }

                let reason = args.slice(1).join(' ');
                if(!reason){
                   return message.reply('You must supply a reason for kicking.');
                }

                //makes sure the member is kickable
                if (!message.guild.member(taggedUser).kickable){
                    return message.reply('I cannot kick that member');
                }

                //kick the member and supply it to the mod-log
                message.guild.member(taggedUser).kick(reason);
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('Action:', 'Kick')
                .addField('User:', `${taggedUser.username}#${taggedUser.discriminator} (${taggedUser.id})`)
                .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);
                message.guild.member(taggedUser).send(embed);
                return message.guild.channels.get(modlog.id).send(embed);
            }      
          }

          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to kick a member but doesn't have required permissions.");
          }
        
      },
    
  };
   