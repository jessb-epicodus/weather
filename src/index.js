import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './js/try.js';
// import checkLocation from './js/try.js';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");


    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
      
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`Temperature: ${Math.round(body.main.temp)} F`);
      $('.showWeather').text(`Conditions: ${body.weather[0].description}`);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showHumidity').text("");
      $('.showTemp').text("");
      $('.showWeather').text("");
    });

    // ***********************************
    // ***********************************  

    // let request2 = new XMLHttpRequest();
    // const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
    // request2.onreadystatechange = function() {
    //   if (this.readyState === 4 && this.status === 200) {
    //     const response2 = JSON.parse(this.responseText);
    //     forecast(response2);
    //   }
    // };

    // request2.open("GET", url2, true);
    // request2.send();

    // function forecast(response2) {
    //   for (let i = 3; i < 40; i = i + 8) {
    //     $('.5DayForecast').append(`Forecast for ${city} <br> ${response2.list[i].dt_txt}- Humidity:  ${response2.list[i].main.humidity}%;  Temperature: ${Math.round(response2.list[i].main.temp)}F;  Conditions: ${response2.list[i].weather[0].description} <br>`);
    //   }
    // }

  });
});






    // function getElements2(response2) {
    //   $('.5DayShowHumidity').text(`The forecasted humidity in ${city} is ${response2.list[0].main.humidity}%`);
    //   $('.5DayShowTemp').text(`The forecasted temperature in F is ${response2.list[0].main.temp} degrees.`);
    //   $('.5DayShowWeather').text(`The forecasated weather is ${response2.list[0].weather[0].description}.`);
    // }
    // try {
    //   const isLocationValid = checkLocation(city);
    //   if (isLocationValid instanceof Error) {
    //     console.error(isLocationValid.message);
    //     throw RangeError("Not a valid location!");
    //   } else {
    //     console.log("Try was successful, so no need to catch!")
    //   }
    // } catch(error) {
    //   console.error(`Red alert! We have an error: ${error.message}`);
    // }