// DOM Elements
const ApiButton = document.getElementById("API-Button");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");
const errorDisplay = document.getElementById("error-display");

// API Configuration
const APIinfo = {
  link: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "&appid=820238eda33a706611be07b7e31e79cc",
  units: "&units=metric",
  lang: "&lang=pl",
};

/**
 * Display weather data in the UI
 * @param {Object} data - Weather data from API
 */
function displayWeather(data) {
  // Hide error, show weather
  errorDisplay.classList.remove("show");
  weatherDisplay.classList.add("show");

  // City name and country
  document.getElementById("city-name").textContent = 
    `${data.name}, ${data.sys.country}`;

  // Weather icon
  const iconCode = data.weather[0].icon;
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  // Temperature
  document.getElementById("temperature").textContent = 
    `${Math.round(data.main.temp)}°C`;

  // Description
  document.getElementById("description").textContent = 
    data.weather[0].description;

  // Additional details
  document.getElementById("feels-like").textContent = 
    `${Math.round(data.main.feels_like)}°C`;
  document.getElementById("humidity").textContent = 
    `${data.main.humidity}%`;
  document.getElementById("wind").textContent = 
    `${data.wind.speed} m/s`;
  document.getElementById("pressure").textContent = 
    `${data.main.pressure} hPa`;
}

/**
 * Display error message in the UI
 * @param {string} message - Error message to display
 */
function displayError(message) {
  weatherDisplay.classList.remove("show");
  errorDisplay.classList.add("show");
  errorDisplay.textContent = message;
}

/**
 * Fetch weather data from API and display it
 */
function getWeatherInfo() {
  const APIcity = cityInput.value.trim();

  // Validate input
  if (!APIcity) {
    displayError("Proszę wpisać nazwę miasta!");
    return;
  }

  // Build API URL
  const URL = `${APIinfo.link}${APIcity}${APIinfo.key}${APIinfo.units}${APIinfo.lang}`;

  // Make API request
  axios
    .get(URL)
    .then((response) => {
      console.log("Weather data:", response.data);
      displayWeather(response.data);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      
      if (error.response && error.response.status === 404) {
        displayError("Nie znaleziono miasta. Spróbuj ponownie!");
      } else {
        displayError("Wystąpił błąd podczas pobierania danych pogodowych.");
      }
    });
}

/**
 * Handle Enter key press in city input
 * @param {KeyboardEvent} e - Keyboard event
 */
function getWeatherInfoByEnter(e) {
  if (e.key === "Enter") {
    getWeatherInfo();
  }
}

// Event Listeners
ApiButton.addEventListener("click", getWeatherInfo);
cityInput.addEventListener("keydown", getWeatherInfoByEnter);

// Load weather for default city on page load
window.addEventListener("DOMContentLoaded", getWeatherInfo);