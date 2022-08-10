const axios = require('axios');

const weatherCache={};

async function handleWeather(req,res){
//  console.log('handleWeather call');
  // let searchQuery = req.query.searchQuery; //let {searchQuery} = req.query
  const {lat,lon, searchQuery}=req.query;
console.log(searchQuery)
  if (weatherCache[searchQuery]!==undefined){
  //  console.log('defined');
    res.status(200).send(weatherCache[searchQuery]);
  } else{

    //console.log('undefined');
    const weatherURL=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
     const cityWeather=await axios.get(weatherURL);
 //   console.log(cityWeather.data);
    try {
      const weatherArr = cityWeather.data.data.map(item =>{
 //console.log(weatherArr)
        return new Forecast(item);
      });

      weatherCache[searchQuery] = weatherArr;
     // console.log(weatherCache) 
      res.status(200).send(weatherArr);
//console.log(res.status(200).send(weatherArr))
    } catch (error) {
      res.status(400).send(error);
  //    console.log(error)
return;   
}
  }
}


// class to take the data from weather api
class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

module.exports={handleWeather};
