const config = require('../../config.json');
module.exports = {
	name: 'setrole',
  description: 'Sets a role or roles to the provided user. Can be used by Admins only.',
  category: 'Roles',
  usage: '!setrole [role]',
  args: true,
  execute(message, args) {
        //a user must be tagged when setting roles
        let taggedUser = message.mentions.users.first();
          if(!taggedUser){
            return message.reply("Please mention a valid user!")
            }

        //checks for admin permission first
        let perms = message.member.permissions;
        let hasAdmin = perms.has("ADMINISTRATOR");
        let allroles = new Array();
          if(hasAdmin === false){
            console.log("User attempted to set role and but doesn't have required permissions.");
            return message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
          }

          else{
            let names = args;
            names.forEach( name => {
                let role = message.guild.roles.find(r => r.name === name);
                allroles.push(role);
                //console.log("User set the role " + name + "to themselves.");
                //message.channel.send("You have been given the new role: " + name);
             });
            }
        message.guild.member(taggedUser).setRoles(allroles)
        console.log(`${taggedUser.username} now has ${allroles.join("")} role(s).`);
        message.channel.send(config.emojis.yes + ` | ${taggedUser.username} now has ${allroles.join("")} role(s).`);
  },
  
};
 