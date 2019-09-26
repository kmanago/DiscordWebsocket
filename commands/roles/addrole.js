module.exports = {
	name: 'addrole',
  description: 'Adds a role to the user.',
  category: 'Roles',
  args: true,
  execute(message, args) {
		if (!args[0]) {
        message.channel.send('No arguments were added!');
    } 
    else {
        let name = args[0];
        let role = message.guild.roles.find(r => r.name === name);
        let perms = message.member.permissions;
        let hasAdmin = perms.has("ADMINISTRATOR");
        if(hasAdmin === false && (name === "mod" || name === "hiatus")){
          message.channel.send("***You don't have permissions to do this action!***");
          console.log("User attempted to add role and but doesn't have required permissions.");
        }
        else{
          message.member.addRole(role);
          message.channel.send("You have been given the new role: " + name);
          console.log("User added a new role " + name + "to themselves.");
        }
    }

  },
  
};
 