'use strict';

const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
//my application using express
const app = express();

//middleware to allow cross origin requests
app.use(cors());

//require the modules
const {handleWeather}=require('./module/weather');
const {handleMovie}=require('./module/movie');
 
//create a port
const port = process.env.PORT || 3002;


app.get('/weather', handleWeather);//localhost:3001/weather?lat=${}&lon=${}
app.get('/movie', handleMovie);//

//for anything that doesnt exist in code
app.get('*', (req, res) => { res.status(404).send('Page not found!'); });


//function to send an error if found it will be deployed in the catch
// function handleError(error, res) {
//   res.status(500).send({ error: 'Something went wrong' });
// }


app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
