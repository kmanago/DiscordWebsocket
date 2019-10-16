const Discord = require('discord.js');
const configL = require('../../levels.json');

module.exports = {
    name: 'levelroles',
    description: 'Gets a list of roles that are given based on user level.',
    category: 'Roles',
    usage: '!levelroles',
    guildOnly: true,
    execute(message) {
            const ac = configL.newrole;
            var count = ac.length;
            rolesEmbed = new Discord.RichEmbed();
            rolesEmbed.setTitle("Level up Roles");
            rolesEmbed.setColor('#BAF0BA');
            rolesEmbed.setDescription('The roles listed below are ones that users can gain with XP which has been set by the Admins.');
            for (i=0;i<count;i++) {
                rolesEmbed.addField("**Required Level: **" + ac[i].level, '**Role Name:**' + ac[i].rolename, false);
            }
            return message.channel.send(rolesEmbed);
    },
};