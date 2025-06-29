document.querySelector('#search').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName){
        return showAlert("Você precisa digitar uma cidade...");
    }

    const apikey = 'c3de7d69ea52a3512eb030d31c0d984b';
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apikey}&units=metric&lang=pt_br`

    const results = await fetch(apiurl);
    const json = await results.json();

    if(json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windspeed: json.wind.speed,
            humidity: json.main.humidity
        });
    } else {
        showAlert("Não foi possível localizar...");
    }
});

function showInfo(json){
    showAlert("");

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windspeed.toFixed(1)}Km/h`;
}   

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg;
}