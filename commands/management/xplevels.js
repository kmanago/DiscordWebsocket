const Discord = require('discord.js');
const configL = require('../../levels.json');

module.exports = {
    name: 'xplevels',
    description: '',
    category: 'Management',
    usage: '!xplevels <action: add/remove> <level>  <level role name>',
    guildOnly: true,
    async execute(message, [action, level, ...levelname]) {
        //gets permissions of caller and check if they're an admin
        let perms = message.member.permissions;
        let hasAdmin = perms.has("ADMINISTRATOR");

        //only executes if user has ADMINISTRATOR permissions
        if (hasAdmin === true) {
            if (action == 'add') {
                console.log('adding a level');
                if (!level) {
                    return message.reply('a level must be provided!');
                }
                else {
                    if (!levelname) {
                        return message.reply('a level name must be provided!');
                    }
                    else {
                        var fs = require('fs')
                        var name = levelname.join(' ');
                        fs.readFile('\levels.json', 'utf8', function (err, data) {
                            if (err) {
                                return console.log(err);
                            }
                            obj = JSON.parse(data); //now it an object
                            obj.newrole.push({ level: level, rolename: name }); //add some data
                            result = JSON.stringify(obj); //convert it back to json
                            fs.writeFile('\levels.json', result, 'utf8', function (err) {
                                if (err) return console.log(err);
                            });
                            message.reply(`**Users who are ${level} or above will now earn the role ${name}.** *Others can gain it while leveling up.*`);
                        });
                    }
                }
            }//end of add action 

            else if (action == 'remove') {
                console.log('removing a level');
                if (!level) {
                    return message.reply('a level must be provided!');
                }
                else {
                    var fs = require('fs');
                    var removeUser = level;
                    var data = fs.readFileSync('\levels.json');
                    var json = JSON.parse(data);
                    var users = json.newrole;
                    json.newrole = users.filter((cha) => { return cha.level !== removeUser });
                    fs.writeFileSync('\levels.json', JSON.stringify(json, null, 2));
                    message.reply(`**Users can no longer obtain the role ${levelname} while earning XP.**`);
                }
            }//end of remove action


            else if (action == 'reset') {
                console.log('resetting to default where all channels are eligible for earning XP');
                const ac = configL.newrole;
                var count = ac.length;
                var fs = require('fs');
                var roles = message.guild.roles;
                var data = fs.readFileSync('\levels.json');
                var json = JSON.parse(data);
                var users = json.newrole;
                for (i = 0; i < count; i++) {
                    json.newrole = users.filter((x) => {
                        let y = roles.find(r => r.name == x.rolename);
                        return x.rolename !== y.name
                    });
                    fs.writeFileSync('\levels.json', JSON.stringify(json, null, 2));
                }
                message.reply('**reset approved channels** list earned levels while gaining XP. There are currently no roles set/made.');
            }//end of reset action
        }//end of permissions

        else {
            message.channel.send("You don't have permissions to do this action!");
            console.log("User attempted to set an XP Channel but doesn't have required permissions.");
        }
    },
};