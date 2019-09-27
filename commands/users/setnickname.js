module.exports = {
	name: 'setnickname',
  description: 'Changes users nickname',
  category: 'users',
  usage: '!setnickname [new name]',
  args: true,
  execute(message, args) {
		if (!args[0]) {
        message.channel.send('No arguments were added!');
    } 
    else {
        let name = args[0];
        console.log(name);
        message.member.setNickname(name);
    }

  },
  
};
 