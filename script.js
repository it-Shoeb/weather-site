const APIKey = "70ec3b292028f26d80686fa5d6075c4b";

const weatherDataEl = document.getElementById('weather-data');
const cityInputEl = document.querySelector('#city-input');
const formEl = document.querySelector('form')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target[0])

    const cityValue = cityInputEl.value;
    console.log(cityValue)

    getWeatherData(cityValue);
    
})

// dealy in some line
async function getWeatherData(cityValue) {
    try{
                                                        //version of api //add query q = query //to add prameter after query we use &
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKey}&units=metric`).then()

        if(!response.ok){
            throw new Error("Network Response Was Not Ok")
        }

        const data = await response.json()
        console.log(data)
        
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels Like : ${data.main.feels_like}`,
            `Humidity : ${data.main.humidity}%`,
            `Speed : ${data.wind.speed} m/s`
        ]

        const humidity = data.main.humidity
        const feelsLike = data.main.feels_like
        const windSpeed = data.wind.speed

        console.log(temperature, description, icon, humidity, feelsLike, windSpeed)

        weatherDataEl.querySelector('.icon').innerHTML = `<div class="icon"><img src="http://openweathermap.org/img/wn/${icon}.png" alt="wather icon"></div>`
        weatherDataEl.querySelector('.temperature').textContent = temperature
        weatherDataEl.querySelector('.description').textContent = description
        weatherDataEl.querySelector('.details').innerHTML = details.map((detail) => `<div>${detail}</div>`).join('');
        
    }catch(err){
        weatherDataEl.querySelector('.icon').innerHTML = ''
        weatherDataEl.querySelector('.temperature').textContent = ''
        weatherDataEl.querySelector('.description').textContent = 'An Error Happen, Please Try Again Later'
        weatherDataEl.querySelector('.details').innerHTML = ''
    }
}
