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
 windSpeedElement.innerHTML =`${Math.round(response.data.wind.speed)}km/h`;
 temperatureElement.innerHTML = Math.round(temperature);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event) {
  event.prevenDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function submitButton(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

searchCity("Miami");