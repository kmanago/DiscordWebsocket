var source = require('../../main.js');
var userprofile = source.up;
module.exports = {
    name: 'setprofile',
    description: 'Set different parts of your profile.',
    category: 'Users',
    args: true,
    usage: '!setprofile [bgcolor colorhex / maincolor colorhex / txtcolor colorhex / headerimg imageurl / title text / info text ]',
    async execute(message, args) {
    const selection = ['bgcolor', 'maincolor', 'txtcolor', 'headerimg', 'title', 'info']; 
    const change = args[0];
    const key =`${message.guild.id}-${message.author.id}`;

        //change bgcolor
        if(change === selection[0]){
            const newSetting = args[1];
            userprofile.set(key, newSetting, "bgcolor");
            message.reply("Your new bgcolor has been set.");
        }

        //change maincolor
        else if(change === selection[1]){
            const newSetting = args[1];
            userprofile.set(key, newSetting, "maincolor");
            message.reply("Your new maincolor has been set.");
        }

        //change text color
        else if(change === selection[2]){
            const newSetting = args[1];
            userprofile.set(key, newSetting, "txtcolor");
            message.reply("Your new txtolor has been set.");
        }

        //change header
        else if(change === selection[3]){
            const newSetting = args[1];
            userprofile.set(key, newSetting, "headerimg");
            message.reply("Your new headerimg has been set.");
        }

        //change title
        else if(change === selection[4]){
            const newSetting = args.slice(1,args.length).join(" ");
            userprofile.set(key, newSetting, "title");
            message.reply("Your new title has been set.");
        }
        //change info
        else if(change === selection[5]){
            const newSetting = args.slice(1,args.length).join(" ");
            userprofile.set(key, newSetting, "info");
            message.reply("Your new info has been set.");
        }   
    }
}