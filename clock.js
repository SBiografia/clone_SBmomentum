const clockContainer = document.querySelector(".clock");
//console.log(clockContainer);
const clockTitle = clockContainer.querySelector(".time");
const stopwatchTitle = clockContainer.querySelector(".stopwatch");
//console.log(clockTitle);
const clockDate = document.querySelector(".js-date");
const chk24 = clockContainer.querySelector("#check_24");
const chkSec = clockContainer.querySelector("#check_sec");

const clockTypeIcon = clockContainer.querySelector(".clockTypeIcon"),
    clockTypeList = clockContainer.querySelector(".clockTypeList");
const clockIcon = clockTypeList.childNodes[1],
    stopwatchIcon = clockTypeList.childNodes[3];
//    clockIcon = clockContainer.querySelector(".far fa-clock"),
//    stopwatchIcon = clockContainer.querySelector(".fas fa-stopwatch");

const SHOWINGCLOCK_CN = "showingClock",
    SHOWINGSTOPWATCH_CN = "showingStopwatch";
let currentClockType = "clock";

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

function showTypeList(e){
    //console.log("enter show type list");
    clockTypeList.style.visibility = "visible";
    clockTypeList.style.opacity = 1;
    e.stopPropagation();
}
function notShowTypeList(){
    if(clockTypeList.style.visibility === "visible"){
        clockTypeList.style.visibility = "hidden";
        clockTypeList.style.opacity = 0;
    }
}
function toggleType(){
        clockIcon.classList.toggle("selectClockType");
        clockIcon.classList.toggle("unselectClockType");
        stopwatchIcon.classList.toggle("unselectClockType");
        stopwatchIcon.classList.toggle("selectClockType");
}
function selectClock(e){
    currentClockType = "clock";
    clockTypeIcon.classList.remove("fas");
    clockTypeIcon.classList.remove("fa-stopwatch");
    clockTypeIcon.classList.add("far");
    clockTypeIcon.classList.add("fa-clock");
    clockTypeList.style.marginLeft = "calc(var(--font-size-time) * 0.35)"
    clockTypeList.style.marginRight = "0"
    toggleType();
    e.stopPropagation();
    notShowTypeList();

    showClockType();

}
function selectStopwatch(e){
    currentClockType = "stopwatch";
    clockTypeIcon.classList.remove("far");
    clockTypeIcon.classList.remove("fa-clock");
    clockTypeIcon.classList.add("fas");
    clockTypeIcon.classList.add("fa-stopwatch");
    clockTypeList.style.marginLeft = "0"
    clockTypeList.style.marginRight = "calc(var(--font-size-time) * 0.35)"
    toggleType();
    e.stopPropagation();
    notShowTypeList();

    showClockType();
}

function showClockType(){
    console.log("showClockType:",currentClockType);
    if(currentClockType === "clock"){
        console.log("enter show : clock");
        stopwatchTitle.classList.remove("showing");
        clockTitle.classList.add("showing");
    }
    else if(currentClockType === "stopwatch"){
        console.log("enter show : stopwatch");
        stopwatchTitle.classList.add("showing");
        clockTitle.classList.remove("showing");
    }
}

function init(){
    //console.log(chk24.checked, chkSec.checked);

    clockIcon.classList.add("selectClockType");
    stopwatchIcon.classList.add("unselectClockType");
    showClockType();

    console.dir(clockTitle);
    console.dir(stopwatchTitle);
    getTime();
    setInterval(getTime, 1000);

    clockTypeIcon.addEventListener("click",showTypeList);
    window.addEventListener("click",notShowTypeList);

    clockIcon.addEventListener("click",selectClock);
    stopwatchIcon.addEventListener("click",selectStopwatch);
}

init();