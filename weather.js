const weather = document.querySelector(".js-currentWeather");
const dailyWeather = document.querySelector(".js-dailyWeather");
const days = ["일","월","화","수","목","금","토"];
const API_KEY = "3b0e5df631733876105b73103f7c4e34";
const COORDS = 'coords';

function getDailyWeather(lat, lng){
    //console.log("start getDailyWeather");

    const today = new Date();
    const date = today.getDate();
    const day = today.getDay();

    

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`
    ).then(function(respose){
        return respose.json();
    }).then(function(json){
        //console.log(json);
        const dailyTemperature = json.daily;
        //console.log(dailyTemperature);
        //console.log(dailyWeather.children[0].children[0].innerText);

        for(let i=1;i<8;i++){
            
                
                let eachDate = date+i<10 ? `0${date+i}`: date+i;
                let eachDay = days[day+i >6 ? `${day+i-7}`: day+i];

                //dailyWeather.children[i-1].children[0].innerText = `${date+i<10 ? `0${date+i}`: date+i}, ${day+i >7 ? `${day+i-7}`: day+i}요일 :`;
                dailyWeather.children[i-1].children[0].innerText = `${eachDate}, ${eachDay}요일 :`;

                dailyWeather.children[i-1].children[1].innerText = `${dailyTemperature[i].temp.min} ~ `;
                dailyWeather.children[i-1].children[2].innerText = dailyTemperature[i].temp.max;
        }
        //console.log(dailyWeather);
    });
}


function getCurrentWeather(lat, lng){
    //console.log("start getCurrentWeather");
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(respose){
        return respose.json();
    }).then(function(json){
        //console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
       // console.log(temperature, place, weather);
        weather.innerText = `${place}\r${temperature}°C`;
    });
   
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


//위치를 불러오는 함수들 ***********
function handleGeoSucces(position){
    console.log("start handleGeoSucces");
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    console.log(latitude,longitude);

    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getCurrentWeather(latitude, longitude);
    getDailyWeather(latitude, longitude);
}
function handleGeoError(){
    console.log('Can access geo location');
}

function askForCoords(){
    //console.log("start askForCoords");
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    //console.log("start loadCoords");
    const loadedCoords = localStorage.getItem(COORDS);
    //console.log(loadedCoords, loadedCoords===null, loadedCoords==="undefined");
    if(loadedCoords === null || loadedCoords === "undefined"){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log('else', parsedCoords);
        getCurrentWeather(parsedCoords.latitude, parsedCoords.longitude);
        getDailyWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();

    //console.dir(dailyWeather);
    //console.log(dailyWeather.children[0].children[0].innerText);
    
}
init();