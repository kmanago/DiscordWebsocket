const config = require('../../config.json');
const prompter = require('discordjs-prompter');
const Discord = require('discord.js');

//these are the default settings when the bot is loaded and what things can be loaded back to.
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
    description: 'View or change settings for your server. To view current settings, call set without any arguments. You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Management',
    usage: '!set [action: edit/reset/del] [key value]',
    guildOnly: true,
    aliases: ["setting", "settings"],
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
                    message.reply(`\`${key}\` successfully edited to \`${joinedValue}\``);
                });
                
            }

            //reset function needs to be fixed...
            if(action === 'reset'){
                console.log('chose reset');
                if (!key){
                    return message.reply("Please specify a key to reset.");
                }
                if (!settings[key]) {
                    return message.reply("This key does not exist in the settings");
                }

                prompter.message(message.channel, {
                    question: `Are you sure you want to reset \`${key}\` to the default?`,
                    userId: message.author.id,
                    max: 1,
                    timeout: 10000,
                    })//end of prompter message
                    .then(responses => {
                        // If no responses, the time ran out
                        if (!responses.size) {
                        return message.channel.send('No time for questions? I see.');
                        }//if response size

                        const response = responses.first();
                        //console.log(response.content)
                    // Throw the 'are you sure?' text at them.
                    //const response = await message.channel.awaitMessages(message, `Are you sure you want to reset \`${key}\` to the default?`);

                    // If they respond with y or yes, continue.
                    var resetValue='';
                    if (response.content === 'y' || response.content ==='yes') {
                        console.log(response.content)
                        switch(key){
                            case 'prefix':{
                                resetValue =defaultprefix;
                                break;
                            }
                            case 'modLogChannel':{
                                resetValue =defaultModLogChannel;
                                break;
                            }
                            case 'modRole':{
                                resetValue =defaultModRole;
                                break;
                            }
                            case 'adminRole':{
                                resetValue =defaultAdminRole;
                                break;
                            }
                            case 'welcomeChannel':{
                                resetValue =defaultWelcomeChannel;
                                break;
                            }
                            case 'welcome':{
                                resetValue =defaultWelcome;
                                break;
                            }
                            case 'goodbyeChannel':{
                                resetValue =defaultGoodbyeChannel;
                                break;
                            }
                            case 'goodbye':{
                                resetValue =defaultGoodbye;
                                break;
                            }
                        }//end of switch

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
                            message.reply(`\`${key}\` successfully reset to default value: \`${resetValue}\``);
                        });
                    }//end of if response

                    else {
                        if (response.content === 'n' || response.content ==='no' || response.content ==='cancel'){
                           return message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
                        }
                        return  message.reply(`That's not a valid input. Your setting for \`${key}\` remains at \`${settings[key]}\``);
                    }//end of else response, canceling or not correct   
                });//end of prompter
            }//end of if reset
            
            if (action === "get") {
                if (!key) {
                    return message.reply("Please specify a key to view");
                }
                if (!settings[key]){
                    return message.reply("This key does not exist in the settings");
                }
                message.reply(`The value of \`${key}\` is currently \`${settings[key]}\``);
            }//end of get action

            //the default action
            else{
                settingsEmbed = new Discord.RichEmbed().setTitle('Current Guild Settings');
                settingsEmbed.setThumbnail(message.guild.iconURL);
                settingsEmbed.setColor('#BAF0BA');
                Object.entries(settings).forEach(([key, value]) => {
                    settingsEmbed.addField(`${key}`, `${value}`, false);
                });
                await message.channel.send(settingsEmbed);
            }
            
        }//permissions if
 

        else{
            message.channel.send(":no_entry: | ***You don't have permissions to do this action!***");
              console.log("User attempted to ban a member but doesn't have required permissions.");
          }
    },

};
