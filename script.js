function getLocationWeather() {
    var city = document.getElementById('cityInput').value || 'delhi';
    var link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e397ebbd313a6dd9b006f29a6028878c`;
    fetchWeatherData(link);
}

function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e397ebbd313a6dd9b006f29a6028878c`;
            fetchWeatherData(link);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchWeatherData(link) {
    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let obj = JSON.parse(request.responseText);
            console.log(obj);
            document.getElementById('weather').innerHTML = obj.weather[0].description;
            document.getElementById('location').innerHTML = obj.name;
            document.getElementById('temp').innerHTML = Math.round(obj.main.temp - 273.15);
            document.getElementById('icon').src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
        } else {
            console.log("The city data not available");
        }
    };
    request.send();
}

// Initial call to get weather on page load
getLocationWeather();