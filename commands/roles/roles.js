const config = require('../../config.json');
module.exports = {
name: 'roles',
  description: 'Retrieves all possible roles within the server.',
  category: 'Roles',
  usage: '!roles',
  execute(message, args) {
		if (!args[0]) {
      // Get the Guild and store it under the variable "list"
      const list = message.client.guilds.get(config.guildID); 
      //list.members.forEach(member => console.log(member.user.username)); 
      console.log(list.roles);
      list.roles.forEach(role => message.channel.send(role.name)); 
    }    
  },
  
};
 