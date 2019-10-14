module.exports = {
    name: 'delrole',
    description: 'Deletes the specified role. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Administration',
    usage: '!delrole [role]',
    args: true,
    guildOnly: true,
    execute(message, args) {
          
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
              message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to delete a role but doesn't have required permissions.");
          }
      }//end of execute
    
  };
   