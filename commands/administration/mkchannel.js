const config = require('../../config.json');
module.exports = {
    name: 'mkchannel',
    description: 'Creates a new channel. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Administration',
    usage: '!mkchannel [channelName] | [channelType] | <channelCategory>',
    args: true,
    guildOnly: true,
   async execute(message, args) {
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR")
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
            
                let str = args.join(' ').split('|');
                let array = str.map(Function.prototype.call, String.prototype.trim);
             
                const channelName = array[0];
                const channelType = array [1];
                const channelCat = array[2];

                if(!channelName){
                   return message.reply('You must supply a name for a channel.');
                }
                if(!channelType){
                    return message.reply('You must supply a type (text/voice) for a channel.');
                }
    

                if(channelType === "text" || channelType === 'voice'){
                    if(!channelCat){
                        message.guild.createChannel(channelName, { type: channelType })
                        .then(console.log,
                            message.reply(config.emojis.yes +` | The new **${channelType} channel ${channelName}** has been **created. Don't forget to set its permissions.**`))
                        .catch(console.error);
                    }
                    else{
                        message.guild.createChannel(channelName, { type: channelType })
                        .then(channel => {
                            let category = message.guild.channels.find(c => c.name == channelCat && c.type == "category");
                        
                            if (!category) {
                                throw new Error("Category channel does not exist");
                            }
                            else{console.log,
                                channel.setParent(category.id),
                                message.reply(config.emojis.yes +` | The new **${channelType} channel ${channelName}** has been **created under ${channelCat}. Don't forget to set its permissions.**`);
                            }
                          }).catch(console.error);
                    }
                }
                else{
                    return message.reply('You must supply a type (text/voice) for a channel.');
                }             
            }

          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to create a channel but doesn't have required permissions.");
         }
        
      },
    
  };
   