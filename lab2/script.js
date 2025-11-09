const input = document.querySelector('#city-input');
const button = document.querySelector('#API-Button');
const cityName = document.querySelector('#city-name');
const weatherIcon = document.querySelector('#weather-icon');
const temp = document.querySelector('#temp');
const weatherDesc = document.querySelector('#weather-desc');
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const pressure = document.querySelector('#pressure');
const visibility = document.querySelector('#visibility');
const clouds = document.querySelector('#clouds');
const weatherInfo = document.querySelector('#weather-info');
const pollutioValue = document.querySelector('#pollutioValue');
const errorMsg = document.querySelector('#error-msg');

const APIinfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=820238eda33a706611be07b7e31e79cc',
    units: '&units=metric',
    lang: '&lang=pl',
}

function getWeatherInfo() {
    const APIcity = input.value;
    const URL = `${APIinfo.link}${APIcity.trim()}${APIinfo.key}${APIinfo.units}${APIinfo.lang}`;
    console.log(URL);

    axios.get(URL).then((response) => {
        // console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(response.data.main.temp)}°C`;
        weatherDesc.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)}°C`;
        humidity.textContent = `${response.data.main.humidity}%`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)}km/h`;
        pressure.textContent = `${response.data.main.pressure}hPa`;
        visibility.textContent = `${response.data.visibility / 1000}km`;
        clouds.textContent = `${response.data.clouds.all}%`;

        weatherInfo.style.display = 'block';
        errorMsg.style.display = 'none';

        // air pollution API
        const URLpollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${APIinfo.key}`;
        // console.log(URLpollution);

        axios.get(URLpollution).then((res) => {
            console.log(res.data.list[0].components.pm2_5);
            pollutioValue.textContent = res.data.list[0].components.pm2_5;
            // napisz kod ktory bedzie zmienial kolor tla ikony w zaleznoscu od tego z jakiego przedzialu jest wartosc
        });

    }).catch((error) => {
        console.log(error);

        errorMsg.textContent = `${error.response.data.message}`;

        [cityName, temp, weatherDesc, feelsLike, humidity, pressure, windSpeed, visibility, clouds].forEach(element => element.textContent = "");
        weatherIcon.src = "";

        // // usuwanie danych pogodowych
        // cityName.textContent = '';
        // weatherIcon.src = '';
        // temp.textContent = '';
        // weatherDesc.textContent = '';
        // feelsLike.textContent = '';
        // humidity.textContent = '';
        // windSpeed.textContent = '';
        // pressure.textContent = '';
        // visibility.textContent = '';
        // clouds.textContent = '';

        // weatherInfo.style.display = 'none';
        // errorMsg.style.display = 'block';
    }).finally(() => {
        
    })
}

function getWeatherInfoByEnter(e) {
    if (e.key === 'Enter') {
        getWeatherInfo();
    }
}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keydown', getWeatherInfoByEnter);