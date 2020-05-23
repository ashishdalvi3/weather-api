const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'd9badd1b9b80090c303ae062a140f6e2';
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
  //res.render('index');
  //console.log(req.body.city);

  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  request(url, function (err, response, body) {
    let weather = JSON.parse(body)
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      
      console.log(weather);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees Celcius in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });


})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
