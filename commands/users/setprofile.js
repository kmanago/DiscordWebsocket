var source = require('../../main.js');
var pts = source.points;
module.exports = {
    name: 'setprofile',
    description: 'Set different parts of your profile. For colors, provide the hex color code.',
    category: 'Users',
    usage: '!setprofile [color, hex]',
    async execute(message, args) {

    const selection = ['color', 'background']; 
    const change = args[0];
    const key =`${message.guild.id}-${message.author.id}`;

    if(change === selection[0]){
        //console.log(change);
        const newSetting = args[1];
        pts.set(key, newSetting, "color");
        message.reply("Your new color has been set.");
      
    }
    
    }
}