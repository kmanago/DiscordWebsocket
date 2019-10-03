const config = require('../../config.json');

module.exports = {
    name: 'setgoodbye',
    description: 'Sets the goodbye message for when someone joins the server.',
    category: 'Administration',
    usage: '!setgoodbye [message]',
    args: true,
    execute(message, args) {
          //gets permissions of caller and check if they're an admin
          let perms = message.member.permissions;
          let hasAdmin = perms.has("ADMINISTRATOR");
          //only executes if user has ADMINISTRATOR permissions
          if(hasAdmin === true){
              console.log("printing stored goodbye: " + config.goodbye);
             let msg = args.join(" ");
             console.log (msg);
            
             var fs = require('fs')
            fs.readFile('\config.json', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(config.goodbye, msg);

                fs.writeFile('\config.json', result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            });
            console.log("printing new goodbye: " + config.goodbye);
            let newmsg = "```" + config.goodbye + "```";
            message.channel.send(config.emojis.yes+" | You have set a new goodbye message: \n" + `${newmsg}`); 
          }
          else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to ban a member but doesn't have required permissions.");
          }
  
    },
};
   