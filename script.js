const apiKey = 'd88beea5d15658420b9d32c4dbfcc25b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('submitBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous data
    weatherInfo.style.display = 'none';
    errorMessage.textContent = '';

    if (city.trim() === '') {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Display weather data
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weatherInfo.style.display = 'block';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
