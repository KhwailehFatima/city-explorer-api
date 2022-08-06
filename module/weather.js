const axios = require('axios');

async function handleWeather(req,res){
  // let searchQuery = req.query.searchQuery; //let {searchQuery} = req.query
  const {searchQuery,lat,lon}=req.query;
  const weatherURL=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&query=${searchQuery}`
  const cityWeather=await axios.get(weatherURL);

  try {
    const weatherArr = cityWeather.data.data.map(item => new Forecast(item));
    console.log(cityWeather)
    res.status(200).send(weatherArr);

  } catch (err) {
    res.status(400).send(error)
  }
}

// class to take the data from weather api
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports={handleWeather};
