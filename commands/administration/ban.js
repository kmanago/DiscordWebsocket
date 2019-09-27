module.exports = {
    name: 'ban',
    description: 'Bans a member from the server. Add a reasoning.',
    category: 'Administration',
    usage: '!ban [@user] [reason]',
    args: true,
    execute(message, args) {
          if (!args[0]) {
          message.channel.send('No arguments were added!');
      } 
      else {
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
               
                let reason = args.slice(1).join(' ');
                if(!reason) reason = "No reason provided";
                message.guild.member(taggedUser).ban(reason);
                //message.delete(0);
                message.channel.send(`${taggedUser.username} has been banned!`);
                message.channel.send(`Reasoning: ${reason}`)
            }    
             
              
          }
          else{
              message.channel.send("You don't have permissions to do this action!");
              console.log("User attempted to ban a member but doesn't have required permissions.");
          }
        
      }
  
    },
    
  };
   