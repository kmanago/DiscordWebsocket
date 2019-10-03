
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const hexToRgba = require("hex-to-rgba");
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const fetch = require("node-fetch"); // This is to fetch the user avatar and convert it to a buffer.
const imageUrlRegex = /\?size=2048$/g;
Canvas.registerFont('./fonts/rubik/rubik-regular.ttf', { family: 'Rubik' })
Canvas.registerFont('./fonts/rubik/rubik-bold.ttf', { family: 'Rubik Bold' })
var source = require('../../main.js');
var userprofile = source.up;

module.exports = {
    name: 'profile',
    description: 'Display user profile',
    category: 'Users',
    usage: '!profile',
    async execute(message, args) {
        //function to create the card
        async function profile(member, score) {
            const key = `${message.guild.id}-${message.author.id}`;
            // We only need the level, and points values, we don't need the user or guild id.
            const { level, points, bgcolor, maincolor, txtcolor, coins, headerimg, title, info } = userprofile.get(key);
        
            // We're grabbing the body out of snekfetch's get method, but at the same time we're assigning a variable
            // to it, avatar.
            // Remember when I mentioned the regex before? Now we get to use it, we want to set the size to 128 pixels,
            // instead of 2048 pixels.
        
            try {
            const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
            if (!result.ok) throw new Error("Failed to get the avatar.");
            const avatar = await result.buffer();

            const img = await fetch(`${headerimg.toLocaleString()}`);
            if (!img.ok) throw new Error("Failed to get the image.");
            const header= await img.buffer();
            
            // The reason for the displayName length check, is we don't want the name of the user going outside
            // the box we're going to be making later, so we grab all the characters from the 0 index through
            // to the 17th index and cut the rest off, then append `...`.
            const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
        
            const filtered = userprofile.filter( p => p.guild === message.guild.id ).array();
            const sorted = filtered.sort((a, b) => b.points - a.points);
            const mem = message.author.id;
            const results = sorted.find( ({user}) => user ===  mem);
            const rank = (sorted.indexOf(results)+1);      

            const curLevel = Math.floor(0.1 * Math.sqrt(userprofile.get(key, "points")))+1;
            const x = curLevel / 0.1;
            const nxt = Math.pow(x,2);
            const cur = (userprofile.get(key, "points"));
            //const diff = nxt - cur;
            const percentage = (cur/nxt)*380;
    
            
            /*const upcoming=(curLevel + 1);
            console.log(`next level: ${upcoming}`);
            console.log(`points for next level: ${nxt}`);
            console.log(`points needed for next level: ${diff}`);*/
            let profile = new Canvas(400, 350)
           
            //create the header image
            .addImage(header, 0, 0, 400, 100)
             // Create the background rectangle.
            .setColor(`${bgcolor.toLocaleString()}`)
            .addRect(0, 100, 400, 350)
           
            // Create the "Dark, but not black" boxes for the left side of the image
            // and the text boxes on the right.
            .setColor(`${maincolor.toLocaleString()}`)
            //.addRect(0, 100, 84, 350)
            .addRect(140, 80, 300, 46)
            .addRect(170, 138, 220, 150)
            .setColor(`${bgcolor.toLocaleString()}`)
            .addRect(175, 142, 210, 140)
            

            //create XP bar
            .save()
            //.setColor(`${maincolor.toLocaleString()}`)
            .setColor('#2C2F33')
            .createBeveledClip(11, 300, 380, 20, 48)
            .fill()
            .restore()
            
            //fill in XP bar
            .save()
            .setColor(`${maincolor.toLocaleString()}`)
            .createBeveledClip(10, 300, percentage, 20, 50)
            .fill()
            .restore()

            //.addRect(10,300,380,50)
           
            // This circle is 2 pixels smaller in the radius to prevent a pixel border.
            .setColor(`${bgcolor.toLocaleString()}`)
            .addCircle(84, 90, 68)
            .addCircularImage(avatar, 84, 90, 64)
            // This creates a rounded corner rectangle, you must use save and restore to
            // clear the clip after we are done with it
            .save()
            .createBeveledClip(20, 165, 128, 32, 5)
            .setColor(`${bgcolor.toLocaleString()}`)
            .fill()
            .restore()

            // Add all of the text for the template.       
            // I'm using a custom font, which I will show you how to add next.
            .setTextFont("20px Rubik Bold")
            // Set the colour to white, since we have a dark background for all the text boxes.
            .setColor(`${txtcolor.toLocaleString()}`)
            // Add the name variable.
            .addText(`${title.toLocaleString()}`, 160, 108)
            .setTextAlign("center")
            .addText(name, 84, 180)

            // Create a shadow effect for the avatar placement.
            //.setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
            //.setShadowOffsetY(5) // Drop the shadow by 5 pixels.
            //.setShadowBlur(10) // Blur the shadow by 10.

            
            // Using template literals, you can add text and variables, we're applying the toLocaleString()
            // to break up the number into a nice readable format.
            .setTextFont("16px Rubik")
            .addText(`Level \n   ${level.toLocaleString()}`, 35, 200)
            .addText(`Rank \n   ${rank}`, 135, 200)
            // Now we want to align the text to the left.
            .setTextAlign("left")
            // Let's add all the points!
            .addText(`Credits: ${coins.toLocaleString()}`, 10, 255)
            .addText(`${points.toLocaleString()}/${nxt} XP`, 250, 345)
            .setTextFont("16px Rubik Bold")
            .addText('Info Box', 180, 168)
            .setTextFont("12px Rubik")
            .addWrappedText(`${info.toLocaleString()}`, 195, 200, 190)
            .toBuffer()

            return (profile);
            } catch (error) {
            await message.channel.send(`Something happened: ${error.message}`);
            }
            
          }
         
        //the command  
        if (message.guild) {
            // This creates a "key" for enmaps Key/Value system.
            // We've declared it as a variable as we'll be using it in multiple places.
            const key = `${message.guild.id}-${message.author.id}`;
            // If the points database does not have the message author in the database...
            if (!userprofile.has(key)) {
              // Create an entry for them...
              userprofile.set(key, {
                // Using the predefined information below.
                user: message.author.id, guild: message.guild.id, points: 0, level: 1
              });
            }
            // We await both the message.channel.send, and the profile function.
            // Also remember, we wanted to pass the member object, and the points object.
            // Since we're creating a user profile, we should give it a unique file name.
            const buffer = await profile(message.member, userprofile.get(key));
            const filename = `profile-${message.author.id}.jpg`;
            const attachment = new Attachment(buffer, filename);
            await message.channel.send(attachment);
          }
     
    }
}

