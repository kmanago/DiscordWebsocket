const config = require('../../config.json');
module.exports = {
    name: 'delchannel',
    description: 'Deletes a channel. You must have the ADMINISTRATOR permissions to run the command.',
    channel: 'Administration',
    usage: '!delchannel [channelName]',
    args: true,
    guildOnly: true,
   async execute(message, args) {
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR")
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
            const channelName = args[0];
                if(!channelName){
                    return message.reply('You must supply a name for a channel.');
                }  
            let channel = message.guild.channels.find(c => c.name == channelName);     
            channel.delete()
                    .then(console.log,
                    message.reply(config.emojis.yes +` | The **channel ${channelName}** has been **deleted.**`))
                    .catch(console.error); 
            }          
            
          else{
                message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
                console.log("User attempted to delete a channel but doesn't have required permissions.");
            }
        
      },
    
  };
   