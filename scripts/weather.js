// Abu Dhabi lat & long 24.462412315968034, 54.37182664100134

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const figCaption = document.querySelector('figcaption');
const apiKey = "1da63a895013ffacc190e8fd2edd5ed9";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=24.46&lon=54.37&appid=${apiKey}&units=metric`;
const currentHumid = document.querySelector('#current-humid');
const wind = document.querySelector('#wind-speed');
const pressure = document.querySelector('#pressure');
const visibility = document.querySelector('#visibility');

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(await response.text());
        }
        data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.log("Encountered error during fetch:", error);
    }
}

apiFetch();

function displayResults() {
    let temperature = Math.round(parseFloat(data.main.temp));
    currentTemp.innerHTML = `${temperature}°C`;
    const imgUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const descr = data.weather[0].description;
    const capDescr = capitalize(descr);
    let feelsLike = Math.round(parseFloat(data.main.feels_like));
    const feelsTemp = `${feelsLike}°C`;
    let windSpeed = parseFloat(data.wind.speed);
    let windDesc = getWinddesc(windSpeed);
    let windDeg = parseFloat(data.wind.deg);
    let windDirection = getWindDirection(windDeg);
    weatherIcon.setAttribute('src', imgUrl);
    weatherIcon.setAttribute('alt', capDescr)
    figCaption.innerHTML = `Feels like ${feelsTemp}. ${capDescr}. ${windDesc}`;

    currentHumid.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${windSpeed}m/s, ${windDirection}`;
    pressure.innerHTML = `${data.main.pressure}hPa`;
    visibility.innerHTML = `${data.visibility}m`
}

/*
<p>Humidity: <span id="current-humid"></span></p>
<p>Wind Speed: <span id="wind-speed"></span></p>
<p>Pressure: <span id="pressure"></span></p>
<p>Visibility: <span id="visibility"></span></p>
4.1
m / s
NW
1013
hPa
Humidity:
    62 %
    Dew
point:
    22°C
Visibility:
    10.0
km */

function capitalize(words) {
    return words.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

function getWinddesc(windSpeed) {
    if (windSpeed <= 1.3) {
        return 'Calm';
    } else if (windSpeed > 1.3 && windSpeed <= 8.4) {
        return 'Gentle breeze';
    } else if (windSpeed > 8.4 && windSpeed <= 10) {
        return 'Strong breeze';
    } else if (windSpeed > 10 && windSpeed <= 15) {
        return 'Strong wind';
    } else if (windSpeed > 15 && windSpeed <= 32) {
        return 'Gale force wind';
    } else if (windSpeed > 32) {
        return 'Hurricane force wind';
    }
}

function getWindDirection(windDeg) {
    if (windDeg === 350 || windDeg === 360 || windDeg === 10) {
        return 'N';
    } else if (windDeg === 20 || windDeg === 30) {
        return 'N/NE';
    } else if (windDeg === 40 || windDeg === 50) {
        return 'NE';
    } else if (windDeg === 60 || windDeg === 70) {
        return 'E/NE';
    } else if (windDeg === 80 || windDeg === 90 || windDeg === 100) {
        return 'E';
    } else if (windDeg === 110 || windDeg === 120) {
        return 'E/SE';
    } else if (windDeg === 130 || windDeg === 140) {
        return 'SE';
    } else if (windDeg === 150 || windDeg === 160) {
        return 'S/SE';
    } else if (windDeg === 170 || windDeg === 180 || windDeg === 190) {
        return 'S';
    } else if (windDeg === 200 || windDeg === 210) {
        return 'S/SW';
    } else if (windDeg === 220 || windDeg === 230) {
        return 'SW';
    } else if (windDeg === 240 || windDeg === 250) {
        return 'W/SW';
    } else if (windDeg === 260 || windDeg === 270 || windDeg === 280) {
        return 'W';
    } else if (windDeg === 290 || windDeg === 300) {
        return 'W/NW';
    } else if (windDeg === 310 || windDeg === 320) {
        return 'NW';
    } else if (windDeg === 330 || windDeg === 340) {
        return 'N/NW';
    }
}












