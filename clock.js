const clockContainer = document.querySelector(".clock");
//console.log(clockContainer);
const clockTitle = clockContainer.querySelector(".time");
const stopwatchTitle = clockContainer.querySelector(".stopwatch"),
    minutesTitle = stopwatchTitle.querySelector(".timerMinutes"),
    secondsTitle = stopwatchTitle.querySelector(".timerSeconds");

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
let saveTempTimeForESC = "01:00";
let minutesTennthDigit = 0;
let secondsTennthDigit = 0;

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockDate.innerText = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;


    if (chk24.checked && chkSec.checked) {
        //24시간표시 + 초 표시
        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
    else if (chk24.checked && !chkSec.checked) {
        //24시간표시 + 초 표시안함
        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }
    else if (!chk24.checked && chkSec.checked) {
        //12시간표시 + 초표시
        clockTitle.innerText = `${hours > 11 ? `${hours - 12}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
    else if (!chk24.checked && !chkSec.checked) {
        //12시간표시 + 초표시안한
        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours > 11 ? `${hours - 12}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }
}

function showTypeList(e) {
    //console.log("enter show type list");
    clockTypeList.style.visibility = "visible";
    clockTypeList.style.opacity = 1;
    e.stopPropagation();
}
function notShowTypeList() {
    if (clockTypeList.style.visibility === "visible") {
        clockTypeList.style.visibility = "hidden";
        clockTypeList.style.opacity = 0;
    }
}
function toggleType() {
    clockIcon.classList.toggle("selectClockType");
    clockIcon.classList.toggle("unselectClockType");
    stopwatchIcon.classList.toggle("unselectClockType");
    stopwatchIcon.classList.toggle("selectClockType");
}
function selectClock(e) {
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
function selectStopwatch(e) {
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

function showClockType() {
    //console.log("showClockType:",currentClockType);
    if (currentClockType === "clock") {
        //console.log("enter show : clock");
        stopwatchTitle.classList.remove("showing");
        timerIcons.classList.remove("showing");
        clockTitle.classList.add("showing");
        clockDate.classList.add("showing");
        clockSettingContainer.classList.add("showingClockContainerIcon");
    }
    else if (currentClockType === "stopwatch") {
        //console.log("enter show : stopwatch");
        stopwatchTitle.classList.add("showing");
        timerIcons.classList.add("showing");
        clockTitle.classList.remove("showing");
        clockDate.classList.remove("showing");
        clockSettingContainer.classList.remove("showingClockContainerIcon");
    }
}
function startTimer() {
    if (minutesTitle.innerText === "00" & secondsTitle.innerText === "00") {
        console.log("not Set Time");
        return;
    }
    printTimer();
    //setTimeout(startTimer,1000);
    timerId = setInterval(printTimer, 1000);

}
function printTimer() {
    /*
    const setTimeString = stopwatchTitle.innerText;    
    let minutes = Number(setTimeString.substring(0,2));
    let seconds = Number(setTimeString.substring(3,5));
      */
    let minutes = Number(minutesTitle.innerText);
    let seconds = Number(secondsTitle.innerText);

    if (seconds === 0) {
        // 초는 59가 되고, 분은 1 줄어들고
        minutes = minutes - 1;
        seconds = 59;
    }
    else {
        //초를 1 줄이기.
        seconds = seconds - 1;
    }
    /*
        stopwatchTitle.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds<10 ? `0${seconds}`: seconds}`;
      */
    minutesTitle.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
    secondsTitle.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
    //console.log("enter Timer. this time is",minutes,seconds,"timeID is", timerId);
    if (minutes === 0 & seconds === 0) {
        console.log("time OVER");
        pauseTimer();
    }
}

function playTimer() {
    console.log("play");
    minutesTitle.contentEditable = "false";
    secondsTitle.contentEditable = "false";
    minutesTitle.style.cursor = "default";
    secondsTitle.style.cursor = "default";
    console.log(minutesTitle.innerText !== "00", secondsTitle.innerText === "00");
    if (!(minutesTitle.innerText === "00" & secondsTitle.innerText === "00") & timerStatus !== "play") {
        timerStatus = "play";
        startTimer();
    }
    setTimerIcons();
}
function pauseTimer() {
    console.log("pause");
    timerStatus = "pause";
    clearInterval(timerId);
    setTimerIcons();
}
function stopTimer() {
    console.log("stop", timerStatus);

    clearInterval(timerId);
    timerId = null;
    timerStatus = "stop";
    setTimerIcons();
    //다시 시간 물어보는 상태로 가야 함
    minutesTitle.innerText = "05";
    secondsTitle.innerText = "00";
    saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;
}
function askSetTimer() {
    secondsTennthDigit = 0;
    minutesTennthDigit = 0;
    minutesTitle.contentEditable = "true";
    secondsTitle.contentEditable = "true";
    minutesTitle.style.cursor = "text";
    secondsTitle.style.cursor = "text";


    secondsTitle.addEventListener('keydown', checkSetTime);
    secondsTitle.addEventListener('change', checkSetTime);
    minutesTitle.addEventListener('keydown', checkSetTime);
    minutesTitle.addEventListener('change', checkSetTime);
    secondsTitle.addEventListener('click', function (e) {
        if (secondsTennthDigit === 0) {
            handleRange(e.target, 0);
        }
    })
    minutesTitle.addEventListener('click', function (e) {
        if (minutesTennthDigit === 0) {
            handleRange(e.target, 0);
        }
    })

}

function checkLimitMinute(num) {
    if (num >= 10) {
        minutesTennthDigit = 2;
    } else if (num > 0 & num < 10) {
        minutesTennthDigit = 1;
    }
    else if (num === 0) {
        minutesTennthDigit = 0;
    }
    if (num >= 0 & num < 100) {
        return true;
    }
    return false;
}
function checkLimitSecond(num) {
    if (num >= 10) {
        secondsTennthDigit = 2;
    } else if (num > 0 & num < 10) {
        secondsTennthDigit = 1;
    }
    else if (num === 0) {
        secondsTennthDigit = 0;
    }
    if (num >= 0 & num < 60) {
        return true;
    }
    console.log("return false");
    return false;
}
function handleRange(title, num) {
    //num=0 이면 handler , num=1이면 끝에 커서
    let range = document.createRange();
    range.selectNodeContents(title);
    if (num === 1) {
        range.collapse(false);
    }
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    //console.log(sel);
}
function resetTimeESC() {
    minutesTitle.innerText = saveTempTimeForESC.substring(0, 2);
    secondsTitle.innerText = saveTempTimeForESC.substring(3, 5);
}

function checkSetTime(e) {
    //console.log(e.keyCode);
    //console.dir(e.target);
    //console.dir(e);
    //console.log(window.getSelection());
    const nowNum_str = e.target.innerText;
    const nowNum = Number(nowNum_str);
    const tempCN = e.target.className;
    const cursorPosition = window.getSelection().focusOffset;
    switch (e.keyCode) {
        case 13://enter
            e.target.blur();
            e.preventDefault();
            if (minutesTitle.innerText.length === 1) {
                minutesTitle.innerText = `${minutesTitle.innerText < 10 ? `0${minutesTitle.innerText}` : minutesTitle.innerText}`;
            }
            if (secondsTitle.innerText.length === 1) {
                secondsTitle.innerText = `${secondsTitle.innerText < 10 ? `0${secondsTitle.innerText}` : secondsTitle.innerText}`;
            }
            saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;
            return false;
        case 8:
        case 46://backspace
            if (tempCN === "timerMinutes" & minutesTennthDigit > 0 & (nowNum_str.substring(0, 1) !== "0" | cursorPosition === 2)) {
                minutesTennthDigit--;
            }
            else if (tempCN === "timerSeconds" & secondsTennthDigit > 0 & (nowNum_str.substring(0, 1) !== "0" | cursorPosition === 2)) {
                secondsTennthDigit--;
            }
            break;
        case 37:
        case 39:
            //기능키 : backspace(8), 방향키(37~40)
            break;
        case 38: //위쪽 방향키는 1씩 증가
            if (tempCN === "timerMinutes") {
                if (checkLimitMinute(nowNum + 1)) {
                    e.target.innerText = `${nowNum + 1 < 10 ? `0${nowNum + 1}` : nowNum + 1}`;
                }
            } else if (tempCN === "timerSeconds") {
                if (checkLimitSecond(nowNum + 1)) {
                    e.target.innerText = `${nowNum + 1 < 10 ? `0${nowNum + 1}` : nowNum + 1}`;
                }
            }
            break;
        case 40: //아래쪽 방향키는 1씩 감소
            if (tempCN === "timerMinutes") {
                if (checkLimitMinute(nowNum - 1)) {
                    e.target.innerText = `${nowNum - 1 < 10 ? `0${nowNum - 1}` : nowNum - 1}`;
                }
            } else if (tempCN === "timerSeconds") {
                if (checkLimitSecond(nowNum - 1)) {
                    e.target.innerText = `${nowNum - 1 < 10 ? `0${nowNum - 1}` : nowNum - 1}`;
                }
            }
            break;
        case 27:
            // ESC 누르면 원복하는거 만들기
            resetTimeESC();
            break;
        case 48: //0
        case 49: //1
        case 50://2
        case 51://3
        case 52://4
        case 53://5
            e.returnValue = false;
            if (tempCN === "timerSeconds") {
                if (secondsTennthDigit === 0) {
                    if(e.key !== "0"){
                        secondsTennthDigit++;
                    }
                    //e.target.innerText = `${Number(e.key) < 10 ? `0${Number(e.key)}` : Number(e.key)}`;
                    e.target.innerText = Number(e.key);
                    handleRange(secondsTitle, 1);
                } else if (secondsTennthDigit === 1) {
                    if (cursorPosition === 0 & nowNum_str.length === 1) {
                        console.log("enter 01")
                        if(e.key !== "0"){
                            secondsTennthDigit++;
                        }
                        e.target.innerText = `${e.key}${nowNum}`;
                    } else if (cursorPosition === 1 & nowNum_str.length === 1 & nowNum < 6) {
                        console.log("enter 02")
                        secondsTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;

                    } else if (cursorPosition !== 2 & nowNum_str.length === 2) {
                        console.log("enter 03")
                        secondsTennthDigit++;
                        e.target.innerText = `${e.key}${nowNum}`;
                    }
                    else if (cursorPosition === 2 & nowNum_str.length === 2 & nowNum < 6) {
                        console.log("enter 04")
                        secondsTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;
                    }
                    else{
                        e.target.classList.toggle("applyShake");
                    }
                    console.log("enter 00")
                    e.target.blur();
                    saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;
                } else if (secondsTennthDigit === 2) {
                    e.target.classList.toggle("applyShake");
                    e.target.blur();
                }
            }
            else if (tempCN === "timerMinutes") {
                if (minutesTennthDigit === 0) {
                    if(e.key !== "0"){
                        minutesTennthDigit++;
                    }                    
                    e.target.innerText = Number(e.key);
                    handleRange(minutesTitle, 1);
                } else if (minutesTennthDigit === 1) {
                    if (cursorPosition === 0 & nowNum_str.length === 1) {
                        if(e.key !== "0"){
                            minutesTennthDigit++;
                        }
                        e.target.innerText = `${e.key}${nowNum}`;
                    } else if (cursorPosition === 1 & nowNum_str.length === 1 & nowNum < 6) {
                        minutesTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;

                    } else if (cursorPosition !== 2 & nowNum_str.length === 2) {
                        minutesTennthDigit++;
                        e.target.innerText = `${e.key}${nowNum}`;
                    }
                    else if (cursorPosition === 2 & nowNum_str.length === 2 & nowNum < 6) {
                        minutesTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;
                    }
                    e.target.blur();
                    saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;
                } else if (minutesTennthDigit === 2) {
                    e.target.classList.toggle("applyShake");
                    e.target.blur();
                }
            }
            break;
        case 54://6
        case 55://7
        case 56://8
        case 57://9
            e.returnValue = false;
            if (tempCN === "timerSeconds") {
                if (secondsTennthDigit === 0) {
                    secondsTennthDigit++;
                    e.target.innerText = Number(e.key);
                    e.target.blur();
                    saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;
                } else if (secondsTennthDigit === 1) {
                    if (cursorPosition === 0 & nowNum_str.length === 1) {
                        e.target.classList.toggle("applyShake");
                    } else if (cursorPosition === 1 & nowNum_str.length === 1 & nowNum < 6) {
                        secondsTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;
                    } else if (cursorPosition !== 2 & nowNum_str.length === 2) {
                        e.target.classList.toggle("applyShake");
                    }
                    else if (cursorPosition === 2 & nowNum_str.length === 2 & nowNum < 6) {
                        secondsTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;
                    }


                    e.target.blur();
                    saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;

                } else if (secondsTennthDigit === 2) {
                    e.target.classList.toggle("applyShake");
                    e.target.blur();
                }
            }
            else if (tempCN === "timerMinutes") {
                if (minutesTennthDigit === 0) {
                    minutesTennthDigit++;
                    e.target.innerText = Number(e.key);
                    handleRange(minutesTitle, 1);
                } else if (minutesTennthDigit === 1) {
                    if (cursorPosition === 0 & nowNum_str.length === 1) {
                        minutesTennthDigit++;
                        e.target.innerText = `${e.key}${nowNum}`;
                    } else if (cursorPosition === 1 & nowNum_str.length === 1) {
                        minutesTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;

                    } else if (cursorPosition !== 2 & nowNum_str.length === 2) {
                        minutesTennthDigit++;
                        e.target.innerText = `${e.key}${nowNum}`;
                    }
                    else if (cursorPosition === 2 & nowNum_str.length === 2) {
                        minutesTennthDigit++;
                        e.target.innerText = `${nowNum}${e.key}`;
                    }
                    e.target.blur();
                    saveTempTimeForESC = `${minutesTitle.innerText}:${secondsTitle.innerText}`;
                } else if (minutesTennthDigit === 2) {
                    e.target.classList.toggle("applyShake");
                    e.target.blur();
                }
            }
            break;
        default:
            e.returnValue = false;
            console.log(e.returnValue);
            break;
    }
    console.log(`mTd is ${minutesTennthDigit}, sTD is ${secondsTennthDigit}`);
    return true;
}
function pauseAndPlayHandler() {
    if (timerStatus === "play") {
        pauseTimer();
    }
    else if (timerStatus === "pause") {
        playTimer();
    }
}
function setTimerIcons() {
    if (timerStatus === "play") {
        console.log("setTimer : play");
        oneIcon.classList.remove("showing");
        twoIcons.classList.add("showing");
        pauseIcon.classList.add("fa-pause-circle");
        pauseIcon.classList.remove("fa-play-circle");
    }
    else if (timerStatus === "stop") {

        //console.log("setTimer : stop");
        askSetTimer();
        oneIcon.classList.add("showing");
        twoIcons.classList.remove("showing");
    }
    else if (timerStatus === "pause") {
        console.log("setTimer : pause");
        pauseIcon.classList.remove("fa-pause-circle");
        pauseIcon.classList.add("fa-play-circle");
    }
}



function init() {
    //console.log(chk24.checked, chkSec.checked);

    clockIcon.classList.add("selectClockType");
    stopwatchIcon.classList.add("unselectClockType");
    showClockType();

    //console.dir(clockTitle);
    //console.dir(stopwatchTitle);
    getTime();
    setInterval(getTime, 1000);

    clockTypeIcon.addEventListener("click", showTypeList);
    window.addEventListener("click", notShowTypeList);

    clockIcon.addEventListener("click", selectClock);
    stopwatchIcon.addEventListener("click", selectStopwatch);

    setTimerIcons();
    playIcon.addEventListener("click", playTimer);
    pauseIcon.addEventListener("click", pauseAndPlayHandler);
    stopIcon.addEventListener("click", stopTimer);

    minutesTitle.addEventListener("animationend", function(e){
        e.target.classList.toggle("applyShake");
    });
    secondsTitle.addEventListener("animationend", function(e){
        e.target.classList.toggle("applyShake");
    });
}

init();