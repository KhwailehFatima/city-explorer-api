'use strict'

const express=require('express');
require('dotenv').config();
const cors=require('cors');

const app=express();

app.use(cors());

const weatherData=require('./data/weather.json');
//console.log(weatherData);


const port=process.env.PORT|| 3001;

app.get('/', (req,res)=>{
    res.send('Hello Partner')
});

app.get('/weather',(req,res)=>{
res.send(weatherData);
console.log(weatherData)
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
})