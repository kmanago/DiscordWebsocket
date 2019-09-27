const fs = require('fs'); //nodejs file system
const Discord = require('discord.js');
//const { Client } = require('discord.js')
const WS = require('./ws/ws');

// load config.json
const config = require('./config.json');

// Create Discord Bot Client
//var client = new Client.Client()
const client = new Discord.Client();

//create command collection and get all command files
//client.commands = new Client.Collection();
client.commands = new Discord.Collection(); // Collection for all commands
client.aliases = new Discord.Collection(); // Collection for all aliases of every command

const modules = ['administration', 'misc', 'roles', 'users']; 
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






/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
*/

// inject config into client instance object
client.config = config

// Create Websocket instance with token '123456',
// port 5665 and passing the discord client instance
var ws = new WS(config.ws.token, config.ws.port, client)


const cooldowns = new Discord.Collection();

// If the bot is ready, this event will be fired
client.on('ready', () => {
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
		var wel = config.welcome;
		var str = wel.replace(/{member}/g, `${member}`);
		var welcome = str.replace(/{server}/g, `${guild}`);
		channel.send(welcome);
	});

	client.on("guildMemberRemove", (member) => {
		//look for a channel with this name
		const channel = member.guild.channels.find(ch => ch.name === 'departures');
	
		//channel not found
		if (!channel) return;

		//get server and set the goodbye message up with the correct inputs
		let guild = member.guild;
		var gb = config.goodbye;
		var str = gb.replace(/{member}/g, `${member}`);
		var goodbye = str.replace(/{server}/g, `${guild}`);
		channel.send(goodbye);
		});
	

//message/command handling within discord
client.on('message', message => {
    //check message prefix and the bot
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    //checks for the command within the collection
	//if (!client.commands.has(commandName)) return;
   const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	//const command = client.commands.get(commandName);	
   if (!command) return;

    //checks for command args
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
        	reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
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
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
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
