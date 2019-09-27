module.exports = {
    name: 'Warn',
    description: 'Warns a member from the server. Add a reasoning.',
    category: 'Administration',
    usage: '!warn [@user] [reason]',
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
              let names = args;
              //kick the member
             
              
          }
          else{
              message.channel.send("You don't have permissions to do this action!");
              console.log("User attempted to kick a member but doesn't have required permissions.");
          }
        
      }
  
    },
    
  };
   