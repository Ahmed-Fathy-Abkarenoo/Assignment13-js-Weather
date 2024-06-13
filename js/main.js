let searchInput = document.querySelector("#locationSearch");
let findBtn = document.querySelector("#findBtn");
cardsContainer = document.querySelector("#cardsContainer");

let cityName = "";
let userCity;
let weatherData;
let dateArr;
let dateInString;
let cityCurrentDay;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

if (cityName == "") {
  userLocationWeather();
}

searchInput.addEventListener("keyup", search);
findBtn.addEventListener("click", search);

async function userLocationWeather() {
  await userLocation();
  await getWeatherData(userCity);
  displayWeatherData(weatherData);
}

async function search() {
  cityName = searchInput.value;

  if (cityName.length >= 3) {
    await getWeatherData(cityName);
    displayWeatherData(weatherData);
  }
}

async function userLocation() {
  var res = await fetch(
    "https://api.ipgeolocation.io/ipgeo?apiKey=5412dced7fb6487a8b6c1e6497f1e34d&fields=geo"
  );
  res = await res.json();
  userCity = res.city;
}

async function getWeatherData(name) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f610972d13c34ebea50163404241006&q=${name}&days=3&aqi=no&alerts=no`
  );
  res = await res.json();
  weatherData = res;
  getZoneDate(weatherData);
}

function getZoneDate(zone) {
  let mesc;
  let d;
  dateArr = zone.forecast.forecastday[0].date.split("-");

  dateInString = zone.forecast.forecastday[0].date;
  // console.log(dateInString);

  mesc = Date.parse(dateInString);
  // console.log(mesc);

  d = new Date(mesc);
  // console.log(d.getDay());
  cityCurrentDay = d.getDay();
  // console.log(days[cityCurrentDay]);
}

function displayWeatherData(data) {
  let mainCard = "";
  let secondCard = "";
  let thirdCard = "";
  let cardsBox;

  mainCard = `
   <div class="col-lg-4">
     <div class="card rounded-0 text-white pt-0" id="mainCard">
       <div
         class="card-title d-flex justify-content-between align-items-center pt-4 px-2"
       >
         <p class="day text-info">${days[cityCurrentDay]}</p>
         <p class="date text-info">${
           dateArr[2] + " " + months[dateArr[1] - 1]
         }</p>
       </div>
       <div class="card-body">
         <p class="fs-5 fw-medium" id="city">${data.location.name}</p>
         <p class="fs-1 fw-bold limegreen-color" id="temp">${
           data.current.temp_c
         }<sup>o</sup> c</p>
         <img src="https:${data.current.condition.icon}" alt="status" />
          <p class="mt-2 text-info">${data.current.condition.text}</p>
         <div class="d-flex mt-5">
           <div>
             <img src="imgs/icon-compass@2x.png" alt="" class="min-w-25 h-50" />
             <p class="d-inline-block"> ${data.current.wind_dir}</p>
           </div>
           <div>
             <img src="imgs/icon-umberella@2x.png" alt="" class="min-w-25 h-50" />
             <p class="d-inline-block">${data.current.humidity}%</p>
           </div>
           <div>
             <img src="imgs/icon-wind@2x.png" alt="" class="min-w-25 h-50" />
             <p class="d-inline-block"> ${data.current.wind_kph}km/h</p>
           </div>
         </div>
       </div>
     </div>
   </div>`;

  secondCard = `
         <div class="col-lg-4">
            <div class="card first-card rounded-0 text-white text-center" id="secondryCard">
              <div class="card-title pt-3 text-center">
                <p class="day">${days[cityCurrentDay + 1]}</p>
              </div>
              <div class="card-body py-5" id="userPosition">
                <img src="https:${
                  data.forecast.forecastday[2].day.condition.icon
                }" alt="status" />
              <p class="fs-1 fw-bold limegreen-color mt-4" id="temp">${
                data.forecast.forecastday[1].day.maxtemp_c
              }<sup>o</sup> c</p>
              <p class="fs-4 fw-bold limegreen-color" id="temp">${
                data.forecast.forecastday[1].day.mintemp_c
              }<sup>o</sup> c</p>
              <p class="mt-2 text-info">${
                data.forecast.forecastday[1].day.condition.text
              }</p>
              </div>
            </div>
          </div> `;

  thirdCard = `
          <div class="col-lg-4">
             <div class="card second-card rounded-0 text-white text-center">
               <div class="card-title pt-3 text-center">
                 <p class="day text-info">${days[cityCurrentDay + 2]}</p>
               </div>
               <div class="card-body py-5">
                 <img src="https:${
                   data.forecast.forecastday[2].day.condition.icon
                 }" alt="status" />
              <p class="fs-1 fw-bold limegreen-color mt-4" id="temp">${
                data.forecast.forecastday[2].day.maxtemp_c
              }<sup>o</sup> c</p>
              <p class="fs-4 fw-bold limegreen-color" id="temp">${
                data.forecast.forecastday[2].day.mintemp_c
              }<sup>o</sup> c</p>
              <p class="mt-2 text-info">${
                data.forecast.forecastday[2].day.condition.text
              }</p>
               </div>
             </div>
           </div> `;

  cardsBox = mainCard + secondCard + thirdCard;
  cardsContainer.innerHTML = cardsBox;
}
