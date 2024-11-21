const key = "5eb185939858cdcb14f2ca3d22cf03e4";
const lat = "49.74995753581982"
const lon = "6.636270458799609"
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`


const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

async function apiFetch(){
    try{
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch(error){
        window.alert(error)
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

var api = apiFetch()
displayResults(api)