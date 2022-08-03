'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

//require a weather variable
const weatherData = require('./data/weather.json');
//console.log(weatherData);

//create a port
const port = process.env.PORT || 3002;


app.get('/weather', (req, res) => {

  // let searchQuery = req.query.searchQuery; //let {searchQuery} = req.query
  let {searchQuery,lat,lon}=req.query;// to request there values

  const city = weatherData.find(item=> item.city_name.toLowerCase() === searchQuery.toLowerCase() );
console.log(city)
  try {
    const weatherArr = city.data.map(item => new Forecast(item))
    // weather: weatherData.data,

    res.status(200).send(weatherArr);
  } catch (err) {
   handleError(err, res)
  }
}
)



// function to handle error
function handleError(error, res) {
  res.status(500).send('Something went wrong');
}


// new object
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})