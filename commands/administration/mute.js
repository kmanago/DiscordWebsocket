const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'mute',
    description: 'Mutes a member. Add a reasoning.',
    category: 'Administration',
    usage: '!mute [@user] "[reason]" | <duration s/h/m/d>',
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
                return message.reply('you need to tag a user in order to kick them!');
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

                //let reason = args.slice(1).join(' ').split('|');
                let str = args.slice(1).join(' ').split('|');
                let array = str.map(Function.prototype.call, String.prototype.trim);
             
                const reason = array[0];
                const duration = array [1];
                if(!reason){
                   return message.reply('You must supply a reason for kicking.');
                }
              

            let roleName = 'muted'
            let role = message.guild.roles.find(x => x.name == roleName);
            if(!role) {
              message.guild.createRole({
                          name: roleName
                      });
            }
            let muteRole = message.guild.roles.find(x => x.name == roleName);
            
            message.guild.member(taggedUser).addRole(muteRole).catch(console.error);
            message.channel.send(taggedUser.username + 'has been unmuted.');
                //mutes the member and supply it to the mod-log
               message.guild.member(taggedUser).setMute(true,reason);
                const embed = new Discord.RichEmbed();
                embed.setColor(0x00AE86);
                embed.setTimestamp();
                embed.addField('Action:', 'Muted');
                embed.addField('User:', `${taggedUser.username}#${taggedUser.discriminator} (${taggedUser.id})`);
                embed.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);
                embed.addField('Reason', reason);
                message.guild.member(taggedUser).send(embed);
                message.guild.channels.get(modlog.id).send(embed);

                if(duration){
                    var timeDigit = duration.slice(0, -1);
                    //gets s,m,h,or d
                    var timeUnit = duration.slice(-1);
                    switch(timeUnit) {
                        case 's': {
                          var msDelay =timeDigit * 1000;
                          message.reply(taggedUser.username+ " has been muted for " + timeDigit + " seconds.");
                          setTimeout(() => {message.guild.member(taggedUser).setMute(false);
                            message.channel.send(taggedUser + ', you have been unmuted.');
                            message.guild.member(taggedUser).removeRole(muteRole).catch(console.error);}
                            ,msDelay); // <- sets a timeout to unmute the user, sends a message
                          break;
                        }
                        case 'm': {
                          var msDelay = timeDigit * 60000;
                          message.reply(taggedUser.username+ " has been muted for " + timeDigit  + " minutes.");
                          setTimeout(() => {message.guild.member(taggedUser).setMute(false);
                            message.channel.send(taggedUser + ', you have been unmuted.');
                            message.guild.member(taggedUser).removeRole(muteRole).catch(console.error);}
                            ,msDelay); // <- sets a timeout to unmute the user, sends a message
                          break;
                        }
                        case 'h': {
                          var msDelay = timeDigit * 3600000;
                          message.reply(taggedUser.username+ " has been muted for " +timeDigit + " hours.");
                          setTimeout(() => {message.guild.member(taggedUser).setMute(false);
                            message.channel.send(taggedUser + ', you have been unmuted.');
                            message.guild.member(taggedUser).removeRole(muteRole).catch(console.error);}
                            ,msDelay); // <- sets a timeout to unmute the user, sends a message
                          break;
                        }
                        case 'd': {
                          var msDelay = timeDigit * 86400000;
                          message.reply(taggedUser.username+ " has been muted for "+ timeDigit + " days.");
                          setTimeout(() => {message.guild.member(taggedUser).setMute(false);
                            message.channel.send(taggedUser + ', you have been unmuted.');
                            message.guild.member(taggedUser).removeRole(muteRole).catch(console.error);}
                            ,msDelay); // <- sets a timeout to unmute the user, sends a message
                          break;
                        }
                    }//end of switch
                }
            }      
          }

          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to mute a member but doesn't have required permissions.");
          }
        
      },
    
  };
   