const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'ban',
    description: 'Bans a member from the server. Add a reasoning.',
    category: 'Administration',
    usage: '!ban [@user] [reason]',
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
                return message.reply('you need to tag a user in order to kick them!');
            }
            else{
                let taggedUser = message.mentions.users.first();
              
                if(!taggedUser){
                    return message.reply("Please mention a valid user!")
                }

                //checks for modlog channel
                let modlog = message.guild.channels.find(x => x.name === modLogChannel);
                if (!modlog){
                    return message.reply('I cannot find a mod-log channel.');
                }

                let reason = args.slice(1).join(' ');
                if(!reason){
                   return message.reply('You must supply a reason for kicking.');
                }

                //makes sure the member is kickable
                if (!message.guild.member(taggedUser).bannable){
                    return message.reply('I cannot ban that member.');
                }

                //ban the member and supply it to the log
                message.guild.member(taggedUser).ban(reason);
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTimestamp()
                .addField('Action:', 'Ban')
                .addField('User:', `${taggedUser.username}#${taggedUser.discriminator} (${taggedUser.id})`)
                .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Reason', reason);
                message.guild.member(taggedUser).send(embed);
                return message.guild.channels.get(modlog.id).send(embed);
            }    
             
              
          }
          else{
              message.channel.send("You don't have permissions to do this action!");
              console.log("User attempted to ban a member but doesn't have required permissions.");
          }
        
      },
    
  };
   