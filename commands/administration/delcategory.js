const config = require('../../config.json');
module.exports = {
    name: 'delcategory',
    description: 'Deletes a category. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Administration',
    usage: '!delcategory [categoryName]',
    args: true,
    guildOnly: true,
   async execute(message, args) {
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR")
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
            const categoryName = args[0];
                if(!categoryName){
                    return message.reply('You must supply a name for a category.');
                }  
            let category = message.guild.channels.find(c => c.name == categoryName && c.type == "category");     
            category.delete()
                    .then(console.log,
                    message.reply(config.emojis.yes +` | The **category ${categoryName}** has been **deleted.**`))
                    .catch(console.error); 
            }          
            
          else{
                message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
                console.log("User attempted to delete a channel category but doesn't have required permissions.");
            }
        
      },
    
  };
   