//const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const defEmojiList = [
	'\u0031\u20E3',
	'\u0032\u20E3',
	'\u0033\u20E3',
	'\u0034\u20E3',
	'\u0035\u20E3',
	'\u0036\u20E3',
	'\u0037\u20E3',
	'\u0038\u20E3',
	'\u0039\u20E3',
	'\uD83D\uDD1F'
];

module.exports = {
	name: 'poll',
	aliases: ['survey','vote'],
	cooldown: 5,
	description: 'Creates a timed poll for users to react to with emojis. Can take up to 10 choices for the poll and be forced closed by the caller.',
	category: 'Misc',
    usage: '!poll [question] | [options: choice1, choice2, etc] |[duration s/h/m/d]',
   args: true,
 async execute(message,args) {

    //const pollInfo = args.join(" ").split(',');
    let str = args.join(' ').split('|');
    let pollInfo = str.map(Function.prototype.call, String.prototype.trim);
    console.log(pollInfo);
    const pollTitle = pollInfo[0];
    console.log('Title: ' + pollTitle);

    let str2 = pollInfo[1];
    let opts = str2.split(" ").join("");
    const pollOptions = opts.split(',');
    console.log('Choices: ' + pollOptions);

    let duration = pollInfo[2];
    pollTimer = duration.slice(0, -1);
    
    console.log('time #: ' +pollTimer);

    const pollTime = duration.slice(-1);;
    console.log('time units: '+pollTime);

    takePoll(message, pollTitle, pollOptions,pollTimer, pollTime);
    message.reply(takePoll);
	},
}

async function takePoll (message, title, options, timeout, timesync){
    
        if (!message && !message.channel) return message.reply('Channel is inaccessible.');
        console.log('\x1b[36m%s\x1b[0m','Channel: ' + message.channel);
        if (!title) return message.reply('Poll title is not given.');
        console.log('\x1b[36m%s\x1b[0m','Title: ' +title);
        if (!options) return message.reply('Poll options are not given.');
        console.log('\x1b[36m%s\x1b[0m','Options: ' +options);
        console.log('\x1b[36m%s\x1b[0m','Timeout: ' +timeout);
        console.log('\x1b[36m%s\x1b[0m','sync:' +timesync);
       
        if (options.length < 2) return message.reply('Please provide more than one choice.');
       let emojiList = defEmojiList.slice();
       let forceEndPollEmoji = '\u2705';
        
        var countdown=0;
        var unit;
        if(timesync === 's'){
            countdown += timeout * 1000;
            unit = 'second(s)'
           console.log(countdown);
        }
        if(timesync == 'm'){
            countdown += timeout  * 60000;
            unit = 'minute(s)'
            console.log(countdown);
        }
        if(timesync == 'h'){
            countdown += timeout * 3600000;
            unit = 'hour(s)'
            console.log(countdown);
        }
        if(timesync == 'd'){
            countdown += timeout * 86400000;
            unit = 'day(s)'
            console.log(countdown);
        }
       

        let text = `*To vote, react using the correspoding emoji.\nThe voting will end in **${timeout} ${unit}**.\nPoll creater can end the poll **forcefully** by reacting to ${forceEndPollEmoji} emoji.*\n\n`;
        const emojiInfo = {};
        for (const option of options) {
            const emoji = emojiList.splice(0, 1);
            emojiInfo[emoji] = { option: option, votes: 0 };
            text += `${emoji} : \`${option}\`\n\n`;
        }
        const usedEmojis = Object.keys(emojiInfo);
        usedEmojis.push(forceEndPollEmoji);
    
        const poll = await message.channel.send(embedBuilder(title, message.author.tag).setDescription(text));
        for (const emoji of usedEmojis) await poll.react(emoji);
    
        const filter = (reaction, user) => {
            return reaction.emoji.name === forceEndPollEmoji && message.author.id === user.id
        };
    
        

        const reactionCollector = poll.createReactionCollector(
            (reaction, user) => usedEmojis.includes(reaction.emoji.name) && !user.bot,
            timeout === 0 ? {} : (filter, { time: countdown })
        );
    
        
    
        const voterInfo = new Map();
        reactionCollector.on('collect', (reaction, user) => {
            if (usedEmojis.includes(reaction.emoji.name)) {
                
                if (!voterInfo.has(user.id)) {
                    voterInfo.set(user.id, { emoji: reaction.emoji.name });
          
                const votedEmoji = voterInfo.get(user.id).emoji;
                    if (votedEmoji !== reaction.emoji.name) {
                        const lastVote = poll.reactions.get(votedEmoji);
                        lastVote.count -= 1;
                        //console.log(lastVote.users);
                        //lastVote.users.remove(user.id);
                        emojiInfo[votedEmoji].votes -= 1;
                        voterInfo.set(user.id, { emoji: reaction.emoji.name });
                    } 
                }
                if (reaction.emoji.name !== forceEndPollEmoji && message.author.id !== user.id) {
                    emojiInfo[reaction.emoji.name].votes += 1;
                    console.log(emojiInfo[reaction.emoji.name]);
                }
                else{
                    reactionCollector.stop();
                }
                    
                
            }
        });
    
        reactionCollector.on('dispose', (reaction, user) => {
            if (usedEmojis.includes(reaction.emoji.name)) {
                voterInfo.delete(user.id);
                emojiInfo[reaction.emoji.name].votes -= 1;
            }
        });
    
        reactionCollector.on('end', () => {
            text = '*Ding! Ding! Ding! Time\'s up!\n Results are in,*\n\n';
            for (const emoji in emojiInfo) text += `\`${emojiInfo[emoji].option}\` - \`${emojiInfo[emoji].votes}\`\n\n`;
            poll.delete();
            message.channel.send(embedBuilder(title, message.author.tag).setDescription(text));
        });
    };
    
    const embedBuilder = (title, author) => {
        return new RichEmbed()
            .setTitle(`Poll - ${title}`)
            .setFooter(`Poll created by ${author}`);
}