// Access DOM elements
const reportSection = document.getElementById('weather-report');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');
const weatherOpinion = document.querySelector('.opinion')


// create XMLHTTPRequest
let myAPI = new XMLHttpRequest();

// you must grab the form ID from <form> NOT the submit button itself
cityForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const chosenCity = cityInput.value;
  myAPI.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&units=metric' + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');myAPI.send();
})

// add ready state change function
myAPI: myAPI.onreadystatechange = function() {
  
  // === 4 makes sure it's cmplete
  if(myAPI.readyState === 4) {
    // have to parse the JSON object
     const response = JSON.parse(myAPI.response);
    // print result; the .weather and .name are from openweather api doc
        reportSection.textContent = `The weather is ${response.main.temp} Celsius with ${response.weather[0].description} in ${response.name}`;

    if(response.weather[0].description.includes('rain')) {
      weatherOpinion.innerHTML = `<img class="cats-img" src="https://i.chzbgr.com/full/7647381504/h77557117/she-said-i-wouldnt-need-my-rain-booties-today">`
    } else {
              // use if statements for cats at different temps
              if (response.main.temp <= 0) {
                // for cold weather
                weatherOpinion.innerHTML = `<img class="cats-img" src="https://i.pinimg.com/originals/8f/65/e2/8f65e2795a0c930bb2c6038d688148cf.jpg">`;
              } else if (response.main.temp > 0 && response.main.temp < 18) {
                // for chilly weather: sweater cat
                  weatherOpinion.innerHTML = `<img class="cats-img" src="https://i.chzbgr.com/full/8585456128/hDA5E7346/sweater-weather">`
              } else if (response.main.temp > 33) {
                // for hot weather: melting cat
                  weatherOpinion.innerHTML = `<img class="cats-img" src="https://i.pinimg.com/originals/72/22/cd/7222cda52ed9939b333ece3eeadb4937.jpg">`
              } else {
                // for perfect weather
                      weatherOpinion.innerHTML = `<img class="cats-img" src="https://i.chzbgr.com/full/9463549952/hD32AC781/ahhhh-just-right">`
              }
          }
     }
};