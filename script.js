const API_KEY = '917bbbd21bdc999626e138d91e8600fa'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherResult = document.getElementById('weather-result');
const weatherContainer = document.querySelector('.weather-container'); 

function consumirMiAPI() {
    fetch('https://ut3-actividad-pr-ctica.onrender.com/api/questions')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
}

consumirMiAPI();

function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    weatherResult.innerHTML = '<p>Cargando datos...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Ciudad no encontrada');
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            setBackgroundByTemperature(Math.round(data.main.temp));
        })
        .catch(error => {
            weatherResult.innerHTML = `<p class="error-message">${error.message}</p>`;
            weatherContainer.style.backgroundColor = '#fff';
        });
}

function displayWeather(data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-details">
            <img src="${iconUrl}" class="weather-icon">
            <p class="temperature">${Math.round(data.main.temp)}°C</p>
        </div>
        <p class="description">Condición: ${data.weather[0].description}</p>
    `;
}

function setBackgroundByTemperature(temp) {
    let color = temp >= 30 ? '#ff6b6b' : temp >= 20 ? '#ffb347' : temp >= 10 ? '#4fb6b9' : '#6a89cc';
    weatherContainer.style.backgroundColor = color;
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});
