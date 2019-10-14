const config = require('../../config.json');
module.exports = {
	name: 'removerole',
  description: 'Removes a role or roles to the user.',
  category: 'Roles',
  usage: '!removerole [role]',
  args: true,
  guildOnly: true,
  execute(message, args) {
        //let name = args[0];
        let names = args;
        let allroles = new Array();

        names.forEach( name => {
          let role = message.guild.roles.find(r => r.name === name);
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR");
          
          if(hasAdmin === false && (name === "mod" || name === "hiatus")){
            console.log("User attempted to remove role and but doesn't have required permissions.");
            return message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
          }

          else{
            //message.member.removeRole(role);
            //message.channel.send("You have been given the new role: " + name);
            allroles.push(role);
            console.log("User removed the role " + name + "from themselves.");
            let user = message.author;
            message.channel.send(config.emojis.yes + " | " + user +", You have removed the role: " + name);
          }
        });
         
          message.member.removeRoles(allroles);   
   },
  
};
 