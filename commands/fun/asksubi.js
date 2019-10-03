module.exports = {
	name: 'asksubi',
    description: 'Treat Subi like an 8Ball.',
    aliases: '8ball',
	category: 'Fun',
    usage: '!asksubi [question] OR !8ball [question]',
    args: true,
	execute(message, args) {
        let params = encodeURIComponent(args.join(" "));
        let uri = 'https://8ball.delegator.com/magic/JSON/' + params;
        
        fetch(uri)
        .then((response) => { return response.json() })
        .then((json) => { console.log(json)
            message.reply(json.magic.answer + '.')});  
	},
};