const ApiButton = document.getElementById("API-Button")

// const ApiKey = "486d6033a417177a1376bc915f209e8e";
// const projektWSBApiKey = "820238eda33a706611be07b7e31e79cc"
// const sampleAPI_Call = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";



 APIinfo = {
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    link: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "&appid=820238eda33a706611be07b7e31e79cc",
    units: "&units=metric",
    lang: "&lang=pl",
 }

//  console.log(`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`)


//  https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={486d6033a417177a1376bc915f209e8e}

function getWeatherInfo () {
    const APIcity = "Barcelona"; // input.value;
    const URL = `${APIinfo.link}${APIcity.trim()}${APIinfo.key}${APIinfo.units}${APIinfo.lang}`;
    // console.log(URL);

    axios.get(URL).then((response) => {
        // sconsole.log(response.data);
        // console.log(response.data.name);
        // console.log(response.data.weather);
        console.log(response.data.weather.description);
        console.log(response.data.weather.icon);
        console.log(response.data.weather.id);
        console.log(response.data.weather.Clear);

// Object { id: 800, main: "Clear", description: "bezchmurnie", … }
// description: "bezchmurnie"​​
// icon: "01d"​
// id: 800​​
//main: "Clear"
})
}

function getWeatherInfoByEnter (e) {
    
}

ApiButton.addEventListener("click", getWeatherInfo);
InputDeviceInfo.addEventListener("keydown", getWeatherInfoByEnter);
