const manualContainer = document.querySelector(".manualContainer"),
    manualIcon = manualContainer.querySelector(".manualIcon"),
    manualPage = manualContainer.querySelector(".manual"),
    mainPage = manualPage.querySelector(".mainPage"),
    todoPage = manualPage.querySelector(".todoPage");

const clockIcons = document.querySelector(".clockContainerIcon"),
    grettingIcons = document.querySelector(".containerIcon");

function visibleIcons(){
    
    clockIcons.classList.add("manalshowing");
    grettingIcons.classList.add("manalshowing");

    
    clockSetting.style.visibility = "visible";
    clockSetting.style.opacity = 1;
    greetingsSetting.style.visibility = "visible";
    greetingsSetting.style.opacity = 1;
    

    clockDate.classList.add("manalshowing");
    clockTypeIcon.classList.add("manalshowing");
    clockTypeList.style.visibility = "visible";
    clockTypeList.style.opacity = 1;
    
}    

function hiddenIcons(){
    clockIcons.classList.remove("manalshowing");
    grettingIcons.classList.remove("manalshowing");

    
    clockSetting.style.visibility = '';
    clockSetting.style.opacity = '';
    greetingsSetting.style.visibility = '';
    greetingsSetting.style.opacity = '';

    
    clockDate.classList.remove("manalshowing");
    clockTypeIcon.classList.remove("manalshowing");
    clockTypeList.style.visibility = '';
    clockTypeList.style.opacity = '';
    

}
function visibleToDoList(){
    console.log("enter visible todo");
    if(manualPage.classList.contains("showing") & controlToDoIcon.classList.contains("showToDoIcon")){
        console.log("enter visible todo");
        hiddenIcons();
        mainPage.style.visibility = "hidden";
        mainPage.style.opacity = "0";
        todoPage.style.visibility = "visible";
        todoPage.style.opacity = "1";
    }
    else if(manualPage.classList.contains("showing") & !controlToDoIcon.classList.contains("showToDoIcon")){
        console.log("enter invisible todo");
        visibleIcons();
        mainPage.style.visibility = '';
        mainPage.style.opacity = '';
        todoPage.style.visibility='';
        todoPage.style.visibility='';
    }
    

}


function showManualPage(){
    manualPage.classList.toggle("showing");
    if(manualPage.classList.contains("showing") & !controlToDoIcon.classList.contains("showToDoIcon")){
        visibleIcons();
    }
    else if(manualPage.classList.contains("showing") & controlToDoIcon.classList.contains("showToDoIcon")){
        visibleToDoList();
    }
    else if(!manualPage.classList.contains("showing")){
        hiddenIcons();
    }
    controlToDoIcon.addEventListener("click",visibleToDoList);
}

function init(){
    manualIcon.addEventListener("click",showManualPage);
}

init();
