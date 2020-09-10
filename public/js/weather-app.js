//Accessing the DOM
const input = document.getElementById('city');
const button = document.getElementById('submit');
const form = document.getElementById('city-form');
const reportSection = document.getElementById('report-section');

//some css styling
const background = document.getElementById('bg');


// Prepare openweathermap.org request
let apiRequest = new XMLHttpRequest;
apiRequest.onreadystatechange =()=>{
    if(apiRequest.status === 404){
        document.getElementById('error-message').textContent = 'City not found!';
        document.querySelector('.container').style.display = 'none';

        return;
    }

    if(apiRequest.readyState === 4){
        const response = JSON.parse(apiRequest.response);
        console.log(response);

        const container = document.querySelector('.container');
        container.style.visibility = 'visible';
        

        reportSection.textContent = 'The weather in ' + response.name + ' is ' + response.weather[0].description + '.';
        
        const data = response.weather[0].description;
        console.log(response.weather[0]);

        const icon = response.weather[0].icon;
        //const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;
        const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
        const image = document.getElementById('image');
        image.setAttribute('src', iconUrl);

        //const latitude = response.coord.lat;
        //const longitude = response.coord.lon;

        const countryCode = response.sys.country;
        document.getElementById('country-code').textContent = countryCode;

        //snow effects
        const main = response.weather[0].main;
        if(data.includes('snow')){
            background.classList.add('main');
            
        }


        //the city's temperature
        
        const temperature = document.getElementById('temp');
        const getTemp = Math.round(response.main.temp);
        temperature.textContent = getTemp;
        document.querySelector('.city-temp').innerHTML = '<sup>°C</sup>';
        
    
    }

    
}

//event listener 
const cityName = document.getElementById('city-name');


form.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const cityInput = input.value;

    //.using the get method in the Api request open method 
    apiRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=f2af1d89192845caea323d4fb41abef6
    `);
    
    apiRequest.send();


    cityName.textContent = cityInput;
});

//local storage
function storeStorage(){
    //store
    localStorage.setItem("city-name", input.value);
}

function getStorage(){
            // Retrieve

    console.log(localStorage.getItem("city-name"));
}


