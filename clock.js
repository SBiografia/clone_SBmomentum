const clockContainer = document.querySelector(".clock");
//console.log(clockContainer);
const clockTitle = clockContainer.querySelector(".time");
//console.log(clockTitle);
const clockDate = document.querySelector(".js-date");
const chk24 = clockContainer.querySelector("#check_24");
const chkSec = clockContainer.querySelector("#check_sec");




function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockDate.innerText = `${date.getFullYear()}. ${date.getMonth()+1}. ${date.getDate()}`;
    
    
    if(chk24.checked && chkSec.checked){
        //24시간표시 + 초 표시
        clockTitle.innerText = `${hours<10 ? `0${hours}`:hours}:${
            minutes<10 ? `0${minutes}` : minutes}:${
                seconds<10 ? `0${seconds}` : seconds}`;
    }
    else if(chk24.checked && !chkSec.checked){
        //24시간표시 + 초 표시안함
        clockTitle.innerText = `${hours<10 ? `0${hours}`:hours}:${
            minutes<10 ? `0${minutes}` : minutes}`;
    }
    else if(!chk24.checked && chkSec.checked){
        //12시간표시 + 초표시
        clockTitle.innerText = `${hours>11 ? `${hours-12}`:hours}:${
            minutes<10 ? `0${minutes}` : minutes}:${
                seconds<10 ? `0${seconds}` : seconds}`;
    }
    else if(!chk24.checked && !chkSec.checked){
        //12시간표시 + 초표시안한
        clockTitle.innerText = `${hours<10 ? `0${hours}`: hours>11 ? `${hours-12}`: hours}:${
            minutes<10 ? `0${minutes}` : minutes}`;
    }
}


function init(){
    //console.log(chk24.checked, chkSec.checked);
    getTime();
    setInterval(getTime, 1000);
}

init();