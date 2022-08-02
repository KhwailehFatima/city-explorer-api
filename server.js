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
const port = process.env.PORT || 3001;


app.get('/weather', (req, res) => {

  let searchQuery = req.query.searchQuery; //let {searchQuery} = req.query
  const city = weatherData.find(city => { city.city_name.toLowerCase() === searchQuery.toLowerCase() });

  try {
    const weatherArr = city.data.map(item => new Forecast(item))
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