import $ from 'jquery';
import './css/styles.css';

$(document).ready(function () {
  $("#weatherLocation").click(function () {
    const city = $('#location').val();
    const zipcode = $('#zipcode').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    const url2 = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(this.status)
        getElements(response);
      }
    }

    console.log(request.status)
    if (city !== "" && request.status !== 400) {
      request.open("GET", url, true);
      console.log(request.status)
      request.send();
    }
    else if (zipcode !== "" && request.status !== 400) { 
        request.open("GET", url2, true);
        request.send();
    }

    // else if (city === "" && zipcode === ""){
    //     console.log("Please fill out your City OR your Zip code");
    // }
    // else {
    //     console.log("Throw some error");
    // }

    function getElements(response) {
      console.log(response);
      $('.showHumidity').text(`The humidity in the ${city} is ${response.main.humidity}%`);
      // Vanilla JS: document.querySelector('#showHumidity').innerHTML = `The humidity in the ${city} is ${response.main.humidty}%`;
      $('.showTemp').text(`The temp in Kelvins is ${response.main.temp} degrees. Converted to fahrenheit this temp is ${((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)} degrees.`);

    }
  });

});