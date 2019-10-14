const config = require('../../config.json');
const Discord = require('discord.js');
const apikey   = config.apikeys.weather; 
const fetch = require('node-fetch');
module.exports = {
	name: 'weather',
	description: 'Get the weather',
	category: 'Fun',
    usage: '!weather [US zipcode | city,country code]',
    args: true,
	execute(message, args) {
        let loc = args.join(' ');

        //get based on city name and state
        if(isNaN(loc)){
            console.log('not a number: '+loc);
            const location = loc.replace(/\s/g, "");
            console.log('not a number: '+location);
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`)
            .then((response) => { return response.json() })
            .then((parsedWeather) => { console.log(parsedWeather)
                if(parsedWeather.cod === '404'){
                    return message.channel.send("This zip code does not exist or this no information available.")
                }
                else{
                    const weatherEmbed = new Discord.RichEmbed();
                    weatherEmbed.setTitle(`Current weather for ${parsedWeather.name},${parsedWeather.sys.country}`);
                    weatherEmbed.setThumbnail(`http://openweathermap.org/img/w/${parsedWeather.weather[0].icon}.png`);

                    weatherEmbed.addField(`**Forecast: ** ${parsedWeather.weather[0].main}`, `Description: ${parsedWeather.weather[0].description}`, false);
                    weatherEmbed.addField('Pressure', `${parsedWeather.main.pressure} hpa`, true);
                    weatherEmbed.addField(':sweat_drops: Humidity', `${parsedWeather.main.humidity} %`, true);
                    weatherEmbed.addField(':wind_blowing_face: Wind', `${parsedWeather.wind.speed} m/s`,true);
                    weatherEmbed.addField(':cloud: Cloudiness', `${parsedWeather.clouds.all} %`,true);
               
                    weatherEmbed.addBlankField();
                   
                    const mainTempF = Math.round((parsedWeather.main.temp -273.15) * 9/5 +32);
                    const highTempF = Math.round((parsedWeather.main.temp_max -273.15) * 9/5 +32);
                    const lowTempF = Math.round((parsedWeather.main.temp_min -273.15) * 9/5 +32);
                    const mainTempC = Math.round((parsedWeather.main.temp -273.15));
                    const highTempC = Math.round((parsedWeather.main.temp_max -273.15));
                    const lowTempC = Math.round((parsedWeather.main.temp_min -273.15));

                    weatherEmbed.addField(`🌡**Temperature:**   ${mainTempF} ° F/ ${mainTempC} ° C`,'\n\u200b');
                    weatherEmbed.addField('🔼 High', `${highTempF} ° F/ ${highTempC} ° C`, true);
                    weatherEmbed.addField('🔽 Low', `${lowTempF} ° F/ ${lowTempC} ° C`,true);

                    const dateSR = new Date(parsedWeather.sys.sunrise*1000);
                    const hoursSR = dateSR.getHours();
                    const minutesSR = "0" + dateSR.getMinutes();
                    const secondsSR = "0" + dateSR.getSeconds();
                    const sunrise = hoursSR + ':' + minutesSR.substr(-2) + ':' + secondsSR.substr(-2);

                    const dateSS = new Date(parsedWeather.sys.sunset*1000);
                    const hoursSS = dateSS.getHours();
                    const minutesSS = "0" + dateSS.getMinutes();
                    const secondsSS = "0" + dateSS.getSeconds();
                    const sunset = hoursSS + ':' + minutesSS.substr(-2) + ':' + secondsSS.substr(-2);

                    weatherEmbed.addBlankField();
                    weatherEmbed.addField('**:sunrise: Sunrise**', sunrise,true);
                    weatherEmbed.addField('**:city_sunset: Sunset**', sunset,true);
                
                    message.channel.send(weatherEmbed);
                }
            });  
        }
        //get based on zip
        else{
            console.log('a number: '+loc);
            if(loc.length != 5){
                return message.channel.send("Invalid zipcode format");
            }
            else{
                fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${loc},us&appid=${apikey}`)
                .then((response) => { return response.json() })
                .then((parsedWeather) => { console.log(parsedWeather)
                    if(parsedWeather.cod === '404'){
                        return message.channel.send("This zip code does not exist or this no information available.")
                    }
                    else{
                        const weatherEmbed = new Discord.RichEmbed();
                        weatherEmbed.setTitle(`Current weather for ${parsedWeather.name},${parsedWeather.sys.country}`);
                        weatherEmbed.setThumbnail(`http://openweathermap.org/img/w/${parsedWeather.weather[0].icon}.png`);
    
                        weatherEmbed.addField(`**Forecast: ** ${parsedWeather.weather[0].main}`, `Description: ${parsedWeather.weather[0].description}`, false);
                        weatherEmbed.addField('Pressure', `${parsedWeather.main.pressure} hpa`, true);
                        weatherEmbed.addField(':sweat_drops: Humidity', `${parsedWeather.main.humidity} %`, true);
                        weatherEmbed.addField(':wind_blowing_face: Wind', `${parsedWeather.wind.speed} m/s`,true);
                        weatherEmbed.addField(':cloud: Cloudiness', `${parsedWeather.clouds.all} %`,true);
                   
                        weatherEmbed.addBlankField();
                       
                        const mainTempF = Math.round((parsedWeather.main.temp -273.15) * 9/5 +32);
                        const highTempF = Math.round((parsedWeather.main.temp_max -273.15) * 9/5 +32);
                        const lowTempF = Math.round((parsedWeather.main.temp_min -273.15) * 9/5 +32);
                        const mainTempC = Math.round((parsedWeather.main.temp -273.15));
                        const highTempC = Math.round((parsedWeather.main.temp_max -273.15));
                        const lowTempC = Math.round((parsedWeather.main.temp_min -273.15));

                        weatherEmbed.addField(`🌡**Temperature:   ** ${mainTempF} ° F/ ${mainTempC} ° C`,'\n\u200b');
                        weatherEmbed.addField('🔼 High', `${highTempF} ° F/ ${highTempC} ° C`, true);
                        weatherEmbed.addField('🔽 Low', `${lowTempF} ° F/ ${lowTempC} ° C`,true);

                        const dateSR = new Date(parsedWeather.sys.sunrise*1000);
                        const hoursSR = dateSR.getHours();
                        const minutesSR = "0" + dateSR.getMinutes();
                        const secondsSR = "0" + dateSR.getSeconds();
                        const sunrise = hoursSR + ':' + minutesSR.substr(-2) + ':' + secondsSR.substr(-2);

                        const dateSS = new Date(parsedWeather.sys.sunset*1000);
                        const hoursSS = dateSS.getHours();
                        const minutesSS = "0" + dateSS.getMinutes();
                        const secondsSS = "0" + dateSS.getSeconds();
                        const sunset = hoursSS + ':' + minutesSS.substr(-2) + ':' + secondsSS.substr(-2);

                        weatherEmbed.addBlankField();
                        weatherEmbed.addField('**:sunrise: Sunrise**', sunrise,true);
                        weatherEmbed.addField('**:city_sunset: Sunset**', sunset,true);
                    
                        message.channel.send(weatherEmbed);
                    }
                });  
            }
        }
    },
};//end of export
