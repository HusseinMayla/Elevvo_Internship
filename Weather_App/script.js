const API_KEY = "c8ca1396274a445a8f7144817251908"; // WeatherAPI key

    // Auto-fetch based on location
    window.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        }, () => {
          getWeather("London"); // fallback
        });
      }
    };

    // Fetch by city
    async function getWeather(city) {
      const cityName = city || document.getElementById("cityInput").value;
      if (!cityName) return;

      showLoading(true);
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=no&alerts=no`
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);

        displayWeather(data);
        displayForecast(data.forecast.forecastday);
      } catch (err) {
        document.getElementById("weather").innerHTML =
          `<p style="color:red; text-align:center;">${err.message}</p>`;
        document.getElementById("forecast").innerHTML = "";
      } finally {
        showLoading(false);
      }
    }

    // Fetch by coordinates
    async function fetchWeatherByCoords(lat, lon) {
      showLoading(true);
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`
        );
        const data = await res.json();
        displayWeather(data);
        displayForecast(data.forecast.forecastday);
      } catch (err) {
        console.error(err);
      } finally {
        showLoading(false);
      }
    }

    // Display current weather
    function displayWeather(data) {
      document.getElementById("weather").innerHTML = `
        <div class="weather-card">
          <h2>${data.location.name}, ${data.location.country}</h2>
          <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
          <h3>${Math.round(data.current.temp_c)}°C</h3>
          <p>${data.current.condition.text}</p>
        </div>
      `;
    }

    // Display forecast
    function displayForecast(days) {
      document.getElementById("forecast").innerHTML = days.map(day => `
        <div class="forecast-day">
          <h4>${new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}</h4>
          <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
          <p>${day.day.condition.text}</p>
          <p><strong>${Math.round(day.day.avgtemp_c)}°C</strong></p>
        </div>
      `).join("");
    }

    function showLoading(show) {
      document.getElementById("loading").style.display = show ? "block" : "none";
    }