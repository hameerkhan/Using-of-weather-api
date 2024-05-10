const weatherIcons = {
    '01d': 'https://openweathermap.org/img/wn/01d.png',
    '02d': 'https://openweathermap.org/img/wn/02d.png',
    '03d': 'https://openweathermap.org/img/wn/03d.png',
    '04d': 'https://openweathermap.org/img/wn/04d.png',
    '09d': 'https://openweathermap.org/img/wn/09d.png',
    '10d': 'https://openweathermap.org/img/wn/10d.png',
    '11d': 'https://openweathermap.org/img/wn/11d.png',
    '13d': 'https://openweathermap.org/img/wn/13d.png',
    '50d': 'https://openweathermap.org/img/wn/50d.png',
    '01n': 'https://openweathermap.org/img/wn/01n.png',
    '02n': 'https://openweathermap.org/img/wn/02n.png',
    '03n': 'https://openweathermap.org/img/wn/03n.png',
    '04n': 'https://openweathermap.org/img/wn/04n.png',
    '09n': 'https://openweathermap.org/img/wn/09n.png',
    '10n': 'https://openweathermap.org/img/wn/10n.png',
    '11n': 'https://openweathermap.org/img/wn/11n.png',
    '13n': 'https://openweathermap.org/img/wn/13n.png',
    '50n': 'https://openweathermap.org/img/wn/50n.png'
};

const backgrounds = {
    'Clear': 'https://cdn.pixabay.com/photo/2016/11/21/17/05/blue-1845908_960_720.jpg',
    'Clouds': 'https://cdn.pixabay.com/photo/2015/06/19/20/13/clouds-815280_960_720.jpg',
    'Rain': 'https://cdn.pixabay.com/photo/2015/11/03/12/51/raining-1011559_960_720.jpg',
    'Snow': 'https://cdn.pixabay.com/photo/2017/01/20/20/05/mountains-1995055_960_720.jpg',
    'Mist': 'https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-932075_960_720.jpg'
};

document.addEventListener('DOMContentLoaded', () => {
    const time = new Date().getHours();
    const greeting = document.getElementById('greeting');
    if (time >= 5 && time < 12) {
        greeting.textContent = 'Good morning!';
    } else if (time >= 12 && time < 18) {
        greeting.textContent = 'Good afternoon!';
    } else {
        greeting.textContent = 'Good evening!';
    }
});

document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    const apiKey = 'a61f847f35msheb84fb312d1437ep11ecacjsn84a97c56abbf'; // Replace with your RapidAPI key
    const currentWeatherUrl = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const currentResponse = await fetch(currentWeatherUrl, options);
        const currentData = await currentResponse.json();
        displayWeather(currentData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});

function displayWeather(currentData) {
    const weatherInfo = document.getElementById('weather-info');
    if (currentData.message) {
        weatherInfo.innerHTML = `<p>${currentData.message}</p>`;
    } else {
        const weatherIcon = weatherIcons[currentData.weather[0].icon];
        const background = backgrounds[currentData.weather[0].main];
        document.body.style.backgroundImage = `url(${background})`;

        // Display current weather
        const tempInFahrenheit = (currentData.main.temp * 9 / 5) + 32;
        const windSpeedInKph = currentData.wind.speed * 3.6; // Convert from m/s to km/h
        weatherInfo.innerHTML = `
            <h2 class="text-2xl font-semibold mb-2">${currentData.name}, ${currentData.sys.country}</h2>
            <img src="${weatherIcon}" alt="${currentData.weather[0].description}" class="weather-icon mb-2">
            <p class="mb-2">Temperature: ${tempInFahrenheit.toFixed(1)}°F</p>
            <p class="mb-2">Description: ${currentData.weather[0].description}</p>
            <p class="mb-2">Humidity: ${currentData.main.humidity}%</p>
            <p class="mb-2">Wind Speed: ${windSpeedInKph.toFixed(1)} km/h</p>
            <p class="mb-2">Sunrise:  ${new Date(currentData.sys.sunrise * 1000).toLocaleTimeString()} </p>                 
            <img src="./sunrise.png" alt="sunrise" class="w-20">

            <p class="mb-2">Sunset: ${new Date(currentData.sys.sunset * 1000).toLocaleTimeString()}<img src="./sunrise.png" alt="sunset" class="w-20"></p>
        `;
    }
}