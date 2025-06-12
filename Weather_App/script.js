const apiKey = '9a15504fef0640b59d4e473af4c6a64c'; // Replace with a working API key

async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherBox = document.getElementById('weather');

  if (!city) {
    weatherBox.innerHTML = '<p>Please enter a city.</p>';
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  if (!response.ok) {
    weatherBox.innerHTML = `<p>Error: ${data.message}</p>`;
    return;
  }

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherBox.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${icon}" alt="${data.weather[0].description}">
    <p><strong>${data.weather[0].main}:</strong> ${data.weather[0].description}</p>
    <p><strong>Temp:</strong> ${data.main.temp} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
  `;
}
