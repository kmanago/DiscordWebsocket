module.exports = {
	name: 'setnickname',
  description: 'Changes users nickname',
  category: 'Users',
  usage: '!setnickname [new name]',
  args: true,
  execute(message, args) {
		
        let name = args[0];
        console.log(name);
        message.member.setNickname(name);
     },
  
};
 