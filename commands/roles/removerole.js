module.exports = {
	name: 'removerole',
  description: 'Removes a role to the user.',
  category: 'Roles',
  usage: '!removerole [role]',
  args: true,
  execute(message, args) {
		if (!args[0]) {
        message.channel.send('No arguments were added!');
    } 
    else {
        let cmd = args[0];
        let role = message.guild.roles.find(r => r.name === cmd);
        if(message.member.roles.some(r=>(r.name === role)) ) {
            // has one of the roles
            console.log("user has role");
          } else {
            // has none of the roles
          }
        //message.member.addRole(role);
        //message.channel.send("You have been given the new role: " + cmd);
    }

  },
  
};