var source = require('../../main.js');
var userprofile = source.up;

module.exports = {
    name: 'cleanup',
    description: 'Cleans up the data of old users.',
    category: 'Management',
    usage: '!cleanup <all>',
    guildOnly: true,
    async execute(message, args) {
       // Let's clean up the database of all "old" users, 
    // and those who haven't been around for... say a month.
    let perms = message.member.permissions;
    let hasAdmin = perms.has("ADMINISTRATOR");
    
    if(hasAdmin === true){
      if (args[0] === 'all'){
        // Get a filtered list (for this guild only).
        const filtered = userprofile.filter( p => p.guild === message.guild.id );

        // We then filter it again (ok we could just do this one, but for clarity's sake...)
        // So we get only users that haven't been online for a month, or are no longer in the guild.
        const toRemove = filtered.filter(data => {
          return message.guild.members.has(data.user);
        });

        toRemove.forEach(data => {
          userprofile.delete(`${message.guild.id}-${data.user}`);
        });

        message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);
      }

      //removes users who have not been seen within a month
      else{
          // Get a filtered list (for this guild only).
          const filtered = userprofile.filter( p => p.guild === message.guild.id );

          // We then filter it again (ok we could just do this one, but for clarity's sake...)
          // So we get only users that haven't been online for a month, or are no longer in the guild.
          const rightNow = new Date();

          const toRemove = filtered.filter(data => {
            return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
          })
          toRemove.forEach(data => {
            userprofile.delete(`${message.guild.id}-${data.user}`);
          });

          message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);
      }
    }

    else{
      message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
      console.log("User attempted to delete data but doesn't have required permissions.");
    }
        
     
    }
}

