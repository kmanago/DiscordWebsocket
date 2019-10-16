const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'unmute',
    description: 'Mutes a member in the server with a reasoning. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Moderation',
    usage: '!unmute [@user] [reason]',
    args: true,
    guildOnly: true,
   async execute(message, args) {
  
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR");
          let modLogChannel = config.settings.modLogChannel;
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
            if (!message.mentions.users.size) {
                return message.reply('you need to tag a user in order to mute them!');
            }
            else{
                let taggedUser = message.mentions.users.first();
                
                if(!taggedUser){
                    return message.reply("Please mention a valid user!")
                }
            
                
                //looks for the mod-log channel
                let modlog = message.guild.channels.find(x => x.name === modLogChannel);
                if (!modlog){
                    return message.reply('I cannot find a mod-log channel.');
                }

                let str = args.slice(1).join(' ').split('|');
                let array = str.map(Function.prototype.call, String.prototype.trim);
             
                const reason = array[0];
                if(!reason){
                   return message.reply('You must supply a reason for unmuting.');
                }
              

            let roleName = 'muted'
			let role = message.guild.roles.find(x => x.name == roleName);
			if(!role) {
				message.guild.createRole({
                    name: roleName
                });
			}
            let muteRole = message.guild.roles.find(x => x.name == roleName);
            message.channel.send(taggedUser + 'has been unmuted.');
            message.guild.member(taggedUser).removeRole(muteRole).catch(console.error);
                //unmutes the member and supply it to the mod-log
               message.guild.member(taggedUser).setMute(false,reason);
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('Action:', 'Unmuted')
                .addField('User:', `${taggedUser.username}#${taggedUser.discriminator} (${taggedUser.id})`)
                .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);
                message.guild.member(taggedUser).send(embed);
                message.guild.channels.get(modlog.id).send(embed);   
            }      
          }

          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to unmute a member but doesn't have required permissions.");
          }
        
      },
    
  };
   