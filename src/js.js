const apiKey = 'b7f5f9dea60f49beb4e104210242805';
let currentCity ;
const plocha = document.getElementById("pocasi");
const countdownElement = document.getElementById("countdown");
const search = document.getElementById("search");
const button = document.getElementById("button");
const resetButton = document.getElementById("resetButton");
let countdownInterval;

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching weather data for ${city}: ${response.statusText}`);
    }
    return await response.json();
}

async function updateWeather() {
    plocha.innerHTML = '';
    const data = await getWeather(currentCity);
    await displayWeather(data);
}

async function displayWeather(data) {
    plocha.innerHTML = ''; // Clear previous weather info
    const border = document.createElement("div");
    border.className = "weatherBorder";

    const currentTemperature = document.createElement("div");
    currentTemperature.innerText = `Temperature: ${data.current.temp_c}°C`;

    const stateImg = document.createElement("img");
    stateImg.src = `http:${data.current.condition.icon}`;

    const state = document.createElement("p");
    state.innerText = `Condition: ${data.current.condition.text}`;

    border.appendChild(currentTemperature);
    border.appendChild(stateImg);
    border.appendChild(state);
    plocha.appendChild(border);
}

function startCountdown(duration) {
    let timer = duration;
    countdownInterval = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        countdownElement.textContent = `Next update in ${minutes}m ${seconds}s`;

        if (--timer < 0) {
            timer = duration;
            updateWeather();
        }
    }, 850);
}

function resetCountdown(duration) {
    clearInterval(countdownInterval);
    startCountdown(duration);
}

button.addEventListener("click", () => {
    currentCity = search.value;
    updateWeather();
    resetCountdown(10)
});
resetButton.addEventListener("click", () => {
    currentCity = search.value;
    updateWeather();
    resetCountdown(10)
});


updateWeather();
startCountdown(10);