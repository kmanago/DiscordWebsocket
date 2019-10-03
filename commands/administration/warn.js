const Discord = require('discord.js');
module.exports = {
    name: 'warn',
    description: 'Warns a member from the server. Add a reasoning.',
    category: 'Administration',
    usage: '!warn [@user] [reason]',
    args: true,
    execute(message, args) {
  
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR");
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
            if (!message.mentions.users.size) {
                return message.reply('you need to tag a user in order to warn them!');
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
                   return message.reply('You must supply a reason for warning.');
                }

                //warn the member and supply it to the mod-log
                //message.guild.member(taggedUser).warn(reason);
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('Action:', 'Warning')
                .addField('User:', `${taggedUser.username}#${taggedUser.discriminator} (${taggedUser.id})`)
                .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);
     
                //const taggedUserID = taggedUser.id;
                //message.guild.users.get(taggedUserID).sendEmbed(embed);
                message.guild.channels.get(modlog.id).send(embed);
            }      
          }

          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to warn a member but doesn't have required permissions.");
          }
        
      },
    
  };
   