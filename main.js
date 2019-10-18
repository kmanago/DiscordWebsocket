const fs = require('fs'); //nodejs file system
const Discord = require('discord.js');
//const { Client } = require('discord.js')
//const WS = require('./ws/ws');
const Enmap = require("enmap");

// load config.json
const config = require('./config.json');


/*
var app = require('./app');
var debug = require('debug')('mywebsite:server');
var http = require('http');



var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);



var server = http.createServer(app);



server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}



function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
*/


const client = new Discord.Client({disableEveryone: true});

//create command collection and get all command files
client.commands = new Discord.Collection(); // Collection for all commands
client.aliases = new Discord.Collection(); // Collection for all aliases of every command

client.userprofile = new Enmap({name: "profile"});
exports.up = client.userprofile;


const modules = ['Administration', 'Fun', 'Management', 'Moderation', 'Misc', 'Roles', 'Users']; 
// This will be the list of the names of all modules (folder) your bot owns

modules.forEach(c => {
	fs.readdir(`./commands/${c}/`, (err, files) => { // Here we go through all folders (modules)
		if (err) throw err; // If there is error, throw an error in the console
		console.log(`[Commandlogs] Loaded ${files.length} commands of module ${c}`); 
		// When commands of a module are successfully loaded, you can see it in the console

		files.forEach(f => { // Now we go through all files of a folder (module)
			const command = require(`./commands/${c}/${f}`); // Location of the current command file
			client.commands.set(command.name, command); // Now we add the commmand in the client.commands Collection which we defined in previous code
			client.aliases.set(command.name,command.aliases);
		});
	});
});	


// inject config into client instance object
client.config = config;


//client.allowedChannels = new Discord.Collection(); // Collection channels that points to be earned
const channels = require('./channels.json');
const ac = channels.allowed;
var count = ac.length;

const levels = require('./levels.json');
const lvls = levels.newrole;
var count2 = lvls.length;


// Create Websocket instance with token '123456',
// port 5665 and passing the discord client instance
//var ws = new WS(config.ws.token, config.ws.port, client)

//set a cool down
const cooldowns = new Discord.Collection();

// If the bot is ready, this event will be fired
client.on('ready', () => {
	client.user.setPresence({ game: { name: '!help' }, status: 'online' })
    console.log(`Connected as ${client.user.tag}`)
})

//welcomemessage
client.on("guildMemberAdd", (member) => {
	//look for a channel with this name
	const channel = member.guild.channels.find(ch => ch.name === 'arrivals');

	//channel not found
	if (!channel) return;
	let guild = member.guild;
		//channel.send(`Welcome ${member} to ${guild}!! ` + config.welcome);
		//channel.send(config.welcome);
		var wel = config.settings.welcome;
		var str = wel.replace(/{member}/g, `${member}`);
		var welcome = str.replace(/{server}/g, `**${guild}**`);
		channel.send(welcome);
	});

	client.on("guildMemberRemove", (member) => {
		//look for a channel with this name
		const channel = member.guild.channels.find(ch => ch.name === 'departures');
	
		//channel not found
		if (!channel) return;

		//get server and set the goodbye message up with the correct inputs
		let guild = member.guild;
		var gb = config.settings.goodbye;
		var str = gb.replace(/{member}/g, `${member}`);
		var goodbye = str.replace(/{server}/g, `${guild}`);
		channel.send(goodbye);
		});
	




//message/command handling within discord
client.on('message', message => {

    //check message prefix and the bot
	if (!message.content.startsWith(config.settings.prefix) || message.author.bot) return;

	/******************
	 * enmap xp
	 ******************/

	 //makes sure this isn't in a DM
	if(message.guild){
		//a key variable to simplfy the worth of points
		const key =`${message.guild.id}-${message.author.id}`;

		//triggers on new users
		 client.userprofile.ensure(key, {
			user: message.author.id,
			guild: message.guild.id,
			points: 10,
			level: 1,
			coins: 500,
			warnlevel: 0,
			bgcolor: '#f2f2f2',
			maincolor: '#BAF0BA',
			txtcolor: '#23272A',
			title: 'This is a Title',
			info: 'This is some text to act as my own personal status/info/about me. Whatever. Good news! It wraps text on its own.',
			headerimg: 'https://pbs.twimg.com/media/CkCp_VhWYAAJcrU.jpg',
			lastSeen: new Date()
		  });
		  //client.userprofile.inc(key, "points");
		  //var newpoints=0;
		  const newcoins = Math.floor(Math.random()*7)+ 8;
		  client.userprofile.math(key, "+",newcoins, "coins");

		  if(ac.length === 0){
			 const newpoints = Math.floor(Math.random()*7)+ 15;
			 client.userprofile.math(key, "+",newpoints, "points");

			 // Calculate the user's current level
			 const curLevel = Math.floor(0.1 * Math.sqrt(client.userprofile.get(key, "points")))+1;
    
			 // Act upon level up by sending a message and updating the user's level in enmap.
			 if (client.userprofile.get(key, "level") < curLevel) {
			   let lvlID = config.emojis.lvlup;
			   message.reply(`${lvlID}**Congrats!** You've leveled up to **Level ${curLevel}**! Keep going!`);
			   client.userprofile.math(key, "+",200, "coins");
			   client.userprofile.set(key, curLevel, "level");
			 }
   
			 //checks to see if level is at needed one fornew rank
			 if(curLevel == 5 ){
			   let addrankup = message.member;
			   let roleName = 'lvl 5'
			   let role = message.guild.roles.find(x => x.name == roleName);
			   if(!role) {
				   message.guild.createRole({
					   name: roleName
				   });
			   }
			   let lvlRole = message.guild.roles.find(x => x.name == roleName);
			   if(message.member.roles.has(lvlRole.id)){
				//do nothing
			}
			else{
				message.channel.send("**Congrats!** You've received a new role!**");
				addrankup.addRole(lvlRole.id).catch(console.error);
			}
			 }
		  }//end of ac.length
		  
		  else{
			for(i=0;i<count;i++){
				//console.log(ac[i].name)
				var name = ac[i].name;
				if(message.channel.name === name){
					const newpoints = Math.floor(Math.random()*7)+ 15;
			 		client.userprofile.math(key, "+",newpoints, "points");
				}
			}//end of for loop

			 // Calculate the user's current level
			 const curLevel = Math.floor(0.1 * Math.sqrt(client.userprofile.get(key, "points")))+1;
    
			 // Act upon level up by sending a message and updating the user's level in enmap.
			 if (client.userprofile.get(key, "level") < curLevel) {
			   let lvlID = config.emojis.lvlup;
			   message.reply(`${lvlID}**Congrats!** You've leveled up to **Level ${curLevel}**! Keep going!`);
			   client.userprofile.math(key, "+",200, "coins");
			   client.userprofile.set(key, curLevel, "level");
			 }

			for(i=0;i<count2;i++){
				//console.log(ac[i].name)
				//console.log(lvls[i].level)
				var level = lvls[i].level;
				var lvlName = lvls[i].rolename;
				if(curLevel == level){
					let addrankup = message.member;
					let roleName = `${lvlName}`
					
					let role = message.guild.roles.find(x => x.name == roleName);
					if(!role) {
						message.guild.createRole({
							name: roleName
						});
					}
					let lvlRole = message.guild.roles.find(x => x.name == roleName);
					if(message.member.roles.has(lvlRole.id)){
						//do nothing
					}
					else{
						message.channel.send("**Congrats!** You've received a new role!**");
						addrankup.addRole(lvlRole.id).catch(console.error);
					}
					
				}
			}//end of for loop
		  }
		  

		  
	}

	/******************
	 * end of enmap xp
	 ******************/

	const args = message.content.slice(config.settings.prefix.length).split(' ');
	//const args = message.content.slice(config.settings.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    //checks for the command within the collection
	//if (!client.commands.has(commandName)) return;
   const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	//const command = client.commands.get(commandName);	
   if (!command) return;

	//checks to make sure this isn't within a DM
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
    //checks for command args
    if (command.args && !args.length) {
		let noID = config.emojis.no;
		let reply = `${noID} | You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {

        	reply += `\nThe proper usage would be: \`${command.usage}\``;
		}
		
		message.channel.send(reply);
    }

    //cooldown check
    if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const hours = Math.floor(timeLeft / 3600);
			const time = timeLeft - hours * 3600;
			const minutes = Math.floor(time/60);
			const seconds = time - minutes * 60;

			return message.reply(`please wait ${hours} hour(s), ${minutes} minute(s), and ${seconds.toFixed(0)} second(s) before reusing the \`${command.name}\` command.`);

			//return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});


// Logging in Discord Bot at the API
client.login(config.token)