module.exports = {
  name: 'mkrole',
  description: 'Creates a new role. You must have the ADMINISTRATOR permissions to run the command.',
  category: 'Administration',
  usage: '!mkrole [role]',
  args: true,
  guildOnly: true,
  execute(message, args) {
        //gets permissions of caller and check if they're an admin
        let perms = message.member.permissions;
        let hasAdmin = perms.has("ADMINISTRATOR");
        //only executes if user has ADMINISTRATOR permissions
        if(hasAdmin === true){
            let names = args;
            //create the role with the provided name
            names.forEach(name => {
                message.guild.createRole({
                    name: name
                })
                .then(role => console.log(`Created new role with name ${role.name}`),
                    message.channel.send('New role **' + name + '** was created. Set the role\'s properties under settings.\n')
                )
                .catch(console.error);
            });//end of foreach
            
        }
        else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
            console.log("User attempted to create a role but doesn't have required permissions.");
        }
      
    },
};
 