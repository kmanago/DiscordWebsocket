module.exports = {
    name: 'delrole',
    description: 'Deletes the specified role. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Administration',
    args: true,
    execute(message, args) {
          if (!args[0]) {
          message.channel.send('No arguments were added!');
      } 
      else {
        //checks if user who called is a mod role first
        let perms = message.member.permissions;
		let hasAdmin = perms.has("ADMINISTRATOR");
        if(hasAdmin === true){
            let names = args;
                names.forEach(name => {
                message.guild.roles.find(role => role.name === name).delete()
                .then(deleted => console.log(`Deleted role ${deleted.name}.`),
                    message.channel.send('The role ' + '**'+name+'**' + ' was deleted.')
                )
                .catch(console.error);
            });
        }
          else{
              message.channel.send('You don\'t have the proper permissions to complete this action. Please ask a mod/moderator.');
              console.log("User attempted to delete a role but doesn't have required permissions.");
          }
      }//end of execute
  
    },
    
  };
   