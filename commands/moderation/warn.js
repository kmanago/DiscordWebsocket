const Discord = require('discord.js');
var source = require('../../main.js');
const config = require('../../config.json');
var userprofile = source.up;
module.exports = {
    name: 'warn',
    description: 'Warns a member from the server. Add a reasoning.',
    category: 'Moderation',
    usage: '!warn [@user] [reason]',
    args: true,
    guildOnly: true,
    execute(message, args) {
  
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR");
          let modLogChannel = config.settings.modLogChannel;
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
                let modlog = message.guild.channels.find(x => x.name === modLogChannel);
                if (!modlog){
                    return message.reply('I cannot find a mod-log channel.');
                }

                let reason = args.slice(1).join(' ');
                if(!reason){
                   return message.reply('You must supply a reason for warning.');
                }

                //warn the member and supply it to the mod-log
                //message.guild.member(taggedUser).warn(reason);
                const key = `${message.guild.id}-${taggedUser.id}`;
                userprofile.inc(key, "warnlevel");
                let warnlevel = `${userprofile.get(key, "warnlevel")}`;

                const embed = new Discord.RichEmbed()
                .setColor('#fc6400')
                .setTimestamp()
                .addField('Action:', 'Warning')
                .addField('User:', `${taggedUser.username}#${taggedUser.discriminator} (${taggedUser.id})`)
                .addField('Warned In:', message.channel)
                .addField('Number of Warnings:', warnlevel)
                .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason)
                .setFooter('3 Warnings = Banned from Server');
                message.guild.channels.get(modlog.id).send(embed);
                message.guild.member(taggedUser).send(embed);
                if(warnlevel >= 3){
                    message.reply(`${taggedUser} has been banned.`)
                }
            }      
          }

          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to warn a member but doesn't have required permissions.");
          }
        
      },
    
  };
   