const topOfToDo = document.querySelector(".containerToDoList .top");
const icon_calendar = topOfToDo.querySelector(".fa-calendar-alt"),
    btn_pre = topOfToDo.querySelector("#btn_pre"),
    btn_next = topOfToDo.querySelector("#btn_next"),
    selDate = topOfToDo.querySelector(".selectDate"),
    icon_today = topOfToDo.querySelector(".fa-calendar-day");

const today = new Date();
let tempSelDate = new Date();

function realPaintToDo(toDo, tempCN) {
    const li = document.createElement("li"); //비어 있는 li 를 만들고
    const checkBtn = document.createElement("i");
    const uncheckBtn = document.createElement("i");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    const spanTarget = document.createElement("span");
    const strikeLine = document.createElement("div");

    checkBtn.classList.add("far", "fa-circle");
    delBtn.classList.add("fas", "fa-times");
    uncheckBtn.classList.add("far", "fa-check-circle");
    strikeLine.classList.add("strike");
    
    checkBtn.addEventListener("click", checkTodo);
    uncheckBtn.addEventListener("click", uncheckTodo);
    delBtn.addEventListener("click", deleteToDo);
    spanTarget.classList.add("target");
    spanTarget.addEventListener("dblclick",changeTarget);

    span.innerText = toDo.text;
    spanTarget.innerText = `~${toDo.targetMonth < 9 ? `0${toDo.targetMonth+1}` : toDo.targetMonth+1}/${toDo.targetDate<10 ? `0${toDo.targetDate}`:toDo.targetDate}`;
    li.id = toDo.id;
    li.targetMonth = toDo.targetMonth;
    li.targetDate = toDo.targetDate;

    if (tempCN === TODOS_CN) {
        li.appendChild(checkBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(spanTarget);
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        toDoList.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
        
    }
    else if (tempCN === DONE_CN) {
        li.appendChild(uncheckBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(spanTarget);
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        li.appendChild(strikeLine);
        doneList.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
    }
    
}

function paintToDoDependDate() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loaderDones = localStorage.getItem(DONE_LS);
    const updatedToDos = toDos.filter(function (toDo) {
        return toDo.targetDate >= tempSelDate.getDate();
    });
    const updatedDones = dones.filter(function (toDo) {
        return toDo.targetDate >= tempSelDate.getDate();
    });
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    if (updatedToDos !== null) {
        updatedToDos.forEach(function (toDo) {
            realPaintToDo(toDo, TODOS_CN);
        });
    }
    if(updatedDones !== null){
        updatedDones.forEach(function (toDo) {
            realPaintToDo(toDo, DONE_CN);
        });
    }
    paintNumOfDO(TODOS_CN);
    paintNumOfDO(DONE_CN);

}

function showCalendar() {

}
function getPreDate() {
    tempSelDate.setDate(tempSelDate.getDate() - 1);
    showDate(tempSelDate.getMonth(), tempSelDate.getDate());
}
function getNextDate() {
    tempSelDate.setDate(tempSelDate.getDate() + 1);
    showDate(tempSelDate.getMonth(), tempSelDate.getDate());
}
function showToday() {
    tempSelDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    showDate(today.getMonth(), today.getDate());
}
function showDate(month, date) {
    selDate.innerText = `${month < 9 ? `0${month + 1}` : month + 1}.${date < 10 ? `0${date}` : date}`;
    tY = tempSelDate.getFullYear();
    tM = tempSelDate.getMonth() < 9 ? `0${tempSelDate.getMonth()+1}` : tempSelDate.getMonth();
    tD = tempSelDate.getDate() < 10 ? `0${tempSelDate.getDate()}` : tempSelDate.getDate();

    todoTargetDate2.value = `${tY}-${tM}-${tD}`;
    paintToDoDependDate();
}

function init() {
    //console.log(today.getFullYear(), today.getMonth(), today.getDate());
    //showDate(today.getMonth(), today.getDate());
    showToday();
    icon_calendar.addEventListener("click", showCalendar);
    btn_pre.addEventListener("click", getPreDate);
    btn_next.addEventListener("click", getNextDate);
    icon_today.addEventListener("click", showToday);
}

init();
