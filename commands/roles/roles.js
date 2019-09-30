const config = require('../../config.json');
module.exports = {
name: 'roles',
  description: 'Retrieves all possible roles within the server.',
  category: 'Roles',
  usage: '!roles',
  execute(message, args) {
		if (!args[0]) {
      // Get the Guild and store it under the variable "list"
      const list = message.member.guild.roles;
      var listR="";
      list.forEach(role =>{
        //data.push(cmd.name); //print name of the command
        if (role.name != '@everyone'){
          let members = message.guild.roles.get(role.id).members;
          listR += role.name + " " +members.size+" members"+'\n';
        }
        
      });
      //list.members.forEach(member => console.log(member.user.username)); 
      console.log(listR);
      message.channel.send("```" + listR + "```");
     // list.roles.forEach(role => message.channel.send(role.name)); 
    }    
  },
  
};
 