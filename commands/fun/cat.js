const config = require('../../config.json');
const r2          = require('r2');
var querystring = require('querystring');
const DOG_API_URL   = "https://api.thecatapi.com/"
const DOG_API_KEY   = "your api key here"; // get a free key from - https://thedogapi.com/signup
module.exports = {
	name: 'cat',
	cooldown: 5,
	description: 'Get a random cat!',
	category: 'Fun',
	usage: '!cat',
	execute(message, args) {
		
        messageRecieved(message);
    },
};//end of export

async function messageRecieved(message)
        {
        try{
            // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
            var images = await loadImage(message.author.username);

            // get the Image, and first Breed from the returned object.
            var image = images[0];
            var breed = image.breeds[0];

            console.log('message processed','showing',breed)
            // use the *** to make text bold, and * to make italic
            message.channel.send( "***"+breed.name + "*** \r *"+breed.temperament+"*", { files: [ image.url ] } );
            // if you didn't want to see the text, just send the file

        }catch(error)
        {
            console.log(error)
        }
        }
        async function loadImage(sub_id)
        {
        // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
        var headers = {
            'X-API-KEY': DOG_API_KEY,
        }
        var query_params = {
            'has_breeds':true, // we only want images with at least one breed data object - name, temperament etc
            'mime_types':'jpg,png', // we only want static images as Discord doesn't like gifs
            'size':'small',   // get the small images as the size is prefect for Discord's 390x256 limit
            'sub_id': sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
            'limit' : 1       // only need one
        }
        // convert this obejc to query string 
        let queryString = querystring.stringify(query_params);
    
        try {
            // construct the API Get request url
            let _url = DOG_API_URL + `v1/images/search?${queryString}`;
            // make the request passing the url, and headers object which contains the API_KEY
            var response = await r2.get(_url , {headers} ).json
        } catch (e) {
            console.log(e)
        }
        return response;
    
            }
    
