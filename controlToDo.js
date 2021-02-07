const controlToDoIcon = document.querySelector(".toDoListIcon");
const controlToDoList = document.querySelector(".containerToDoList");
const wrapToDo = document.querySelector(".wrapToDo");
const wrapMain = document.querySelector(".wrapMain")

function moveMain(){
    //console.log(wrapMain);
    //console.dir(wrapMain);

    wrapMain.classList.toggle("moveWrapMain");
    
}
function hadleTargetDate(){
    if(!controlToDoList.classList.contains("wideToDo")){
        todoTargetDate2.style.visibility = "hidden";
        todoTargetDate2.style.display = "none";
        toDoInput2.style.width = "98%";
    }
    else{
        todoTargetDate2.style.visibility = "visible";
        todoTargetDate2.style.display = "block";
        toDoInput2.style.width = "70%";
    }
}

function toggleClass(num){
    if(num === 0){ // 기본상태
        controlToDoList.classList.toggle("showList");
        controlToDoIcon.classList.toggle("showToDoIcon");
    }
    else if(num === 1){ //List=Hide 에서 Form에 입력하면
        controlToDoList.classList.toggle("showList");
        controlToDoIcon.classList.toggle("showToDoIcon");
        setTimeout(function(){toggleClass(0)},2500);
    }
    else if(num === 2){
        if(controlToDoList.classList.contains("mouseE")){
            controlToDoList.classList.toggle("mouseE");  
            controlToDoIcon.classList.toggle("showToDoIcon");  
            controlToDoList.classList.toggle("wideToDo");
            hadleTargetDate();            
        }
        else{
            controlToDoList.classList.toggle("wideToDo");
            toggleClass(0);     
            hadleTargetDate();       
            
        }
        
    }
    else if(num === 3){//mouseevent에 대해서
        controlToDoList.classList.toggle("showList")
        controlToDoList.classList.toggle("mouseE");
    }
}
function handleToggle(event){
    //console.dir(event);
    //console.dir(event.target);
    const eTarget = event.target;

    if(eTarget.className === "js-toDoForm" & !controlToDoList.classList.contains("showList")){
        toggleClass(1);
    }
    else if(eTarget.className === "fas fa-clipboard-list"){
        toggleClass(2);
        moveMain();
    }
    else if(eTarget.className === "wrapToDo"){
        if(event.type === "mouseenter"  & !controlToDoList.classList.contains("showList")){
            toggleClass(3);
            
        }
        else if(event.type === "mouseleave"  & controlToDoList.classList.contains("showList") & !controlToDoIcon.classList.contains("showToDoIcon")){
            toggleClass(3);
        }
    }
}




function init(){
    //console.log(controlToDoIcon);
    controlToDoIcon.addEventListener("click",handleToggle);
    //todoList가 hide 되어 있는 상태에서 toDoform에 입력이 들어오면 보여주기
    toDoForm.addEventListener("submit",handleToggle);


    wrapToDo.addEventListener("mouseenter",handleToggle);
    wrapToDo.addEventListener("mouseleave",handleToggle);
}

init();