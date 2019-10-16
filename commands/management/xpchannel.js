const Discord = require('discord.js');
const configCH = require('../../channels.json');
module.exports = {
    name: 'xpchannel',
    description: 'Sets channels where users can gain XP.You must have the ADMINISTRATOR permissions to run the command.',
    category: 'Management',
    usage: '!xpchannel <action: add/remove> <channel name>',
    guildOnly: true,

    async execute(message, [action, channel]) {
         //gets permissions of caller and check if they're an admin
         let perms = message.member.permissions;
         let hasAdmin = perms.has("ADMINISTRATOR");
         
         //only executes if user has ADMINISTRATOR permissions
         if(hasAdmin === true){

            if(action == 'add'){
                console.log('adding a channel');
                 if(!channel){
                     return message.reply('a channel name must be provided!');
                 }
                 else{
                     let ch = message.guild.channels.find(c => c.name == channel);   
                    if(!ch){
                        return message.reply('A channel with this name was not found');
                    }
                    else{
                     var fs = require('fs')
                     fs.readFile('\channels.json', 'utf8', function (err,data) {
                         if (err) {
                             return console.log(err);
                         }
                         obj = JSON.parse(data); //now it an object
                         obj.allowed.push({name: ch.name}); //add some data
                         result = JSON.stringify(obj); //convert it back to json
                         fs.writeFile('\channels.json', result, 'utf8', function (err) {
                             if (err) return console.log(err);
                         });
                         message.reply(`**added ${channel} to approved channels** list for earning XP.`);
                     });
                    }
                 }
            }//end of add action
     
           else if(action == 'remove'){
                console.log('removing a channel');
                if(!channel){
                     return message.reply('a channel name must be provided!');
                 }
                 else{
                     let ch = message.guild.channels.find(c => c.name == channel);   
                     if(!ch){
                         return message.reply('A channel with this name was not found');
                     }
                     else{
                         var fs = require('fs');
                         var removeUser = channel;
                         var data = fs.readFileSync('\channels.json');
                         var json = JSON.parse(data);
                         var users = json.allowed;
                         json.allowed = users.filter((cha) => { return cha.name !== removeUser });
                         fs.writeFileSync('\channels.json', JSON.stringify(json, null, 2));
                         message.reply(`**removed ${channel} from approved channels** list for earning XP.`);
                     }
                    
                 }
            }//end of remove action
     
            else if(action == 'reset'){
             console.log('resetting to default where all channels are eligible for earning XP');
             
                  let ch = message.guild.channels;   
                  if(!ch){
                      return message.reply('no channels exist');
                  }
                  else{
                     const ac = configCH.allowed;
                     var count = ac.length;
                     var fs = require('fs');
                      
                      var data = fs.readFileSync('\channels.json');
                      var json = JSON.parse(data);
                      var users = json.allowed;
                    
                     for(i=0;i<count;i++){
                         json.allowed = users.filter((x) => { 
                             let y = ch.find(c => c.name == x.name);    
                             return x.name !== y.name });
                         fs.writeFileSync('\channels.json', JSON.stringify(json, null, 2));
                     }
                     message.reply(`**reset approved channels** list for earning XP. All channels are eligible for earning XP.`);              
                 }
             }//end of reset action
         }

         else{
            message.channel.send("You don't have permissions to do this action!");
            console.log("User attempted to set an XP Channel but doesn't have required permissions.");
         }
    },
};