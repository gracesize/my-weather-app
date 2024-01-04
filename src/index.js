function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement =document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");


console.log(response.data.condition.description);

  descriptionElement.innerHTML = response.data.condition.description;
   timeElement.innerHTML = `${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
 descriptionElement.innerHTML = response.data.condition.description;
 humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
 windSpeedElement.innerHTML =`${Math.round(response.data.wind.speed)} mph`;
 temperatureElement.innerHTML = Math.round(temperature);
 cityElement.innerHTML = response.data.city;

 getForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sunday",
"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
]
let day = days[date.getDay()];
if (minutes<10) {
  minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes}`
}

function searchCity(city) {
  let apiKey = "9a708b23a8ct6o0b4d94fd3134a86038";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
  return days [date.getDay()];
}

function getForecast(city){
  let apiKey = "1b354039oc424231a4fc9b180d795c2t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data)

  let forecastHTML = `<div class="row">`;

  response.data.daily.forEach(function (day, index) {
    if (index<5) {
    forecastHTML =
      forecastHTML +
      `
 <div class=" col weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div class="weather-forecast-icon">
  <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
  </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        day.temperature.maximum
      )}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>
</div>
`;
      }
  });

  forecastHTML = forecastHTML + `</div>`;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function submitButton(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

searchCity("Miami");