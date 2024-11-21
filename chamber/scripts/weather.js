// Abu Dhabi lat & long 24.462412315968034, 54.37182664100134

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const figCaption = document.querySelector('figcaption');
const currentHumid = document.querySelector('#current-humid');
const wind = document.querySelector('#wind-speed');
const pressure = document.querySelector('#pressure');
const visibility = document.querySelector('#visibility');
const todayTempHigh = document.querySelector('#today-temp-high');
const todayTempLow = document.querySelector('#today-temp-low');
const tomorrowName = document.querySelector('#tomorrow');
const tomorrowTempHigh = document.querySelector('#tomorrow-temp-high');
const tomorrowTempLow = document.querySelector('#tomorrow-temp-low');
const afterTomorrowName = document.querySelector('#after-tomorrow');
const afterTomorrowTempHigh = document.querySelector('#after-tomorrow-temp-high');
const afterTomorrowTempLow = document.querySelector('#after-tomorrow-temp-low');

// open weather API
const apiKey = "1da63a895013ffacc190e8fd2edd5ed9";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=24.46&lon=54.37&appid=${apiKey}&units=metric`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=24.46&lon=54.37&appid=${apiKey}&units=metric`;

async function apiWeatherFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(await response.text());
        }
        data = await response.json();
        console.log(data);
        displayCurrentWeather(data);
    } catch (error) {
        console.log("Encountered error during fetch:", error);
    }
}

async function apiForecastFetch() {
    try {
        const response = await fetch(url2);
        if (!response.ok) {
            throw Error(await response.text());
        }
        data = await response.json();
        console.log(data.list);
        displayForecasts(data.list);
    } catch (error) {
        console.log("Encountered error during fetch:", error);
    }
}

apiWeatherFetch();
apiForecastFetch();

function displayCurrentWeather() {
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
    wind.innerHTML = `${windSpeed}m/s ${windDirection}`;
    pressure.innerHTML = `${data.main.pressure} hPa`;
    visibility.innerHTML = `${data.visibility} m`
}

function displayForecasts(list) {
    // find today, tomorrow and the day after tomorrow dates
    const today = new Date();
    const tomorrow = new Date(today);
    const afterTomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    afterTomorrow.setDate(today.getDate() + 2);

    // find the names of the week for tomorrow and the dat after tomorrow
    const tomorrowStr = tomorrow.toLocaleDateString('en-US', {weekday: 'long'});
    const afterTomorrowStr = afterTomorrow.toLocaleDateString('en-US', {weekday: 'long'});

    // format the date to YYYY-MM-DD
    const todayDateStr = formatDate(today);
    const tomorrowDateStr = formatDate(tomorrow);
    const afterTomorrowDateStr = formatDate(afterTomorrow);

    //filter the data results to find the relevant days
    const todayForecast = list.filter(item => formatDate(new Date(item.dt * 1000)) === todayDateStr);
    const tomorrowForecast = list.filter(item => formatDate(new Date(item.dt * 1000)) === tomorrowDateStr);
    const afterTomorrowForecast = list.filter(item => formatDate(new Date(item.dt * 1000)) === afterTomorrowDateStr);

    console.log("today, tomorrow, next day:")
    console.log(todayForecast);
    console.log(tomorrowForecast);
    console.log(afterTomorrowForecast);

    // insert forecasts into HTML
    if (todayForecast.length > 0) {
        const maxTemp = Math.max(...todayForecast.map(item => item.main.temp_max));
        todayTempHigh.innerHTML = `${maxTemp.toFixed(2)}°C`;
        const minTemp = Math.min(...todayForecast.map(item => item.main.temp_min));
        todayTempLow.innerHTML = `${minTemp.toFixed(2)}°C`;
    } else {
        todayTempHigh.innerHTML = `N/A`;
        todayTempLow.innerHTML = `N/A`;
    }

    if (tomorrowForecast.length > 0) {
        // Sum all temperatures
        const totalTemp = tomorrowForecast.reduce((sum, item) => sum + item.main.temp, 0);
        // get average
        const averageTemp = totalTemp / tomorrowForecast.length;
        tomorrowName.innerHTML = `${tomorrowStr}`;
        tomorrowTempHigh.innerHTML = `${averageTemp.toFixed(2)}°C`;
        let tomorrowOutlook = capitalize(tomorrowForecast[0].weather[0].description);
        tomorrowTempLow.innerHTML = `${tomorrowOutlook}`;
    } else {
        tomorrowName.innerHTML = `${tomorrowStr}`;
        tomorrowTempHigh.innerHTML = `N/A`;
        tomorrowTempLow.innerHTML = `N/A`;
    }

    if (afterTomorrowForecast.length > 0) {
        // Sum all temperatures
        const totalTemp2 = afterTomorrowForecast.reduce((sum, item) => sum + item.main.temp, 0);
        // get average
        const averageTemp2 = totalTemp2 / afterTomorrowForecast.length;
        afterTomorrowName.innerHTML = `${afterTomorrowStr}`;
        afterTomorrowTempHigh.innerHTML = `${averageTemp2.toFixed(2)}°C`;
        let afterTomorrowOutlook = capitalize(afterTomorrowForecast[0].weather[0].description);
        afterTomorrowTempLow.innerHTML = `${afterTomorrowOutlook}`;
    } else {
        afterTomorrowName.innerHTML = `${afterTomorrowStr}`;
        afterTomorrowTempHigh.innerHTML = `N/A`;
        afterTomorrowTempLow.innerHTML = `N/A`;
    }
}

function formatDate(date) {
    // Formats the date as YYYY-MM-DD
    return date.toISOString().split('T')[0];
}

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












