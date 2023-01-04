const ApiKey = "&appid=9155c8b6f528a136028548c9d9a13c13";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const unsplashBaseUrl = "https://api.unsplash.com//photos/random?client_id=";
const unsplashApiKey = "1VOp16-kL3hosEn50amCcsMgB515ZZsOMrFAmhe7iZA";
let btn = document.querySelector(".btn");
let input = document.querySelector(".search");

function getWeatherData(cityName) {
  // Data from weather API
  if (cityName === undefined) {
    cityName = "Plovdiv";
  }
  fetch(baseUrl + cityName + ApiKey)
    .then((response) => response.json())
    .then((data) => weatherValues(data));
}

function fetchPhotos() {
  // data from backgr Photos API
  fetch(unsplashBaseUrl + unsplashApiKey)
    .then((response) => response.json())
    .then((data) => backgroundPic(data));
}

function weatherValues(response) {
  // adding weather API values
  document.querySelector(
    ".weatherIn"
  ).innerHTML = `Weather in ${response.name}`;
  document.querySelector(".temp").innerHTML = `${Math.floor(
    response.main.temp - 272.15
  )}°C`;
  document.querySelector(
    ".condition"
  ).innerHTML = `Humidity:${response.main.humidity}%`;
  document.querySelector(
    ".wind"
  ).innerHTML = `Wind speed: ${response.wind.speed} km/h`;
  document.querySelector(
    `.icon`
  ).src = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
}

function getCityName(city) {
  getWeatherData(city);
}

btn.addEventListener("click", function () {
  let city = document.querySelector("input").value;
  getCityName(city);
  randomTemperatureAndPic();
  document.querySelector("input").value = "";
});

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btn.click();
    randomTemperatureAndPic();
    document.querySelector("input").value = "";
  }
});

function backgroundPic(picture) {
  document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1671629075554-c6074e48cdca?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzOTM3MTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzIzMjk4ODE&ixlib=rb-4.0.3&q=80")`;
}

function getRandomNumbers() {
  // random temps for 5 day forecast
  let randomTempMin;
  let randomTempMax;
  do {
    randomTempMin = Math.floor(Math.random() * 4);
    randomTempMax = Math.floor(Math.random() * 10);
  } while (randomTempMax < randomTempMin);
  return [randomTempMin, randomTempMax];
}

function randomPics() {
  // random pictures for 5 day forecast
  let randomPic = Math.floor(Math.random() * 4);
  let pic;
  if (randomPic === 1) {
    pic = "/fog.png";
  } else if (randomPic === 2) {
    pic = "/rainy.png";
  } else if (randomPic === 3) {
    pic = "/sun.png";
  } else {
    pic = "/weather.png";
  }
  return pic;
}

function randomTemperatureAndPic() {
  // adding them to the page
  for (let i = 1; i < 6; i++) {
    let randomNums = getRandomNumbers();
    let randomPic = randomPics();
    document.querySelector(
      `.day` + i.toString()
    ).innerHTML = `${randomNums[0]}/${randomNums[1]}°C`;
    document.querySelector(`.pic` + i.toString()).src = randomPic;
  }
}
function fiveDaysFromNow() {
  // changing days depending on what day is today
  let count = 0;
  let days = [];
  const d = new Date();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = d.getDay(); i < 7; i++) {
    if (i < 7) {
      days.push(weekday[i]);
      count++;
    }
    if (i === 6) {
      i = -1;
    }
    if (count === 5) {
      break;
    }
  }
  for (let i = 0; i < 5; i++) {
    document.getElementById(`day${i}`).innerHTML = days[i];
  }
}

fiveDaysFromNow();
fetchPhotos();
getWeatherData();
randomTemperatureAndPic();
