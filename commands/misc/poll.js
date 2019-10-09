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
    usage: '!poll question?, choice1, choice2, choice(n), time number, unit of time (Seconds/Minutes/Hours)',
   args: true,
 async execute(message,args) {

    const pollInfo = args.join(" ").split(',');
    const pollTitle = pollInfo[0];

    pollOptions = new Array ();
    for(i=1;i<pollInfo.length-2; i++){
        pollOptions[i-1] = pollInfo[i];
    }
    pollTimer = pollInfo[pollInfo.length-2].trim();
    if(isNaN(pollTimer)){
        pollTimer = 30;
    }

    const pollTime = pollInfo[pollInfo.length-1].trim();
    console.log(pollOptions);

    takePoll(message, pollTitle, pollOptions,pollTimer, pollTime);
    message.reply(takePoll);

// There you go, now you have poll embeds
	},
}

async function takePoll (message, title, options, timeout, timesync){
    //const takePoll = async (message, title, options, timeout = 30, emojiList = defEmojiList.slice(), forceEndPollEmoji = '\u2705') => {
        if (!message && !message.channel) return message.reply('Channel is inaccessible.');
        console.log('\x1b[36m%s\x1b[0m','Channel: ' + message.channel);
        if (!title) return message.reply('Poll title is not given.');
        console.log('\x1b[36m%s\x1b[0m','Title: ' +title);
        if (!options) return message.reply('Poll options are not given.');
        console.log('\x1b[36m%s\x1b[0m','Options: ' +options);
        console.log('\x1b[36m%s\x1b[0m','Timeout: ' +timeout);
        console.log('\x1b[36m%s\x1b[0m','sync:' +timesync);
        /*if(!timeout){
            timeout = 30;
        }*/
        if (options.length < 2) return message.reply('Please provide more than one choice.');
       let emojiList = defEmojiList.slice();
       let forceEndPollEmoji = '\u2705';
        //if (options.length > emojiList.length) return message.reply(`Please provide ${emojiList.length} or less choices.`);
    
        var countdown=0;
        if(timesync === 'seconds'){
            countdown += timeout * 1000;
           console.log(countdown);
        }
        if(timesync == 'minutes' || timesync == 'minute'){
            countdown += timeout  * 60000;
            console.log(countdown);
        }
        if(timesync == 'hours' || timesync == 'hour'){
            countdown += timeout * 3600000;
            console.log(countdown);
        }
        if(timesync == 'days' || timesync == 'day'){
            countdown += timeout * 86400000;
            console.log(countdown);
        }
       

        let text = `*To vote, react using the correspoding emoji.\nThe voting will end in **${timeout} ${timesync}**.\nPoll creater can end the poll **forcefully** by reacting to ${forceEndPollEmoji} emoji.*\n\n`;
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
                /*if (reaction.emoji.name === forceEndPollEmoji && message.author.id === user.id){
                    return console.log('this is ending') //reactionCollector.stop();
                };*/
                if (!voterInfo.has(user.id)) {
                    voterInfo.set(user.id, { emoji: reaction.emoji.name });
                //}
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
    //}
}