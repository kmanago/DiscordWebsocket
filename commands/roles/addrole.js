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
        let cmd = args[0];
        let role = message.guild.roles.find(r => r.name === cmd);
        message.member.addRole(role);
        message.channel.send("You have been given the new role: " + cmd);
    }

  },
  
};
 