var source = require('../../main.js');
var pts = source.points;

module.exports = {
    name: 'deldata',
    description: 'Display user profile',
    category: 'Administration',
    usage: '!deldata',
    async execute(message, args) {
       // Let's clean up the database of all "old" users, 
    // and those who haven't been around for... say a month.
      if (args[0] === 'all'){
        // Get a filtered list (for this guild only).
        const filtered = pts.filter( p => p.guild === message.guild.id );

        // We then filter it again (ok we could just do this one, but for clarity's sake...)
        // So we get only users that haven't been online for a month, or are no longer in the guild.
        const toRemove = filtered.filter(data => {
          return message.guild.members.has(data.user);
        });

        toRemove.forEach(data => {
          pts.delete(`${message.guild.id}-${data.user}`);
        });

        message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);
      }

      //removes users who have not been seen within a month
      else{
          // Get a filtered list (for this guild only).
          const filtered = pts.filter( p => p.guild === message.guild.id );

          // We then filter it again (ok we could just do this one, but for clarity's sake...)
          // So we get only users that haven't been online for a month, or are no longer in the guild.
          const rightNow = new Date();

          const toRemove = filtered.filter(data => {
            return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
          })
          toRemove.forEach(data => {
            pts.delete(`${message.guild.id}-${data.user}`);
          });

          message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);
      }

        
     
    }
}

