/*
const settingIcon = document.querySelectorAll(".containerIcon");
const clockSetting = settingIcon[0].querySelector(".settings");
const greetingsSetting = settingIcon[1].querySelector(".settings");
*/

const clockSettingContainer = document.querySelector(".clockContainerIcon"),
    clockSetting = clockSettingContainer.querySelector(".settings");
const grettingSettingContainer = document.querySelector(".containerIcon"),
    greetingsSetting = grettingSettingContainer.querySelector(".settings");

function showIcon(element){
    //console.log("HI, you click setting Icon");
    //console.log(element.path);

    if(element.path[1].className === "clock" | element.path[2].className === "clock"){
        //console.dir(clockSetting);
        clockSetting.style.visibility = "visible";
        clockSetting.style.opacity = "1";
        
    }
    else if(element.path[1].className === "containerGreetings" | element.path[2].className === "containerGreetings"){
        greetingsSetting.style.visibility = "visible";
        greetingsSetting.style.opacity = "1";
    }
    element.stopPropagation();
}
function notShowIcon(){
    //console.log("HI, this is Not show");
    if(clockSetting.style.visibility === "visible" | greetingsSetting.style.visibility === "visible"){
        clockSetting.style.visibility = "hidden";
        clockSetting.style.opacity = "0";
        greetingsSetting.style.visibility = "hidden";
        greetingsSetting.style.opacity = "0";
}
}

function init(){
    //console.log(settingIcon);
    //console.log(settingIcon[0].parentNode.className ==="clock");
    
    clockSettingContainer.addEventListener("click",showIcon);
    grettingSettingContainer.addEventListener("click",showIcon);

    window.addEventListener("click",notShowIcon);
}

init();