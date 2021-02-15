const clockContainer = document.querySelector(".clock");
//console.log(clockContainer);
const clockTitle = clockContainer.querySelector(".time");
const stopwatchTitle = clockContainer.querySelector(".stopwatch");
//console.log(clockTitle);
const clockDate = document.querySelector(".js-date");
const chk24 = clockContainer.querySelector("#check_24");
const chkSec = clockContainer.querySelector("#check_sec");
const timerIcons = document.querySelector(".timerIcons"),
    oneIcon = timerIcons.querySelector(".oneIcon"),
    twoIcons = timerIcons.querySelector(".twoIcons"),
    playIcon = timerIcons.querySelector(".js-play"),
    pauseIcon = timerIcons.querySelector(".js-pause"),
    stopIcon = timerIcons.querySelector(".js-stop");

const clockTypeIcon = clockContainer.querySelector(".clockTypeIcon"),
    clockTypeList = clockContainer.querySelector(".clockTypeList");
const clockIcon = clockTypeList.childNodes[1],
    stopwatchIcon = clockTypeList.childNodes[3];
//    clockIcon = clockContainer.querySelector(".far fa-clock"),
//    stopwatchIcon = clockContainer.querySelector(".fas fa-stopwatch");


let currentClockType = "clock";
let timerId = null;
let timerStatus = "stop";

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
    //console.log("showClockType:",currentClockType);
    if(currentClockType === "clock"){
        //console.log("enter show : clock");
        stopwatchTitle.classList.remove("showing");
        timerIcons.classList.remove("showing");
        clockTitle.classList.add("showing");
        clockDate.classList.add("showing");
        clockSettingContainer.classList.add("showingClockContainerIcon");
    }
    else if(currentClockType === "stopwatch"){
        //console.log("enter show : stopwatch");
        stopwatchTitle.classList.add("showing");
        timerIcons.classList.add("showing");
        clockTitle.classList.remove("showing");
        clockDate.classList.remove("showing");
        clockSettingContainer.classList.remove("showingClockContainerIcon");
    }
}
function startTimer(){
    if(stopwatchTitle.innerText === "00:00"){
      console.log("not Set Time");
      return;   
    }
    printTimer();
    //setTimeout(startTimer,1000);
    timerId = setInterval(printTimer,1000);
    
}
function printTimer(){
    const setTimeString = stopwatchTitle.innerText;    
    let minutes = Number(setTimeString.substring(0,2));
    let seconds = Number(setTimeString.substring(3,5));
       
       
       if(seconds === 0){
           // 초는 59가 되고, 분은 1 줄어들고
           minutes = minutes-1;
           seconds = 59;
       }
       else{
           //초를 1 줄이기.
           seconds = seconds-1;
       }

    stopwatchTitle.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds<10 ? `0${seconds}`: seconds}`;
    
        //console.log("enter Timer. this time is",minutes,seconds,"timeID is", timerId);
        if(minutes === 0 & seconds === 0){
            console.log("time OVER");
            pauseTimer();
        }
}

function playTimer(){
    console.log("play");
    if(stopwatchTitle.innerText !== "00:00" & timerStatus !== "play"){
        timerStatus = "play";
        startTimer();
        setTimerIcons();
    }
}
function pauseTimer(){
    console.log("pause");
    timerStatus = "pause";
    clearInterval(timerId);
    setTimerIcons();
}
function stopTimer(){
    console.log("stop");
    clearInterval(timerId);
    timerId = null;
    timerStatus = "stop";
    setTimerIcons();
    //다시 시간 물어보는 상태로 가야 함
    stopwatchTitle.innerText = "01:00";
}

function pauseAndPlayHandler(){
    if(timerStatus === "play"){
        pauseTimer();
    }
    else if(timerStatus === "pause"){
        playTimer();
    }
}
function setTimerIcons(){
    if(timerStatus === "play"){
        console.log("setTimer : play");
        oneIcon.classList.remove("showing");
        twoIcons.classList.add("showing");
        pauseIcon.classList.add("fa-pause-circle");
        pauseIcon.classList.remove("fa-play-circle");
    }
    else if(timerStatus === "stop"){
        console.log("setTimer : stop");
        oneIcon.classList.add("showing");
        twoIcons.classList.remove("showing");
    }
    else if(timerStatus === "pause"){
        console.log("setTimer : pause");
        pauseIcon.classList.remove("fa-pause-circle");
        pauseIcon.classList.add("fa-play-circle");
    }
}



function init(){
    //console.log(chk24.checked, chkSec.checked);

    clockIcon.classList.add("selectClockType");
    stopwatchIcon.classList.add("unselectClockType");
    showClockType();

    //console.dir(clockTitle);
    //console.dir(stopwatchTitle);
    getTime();
    setInterval(getTime, 1000);

    clockTypeIcon.addEventListener("click",showTypeList);
    window.addEventListener("click",notShowTypeList);

    clockIcon.addEventListener("click",selectClock);
    stopwatchIcon.addEventListener("click",selectStopwatch);

    setTimerIcons();
    playIcon.addEventListener("click",playTimer);
    pauseIcon.addEventListener("click",pauseAndPlayHandler);
    stopIcon.addEventListener("click",stopTimer);
}

init();