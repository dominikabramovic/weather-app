import "./style.css";

function createWeatherWidget(weatherInfo) {
  removeElements();
  const weatherWidget = document.createElement("div");
  weatherWidget.classList.add("weather-widget");
  const localTime = new Date(weatherInfo.location.localtime)
  weatherWidget.innerHTML = `    
  <div class="location-info">
      <div class="city">${weatherInfo.location.name}, <span class="country">${
    weatherInfo.location.country
  }</span></div>
      <div class="current-time">${localTime.toLocaleDateString("en-gb", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}</div>
  </div>
  <div class="info">
      <div class="icon-temp-info">
          <img class="icon" src="${weatherInfo.current.condition.icon}">
          <div class="temp">${weatherInfo.current.temp_c} °C</div>
      </div>
      <div>
          <div class="weather-description">${
            weatherInfo.current.condition.text
          }</div>
          <div class="feels-like">
              Feels like ${weatherInfo.current.feelslike_c} °C
          </div>
      </div>
  </div>`;
  const body = document.querySelector("body");
  body.appendChild(weatherWidget);
}

function removeElements() {
  const previousWidget = document.querySelector(".weather-widget");
  const error = document.querySelector(".error");
  
  if (previousWidget) previousWidget.remove();
  if (error) error.remove();
}
function showError() {
  const error = document.createElement("div");
  error.classList.add("error");
  error.textContent = "Location not found. Please try again.";
  const body = document.querySelector("body");
  body.appendChild(error);
}

async function getWeather(city) {
  const currentWeatherRequest = `https://api.weatherapi.com/v1/current.json?q=${city}&key=295a9156b5ff4bc5ba8112804231910`;

  async function getWeatherData(request) {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }

  try {
  const currentWeather = await getWeatherData(currentWeatherRequest);
  console.log(currentWeather)
  createWeatherWidget(currentWeather);
  } catch {
    showError()
  }
}

const form = document.querySelector("form");
const searchInput = document.querySelector("#location-search");
form.addEventListener("submit", () => {
  event.preventDefault();
  getWeather(searchInput.value);
});
