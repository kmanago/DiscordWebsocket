const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'pokemon',
	description: 'Get information on a Pokemon by its name or Pokedex number',
	category: 'Fun',
    usage: '!pokemon [pokemon: name/dex #]',
    args: true,
	execute(message, args) {
      let poke = args[0];

            fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
            .then((response) => { return response.json() })
            .then((pokemon) => { console.log(pokemon)
               
                    const pokemonEmbed = new Discord.RichEmbed();
                    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    const typing = pokemon.types[0].type.name.charAt(0).toUpperCase() +pokemon.types[0].type.name.slice(1);
                    
                    pokemonEmbed.setTitle('#' +pokemon.order +' - ' + name);
                    pokemonEmbed.setThumbnail(`${pokemon.sprites.front_default}`);

                    pokemonEmbed.addField(':dividers: Typing',typing, true);
                    pokemonEmbed.addField(':scales: Weight',pokemon.weight, true);
                    pokemonEmbed.addField(':triangular_ruler: Height',pokemon.height, true);
                

                    const speed = pokemon.stats[0].base_stat;
                    const sd = pokemon.stats[1].base_stat;
                    const sa = pokemon.stats[2].base_stat;
                    const defense = pokemon.stats[3].base_stat;
                    const attack = pokemon.stats[4].base_stat;
                    const hp = pokemon.stats[5].base_stat;

                    pokemonEmbed.addField('**Stats**','\n\u200b');
                    pokemonEmbed.addField('⚔ Attack', attack, true);
                    pokemonEmbed.addField('🛡 Defense', defense, true);
                    pokemonEmbed.addField('❤ HP', hp, true);
                    pokemonEmbed.addField('Special-Attack', sa, true);
                    pokemonEmbed.addField('Special-Defense', sd, true);
                    pokemonEmbed.addField('💨 Speed', speed, true);

                    message.channel.send(pokemonEmbed);           
            });  
    },
};//end of export
