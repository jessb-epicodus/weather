import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './js/try.js'
import checkLocation from './js/try.js';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    let request2 = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
    const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    request2.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response2 = JSON.parse(this.responseText);
        forecast(response2);
      }
    };

    request2.open("GET", url2, true);
    request2.send();

    try {
      const isLocationValid = checkLocation(city);
      if (isLocationValid instanceof Error) {
        console.error(isLocationValid.message);
        throw RangeError("Not a valid location!");
      } else {
        console.log("Try was successful, so no need to catch!")
      }
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`Temperature: ${Math.round(response.main.temp)} F`);
      $('.showWeather').text(`Conditions: ${response.weather[0].description}`);
    }

    function forecast(response2) {
      for (let i = 3; i < 40; i = i + 8) {
        $('.5DayForecast').append(`Forecast for ${city} <br> ${response2.list[i].dt_txt}- Humidity:  ${response2.list[i].main.humidity}%;  Temperature: ${Math.round(response2.list[i].main.temp)}F;  Conditions: ${response2.list[i].weather[0].description} <br>`);
      }
    }
        
    // function getElements2(response2) {
    //   $('.5DayShowHumidity').text(`The forecasted humidity in ${city} is ${response2.list[0].main.humidity}%`);
    //   $('.5DayShowTemp').text(`The forecasted temperature in F is ${response2.list[0].main.temp} degrees.`);
    //   $('.5DayShowWeather').text(`The forecasated weather is ${response2.list[0].weather[0].description}.`);
    // }
  });
});