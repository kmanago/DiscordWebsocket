// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
const config = require('../../config.json');
const defaultprefix = "!";
const defaultModLogChannel= "mod-log";
const defaultModRole = "Moderator";
const defaultAdminRole= "Administrator";
const defaultWelcomeChannel= "arrivals";
const defaultWelcome= "Welcome {member} to {server}- Remember to look over the rules & and introduce yourself in the proper channel. Once you've done so, you'll be allowed access to meet everyone else.";
const defaultGoodbyeChannel= "depatures";
const defaultGoodbye = "Goodbye {member}/ We understand you have to continue that journey to bigger and better regions!";

module.exports = {
    name: 'set',
    description: 'View or change settings for your server.',
    category: 'Administration',
    usage: '!set',
    guildOnly: true,
    aliases: ["setting", "settings"],
   // args: true,
    async execute(message, [action, key, ...value],) {
    
        let perms = message.member.permissions;
        let hasAdmin = perms.has("ADMINISTRATOR");
        
        //only executes if user has ADMINISTRATOR permissions
        if(hasAdmin === true){
        // First we need to retrieve current guild settings
        const settings = config.settings;
            if(action === 'edit'){
                if (!key){
                    return message.reply("Please specify a key to edit");
                }
             
                if (!settings[key]){
                    return message.reply("This key does not exist in the settings");
                }
              
                const joinedValue = value.join(" ");
            
                if (joinedValue.length < 1) {
                    return message.reply("Please specify a new value");
                }
                if (joinedValue === settings[key]){
                    return message.reply("This setting already has that value!");
                }
                var fs = require('fs')
                fs.readFile('\config.json', 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data.replace(settings[key], joinedValue);
    
                    fs.writeFile('\config.json', result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                    message.reply(`${key} successfully edited to ${joinedValue}`);
                });
                
            }

            //reset function needs to be fixed...
            if(action === 'del' || action === 'reset'){
                console.log('chose reset/del');
                if (!key){
                    return message.reply("Please specify a key to delete (reset).");
                }
                if (!settings[key]) {
                    return message.reply("This key does not exist in the settings");
                }

                // Throw the 'are you sure?' text at them.
                 const response = await message.channel.awaitMessages(message, `Are you sure you want to reset \`${key}\` to the default?`);

                 // If they respond with y or yes, continue.
                var resetValue='';
                if (["y", "yes"].includes(response)) {
                    switch(key){
                        case 'prefix':{
                            resetValue =defaultprefix;
                        }
                        case 'modLogChannel':{
                            resetValue =defaultModLogChannel;
                        }
                        case 'modRole':{
                            resetValue =defaultModRole;
                        }
                        case 'adminRole':{
                            resetValue =defaultAdminRole;
                        }
                        case 'welcomeChannel':{
                            resetValue =defaultWelcomeChannel;
                        }
                        case 'welcome':{
                            resetValue =defaultWelcome;
                        }
                        case 'goodbyeChannel':{
                            resetValue =defaultGoodbyeChannel;
                        }
                        case 'goodbye':{
                            resetValue =defaultGoodbye;
                        }
                    }
                    // We reset the `key` here.
                    var fs = require('fs')
                    fs.readFile('\config.json', 'utf8', function (err,data) {
                        if (err) {
                            return console.log(err);
                        }
                        var result = data.replace(settings[key], resetValue);
        
                        fs.writeFile('\config.json', result, 'utf8', function (err) {
                            if (err) return console.log(err);
                        });
                        message.reply(`${key} successfully reset to default value: ${resetValue}`);
                    });
                }
            }    
        }//permissions if
 

        else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to ban a member but doesn't have required permissions.");
          }
    /* if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
 
    // Secondly, if a user does `-set edit <key> <new value>`, let's change it
    if (action === "edit") {
      // User must specify a key.
      if (!key) return message.reply("Please specify a key to edit");
      // User must specify a key that actually exists!
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      // User must specify a value to change.
      const joinedValue = value.join(" ");
      if (joinedValue.length < 1) return message.reply("Please specify a new value");
      // User must specify a different value than the current one.
      if (joinedValue === settings[key]) return message.reply("This setting already has that value!");

      // If the guild does not have any overrides, initialize it.
      if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});

      // Modify the guild overrides directly.
      this.client.settings.set(message.guild.id, joinedValue, key);
      message.reply(`${key} successfully edited to ${joinedValue}`);
    } else
  
    // If a user does `-set del <key>`, let's ask the user if they're sure...
    if (action === "del" || action === "reset") {
      if (!key) return message.reply("Please specify a key to delete (reset).");
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");

      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${defaults[key]}\`?`);

      // If they respond with y or yes, continue.
      if (["y", "yes"].includes(response)) {

        // We reset the `key` here.
        this.client.settings.delete(message.guild.id, key);
        message.reply(`${key} was successfully reset to default.`);
      } else

      // If they respond with n or no, we inform them that the action has been cancelled.
      if (["n","no","cancel"].includes(response)) {
        message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
      }
    } else
  
    // Using `-set get <key>` we simply return the current value for the guild.
    if (action === "get") {
      if (!key) return message.reply("Please specify a key to view");
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      message.reply(`The value of ${key} is currently ${settings[key]}`);
      
    } else {
      // Otherwise, the default action is to return the whole configuration;
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Current Guild Settings =\n${array.join("\n")}`, {code: "asciidoc"});
    }
    */
  },

};
