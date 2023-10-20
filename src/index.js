import "./style.css";

async function getWeather() {
  const currentWeatherRequest =
    "https://api.weatherapi.com/v1/current.json?q=Zagreb&key=295a9156b5ff4bc5ba8112804231910";

  async function getWeatherData(request) {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }

  const currentWeather = await getWeatherData(currentWeatherRequest);
  console.log(currentWeather);

  function createWeatherWidget(weatherInfo) {
    const weatherWidget = document.createElement("div");
    weatherWidget.classList.add("weather-widget");
    weatherWidget.innerHTML = `    
    <div class="location-info">
        <div class="city">${weatherInfo.location.name} <span class="country">${weatherInfo.location.country}</span></div>
        <div class="current-time">${weatherInfo.location.localtime}</div>
    </div>
    <div class="info">
        <div >
            <img class="icon" href="${weatherInfo.current.condition.icon}">
            <div class="temp">${weatherInfo.current.temp_c}</div>
        </div>
        <div>
            <div class="weather-description">${weatherInfo.current.condition.text}</div>
            <div class="feels-like">
                Feels like ${weatherInfo.current.feelslike_c}
            </div>
        </div>
    </div>`;

    const body = document.querySelector("body");
    body.appendChild(weatherWidget)
  }

  createWeatherWidget(currentWeather);
}

getWeather();

