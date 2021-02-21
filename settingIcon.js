

const clockSettingContainer = document.querySelector(".clockContainerIcon"),
    clockSetting = clockSettingContainer.querySelector(".settings");
const grettingSettingContainer = document.querySelector(".containerIcon"),
    greetingsSetting = grettingSettingContainer.querySelector(".settings");

function showIcon(element){
    if(element.path[1].className === "clock" | element.path[2].className === "clock"){
        clockSetting.classList.toggle("manalshowing");
    }
    else if(element.path[1].className === "containerGreetings" | element.path[2].className === "containerGreetings"){
        greetingsSetting.classList.toggle("manalshowing");
        
    }
    element.stopPropagation();
}
function notShowIcon(){
       
        clockSetting.classList.remove("manalshowing");
        greetingsSetting.classList.remove("manalshowing");
}

function init(){
    //console.log(settingIcon);
    //console.log(settingIcon[0].parentNode.className ==="clock");
    
    clockSettingContainer.addEventListener("click",showIcon);
    grettingSettingContainer.addEventListener("click",showIcon);

    window.addEventListener("click",notShowIcon);
}

init();