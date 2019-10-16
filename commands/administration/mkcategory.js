const config = require('../../config.json');
module.exports = {
    name: 'mkcategory',
    description: 'Creates a new category. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Administration',
    usage: '!mkcategory [categoryName]',
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
               message.guild.createChannel(categoryName, { type: "category" })
                    .then(console.log,
                    message.reply(config.emojis.yes +` | The new **category ${categoryName}** has been **created. Don't forget to set its permissions.**`))
                    .catch(console.error); 
            }          
            
          else{
                message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
                console.log("User attempted to make a channel category but doesn't have required permissions.");
            }
        
      },
    
  };
   