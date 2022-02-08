import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js';
// import './js/try.js';
// import checkLocation from './js/try.js';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");
    let promise = WeatherService.getWeather(city);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`Temperature: ${Math.round(body.main.temp)}F`);
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

    let promise2 = WeatherService.getForecast(city);
    promise2.then(function(response) {
      const body = JSON.parse(response);
      for (let i = 3; i < 40; i = i + 8) {
        $('.5DayForecast').append(`Forecast for ${city} <br> ${body.list[i].dt_txt}- Humidity:  ${body.list[i].main.humidity}%;  Temperature: ${Math.round(body.list[i].main.temp)}F;  Conditions: ${body.list[i].weather[0].description} <br>`);
      }
      $(`.showErrors`).text("");
    }, function(error) {
      $('.5DayShowErrors').text(`There was an error processing your request: ${error}`);
      $('.5DayShowHumidity').text("");
      $('.5DayShowTemp').text("");
      $('.5DayShowWeather').text("");
    });
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