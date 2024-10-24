function weatherFunction() {
    let city = document.querySelector('.input_city').value;
    let apiKey = '48295b5a2af7096ede70e7dcc978d1f6';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Запрос к API
    let display = document.querySelector('.card');

    if (window.innerWidth <= 425) {
        display.style.width = '300px'
    } else {
        display.style.width = '400px';
    }

    display.style.height = '420px';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            setTimeout(() => {
                weatherInfo.innerHTML = `
                    <h2 class="name_city">${city}</h2>
                    <p class="temperature">Temperature: ${temp} °C</p>
                    <p class="description">Description: ${description}</p>
                    <img class="weather_img" src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                `;
            }, 250);
        })
        .catch(error => {
            console.error(error);
            const weatherInfo = document.getElementById('weather-info');
            setTimeout(() => {
                weatherInfo.innerHTML = `<p>${error.message}</p>`;
            }, 250);
        });
}
