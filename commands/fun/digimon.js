const fetch = require('node-fetch');
var querystring = require('querystring');
module.exports = {
	name: 'digimon',
	description: '',
    category: 'Fun',
    usage: '!digimon',
	async execute(message, args) {
        let filter = args[0];
        let digi = args[1];
        let output='';
        //console.log(filter);
        //console.log(digi);
       if(filter === 'name'){
            //const query = querystring.stringify(digi);
            await fetch(`https://digimon-cyber-sleuth-api.herokuapp.com/api/digimon/name/`+digi)//.then(response => response.json());
            //const { list } = await fetch ('https://digimon-cyber-sleuth-api.herokuapp.com/api/digimon/name/${query}').then(response => response.json());
            .then(res => res.text())
            .then(text => output = (text)) 
            console.log(output)
           //console.log(list);
        }
        
	},
};