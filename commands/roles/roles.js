//const config = require('../../config.json');
module.exports = {
name: 'roles',
  description: 'Retrieves all possible roles within the server.',
  category: 'Roles',
  usage: '!roles',
  guildOnly: true,
  execute(message, args) {
		if (!args[0]) {
      // Get the Guild and store it under the variable "list"
      const list = message.member.guild.roles;
      var listR="";
      list.forEach(role =>{
        if (role.name != '@everyone'){
          let members = message.guild.roles.get(role.id).members;
          listR += role.name + " " +members.size+" members"+'\n';
        }
        
      });
      
      console.log(listR);
      message.channel.send("```" + listR + "```");

    }    
  },
  
};
 