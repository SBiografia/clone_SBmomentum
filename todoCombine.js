const toDoForm = document.querySelector(".js-toDoForm")
toDoForm2 = document.querySelector(".js-toDoForm2"),
    toDoInput = toDoForm.querySelector("input"),
    toDoInput2 = toDoForm2.querySelector("#js-text2"),
    todoTargetDate2 = toDoForm2.querySelector("#js-todoTargetDate2"),
    toDoListScreen = document.querySelector(".js-toDoList"),
    doneListScreen = document.querySelector(".js-DoneList");

const numOfToDo = document.querySelector(".numOfToDo"),
    numOfDone = document.querySelector(".numOfDone");

const progressCurrent = document.querySelector(".progressPercentCurrent");

const topOfToDo = document.querySelector(".containerToDoList .top");

const icon_calendar = topOfToDo.querySelector(".topCalendar input"),
    btn_pre = topOfToDo.querySelector("#btn_pre"),
    btn_next = topOfToDo.querySelector("#btn_next"),
    selDate = topOfToDo.querySelector(".selectDate"),
    icon_today = topOfToDo.querySelector(".fa-calendar-day");


const btn_deleteAll = document.querySelector("#deleteAll"),
    btn_deleteDone = document.querySelector("#deleteDone"),
    btn_allCompleted = document.querySelector("#allCompleted");

const TODOS_LS = "toDoList";
const DONE_LS = "doneList";
const TODOS_CN = "js-toDoList";
const DONE_CN = "js-DoneList";

let tempToDoArr = [];
let tempDoneArr = [];

const today = new Date();
let tempSelDate = new Date();

function checkOverdue(targetToDo) {
    // tm1:td1 이 todo의 날짜, tm2.td2 가 리스트에 표시중인 날짜
    // true는 기한 전, false는 기한 지난거
    if (targetToDo.targetMonth < tempSelDate.getMonth()) {
        return false;
    }
    else if (targetToDo.targetMonth > tempSelDate.getMonth()) {
        return true;
    }
    else {
        if (targetToDo.targetDate < tempSelDate.getDate()) {
            return false;
        }
        else {
            return true;
        }
    }
}


function saveTargetDate(event) {
    const changedTargetDate_String = event.target.value;
    const changedMonth = changedTargetDate_String.substring(5, 7);
    const changedDate = changedTargetDate_String.substring(8, 10);
    const parentLi = event.target.parentNode.parentNode;

    const parsedToDos = JSON.parse(localStorage.getItem((TODOS_LS)));

    console.log(`month is ${changedMonth}, date is ${changedDate}`);
    console.log(event.target.parentNode.parentNode.id);

    for (let i = 0; i < parsedToDos.length; i++) {
        console.log(parsedToDos[i].id, parentLi.id);
        if (parsedToDos[i].id === parentLi.id) {
            console.log("enter same id");
            toDoListScreen.removeChild(parentLi);
            parsedToDos[i].targetMonth = Number(changedMonth - 1);
            parsedToDos[i].targetDate = Number(changedDate);

            tempToDoArr = parsedToDos;
            saveToDo_LS(TODOS_CN);
            if (checkOverdue(parsedToDos[i])) {
                printToDo(parsedToDos[i], TODOS_CN, 4);
            }
            else if (!checkOverdue(parsedToDos[i])) {
                printToDo(parsedToDos[i], TODOS_CN, 5);
            }
            return;
        }
    }
}





/**********  PROGRESS BAR 표시 ****************** */
function paintPercentCompleted() {
    const intNumToDo = Number(numOfToDo.innerText);
    const intNumDone = Number(numOfDone.innerText)
    if (intNumToDo + intNumDone === 0) {
        progressCurrent.innerText = "";
        progressCurrent.style.width = `0%`;
    }
    else {
        const percent = Math.floor(intNumDone / (intNumToDo + intNumDone) * 100);
        progressCurrent.innerText = `${percent}% `;
        progressCurrent.style.width = `${percent}% `;
    }

}
/**********  잔여 TODO 표시 ****************** */
function paintNumOfDO(tempCN) {
    if (tempCN === TODOS_CN) {
        numOfToDo.innerText = toDoListScreen.children.length;
    }
    else if (tempCN === DONE_CN) {
        numOfDone.innerText = doneListScreen.children.length;
    }
    paintPercentCompleted();
}

/*************************  ul>li 추가해서 화면에 TODO 표시 ********************** */
function printToDo(tToDo, tempCN, printType) {
    //printType 1=처음 등록, 2=첫화면띄울때 3=지우거나옮길때 4=날짜변경할 때
    const li = document.createElement("li"); //비어 있는 li 를 만들고
    const checkBtn = document.createElement("i");
    const uncheckBtn = document.createElement("i");
    const delBtn = document.createElement("i");
    const span = document.createElement("span"); //내용

    const targetWrap = document.createElement("label");
    const eachToDoTarget = document.createElement("input");
    const spanTarget = document.createElement("span");

    const strikeLine = document.createElement("div");


    checkBtn.classList.add("far", "fa-circle");
    delBtn.classList.add("fas", "fa-times");
    uncheckBtn.classList.add("far", "fa-check-circle");
    strikeLine.classList.add("strike");

    targetWrap.classList.add("targetWrap");
    spanTarget.classList.add("target");
    eachToDoTarget.type = "date";
    targetWrap.appendChild(eachToDoTarget);
    targetWrap.appendChild(spanTarget);

    checkBtn.addEventListener("click", checkTodo);
    uncheckBtn.addEventListener("click", uncheckTodo);
    delBtn.addEventListener("click", handleDelete);
    span.addEventListener("dblclick",changeToDoContent)
    spanTarget.classList.add("target");
    eachToDoTarget.addEventListener("change", saveTargetDate);
    //spanTarget.addEventListener("dblclick", changeTarget);

    span.innerText = tToDo.text;
    spanTarget.innerText = `~${tToDo.targetMonth < 9 ? `0${tToDo.targetMonth + 1}` : tToDo.targetMonth + 1}/${tToDo.targetDate < 10 ? `0${tToDo.targetDate}` : tToDo.targetDate}`;
    li.id = tToDo.id;
    li.targetMonth = tToDo.targetMonth;
    li.targetDate = tToDo.targetDate;

    if (printType === 5) {
        li.classList.add("overdueToDo");
    }

    if (tempCN === TODOS_CN) {
        li.appendChild(checkBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(targetWrap);
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        toDoListScreen.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.

    }
    else if (tempCN === DONE_CN) {
        li.appendChild(uncheckBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(spanTarget);
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        li.appendChild(strikeLine);
        doneListScreen.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
    }


    switch (printType) {
        //printType 1=처음 등록, 2=첫화면띄울때 3=체크/언체크 4=날짜변경할 때
        case 1: //처음 todo 등록할 때 
            pushArr(tToDo, tempCN);
            saveToDo_LS(tempCN);
            paintNumOfDO(tempCN);
            break;
        case 2:
            pushArr(tToDo, tempCN);
            paintNumOfDO(tempCN);
            break;
        case 3:
            pushArr(tToDo, tempCN);
            saveToDo_LS(tempCN);
            paintNumOfDO(tempCN);
            break;
        case 4: //날짜 옮겨다닐 때 LS 저장된 내용은 안바뀌고 화면표시만 바뀜
            paintNumOfDO(TODOS_CN);
            paintNumOfDO(DONE_CN);
            break;
        case 5: //todo에서 시산이 지난 toDo는 빨간색칠하기.
            paintNumOfDO(TODOS_CN);
            paintNumOfDO(DONE_CN);
            break;
    }


}
/******** 더블클릭으로 ToDo 내용 변경 *****/
function changeToDoContent(event){
    //console.dir(event.target);
    if(event.target.parentNode.parentNode.className === DONE_CN){
        return;
    }
    const targetToDoContent = event.target;
    targetToDoContent.contentEditable = "true";

    var range = document.createRange();  
    range.selectNodeContents(targetToDoContent);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    targetToDoContent.focus();

    targetToDoContent.addEventListener('keydown', tryToPreventNewLines);
    targetToDoContent.addEventListener('change', tryToPreventNewLines);
}

function saveToDoContent(targetSpan){
    const changedText = targetSpan.innerText;
    const parentLi = targetSpan.parentNode;
    const parsedToDos = JSON.parse(localStorage.getItem((TODOS_LS)));

    for (let i = 0; i < parsedToDos.length; i++) {
        if (parsedToDos[i].id === parentLi.id) {
            parsedToDos[i].text = changedText;
            tempToDoArr = parsedToDos;
            saveToDo_LS(TODOS_CN);
            return;
        }
    }
}

    /*
const parentLi = event.target.parentNode.parentNode;

    const parsedToDos = JSON.parse(localStorage.getItem((TODOS_LS)));

    console.log(`month is ${changedMonth}, date is ${changedDate}`);
    console.log(event.target.parentNode.parentNode.id);

    for (let i = 0; i < parsedToDos.length; i++) {
        console.log(parsedToDos[i].id, parentLi.id);
        if (parsedToDos[i].id === parentLi.id) {
            console.log("enter same id");
            toDoListScreen.removeChild(parentLi);
            parsedToDos[i].targetMonth = Number(changedMonth - 1);
            parsedToDos[i].targetDate = Number(changedDate);

            tempToDoArr = parsedToDos;
            saveToDo_LS(TODOS_CN);
            if (checkOverdue(parsedToDos[i])) {
                printToDo(parsedToDos[i], TODOS_CN, 4);
            }
            else if (!checkOverdue(parsedToDos[i])) {
                printToDo(parsedToDos[i], TODOS_CN, 5);
            }
            return;
        }
    }
    */


/***********************DELETE  와 관련된 함수들************** */

function handleDelete(event) {
    const btn = event.target,
        li = btn.parentNode,
        tempCN = event.path[2].className;
    deleteToDo(li, tempCN);
}

function deleteToDo(li, tempCN) {
    //console.log("START realDeleteToDO");
    //화면상에서 todolist 삭제하기. but TODOS_LS에서는 안사라짐.
    if (tempCN === TODOS_CN) {
        toDoListScreen.removeChild(li);
        //filter 함수는 array의 모든 아이템을 통해 인자로 넣어주는 사용자함수를 실행하고, 리턴값이 true인 아이템들만 가지고 새로운 배열을 만듬
        const cleanToDos = tempToDoArr.filter(function (toDo) {
            //console.log(toDo.id, li.id, toDo.id !== li.id, toDo.id !== parseInt(li.id));
            //li.id 가 string이라서 int로 변경  --> 기존에는 string이라서 int로 바꿨는데, date함수 쓰니 같이 string이라서 원래대로 씀 위에 콘솔 로그참고
            return toDo.id !== li.id;
        });
        //console.log(cleanToDos);
        tempToDoArr = cleanToDos;
        saveToDo_LS(tempCN);
        paintNumOfDO(tempCN)
    }
    else if (tempCN === DONE_CN) {
        doneListScreen.removeChild(li);
        const cleanDones = tempDoneArr.filter(function (toDo) {
            return toDo.id !== li.id;
        });
        tempDoneArr = cleanDones;
        saveToDo_LS(tempCN);
        paintNumOfDO(tempCN)
    }
}




/***********************SAVE  과 관련된 함수들************** */

function pushArr(tToDo, tempCN) {
    if (tempCN === TODOS_CN) {
        tempToDoArr.push(tToDo);

    }
    else if (tempCN === DONE_CN) {
        tempDoneArr.push(tToDo);
    }
}
function saveToDo_LS(tempCN) {
    //localStorage.setItem(TODOS_LS,tempToDoArr); //근데 localstorage에는 string만 넣을 수 있음. 그래서 jSON.stringify를 사용했음.
    //console.log(tempCN, tempCN === TODOS_CN, tempCN === DONE_CN);
    if (tempCN === TODOS_CN) {
        localStorage.setItem(TODOS_LS, JSON.stringify(tempToDoArr)); //이건 JS의 object를 string으로 바꿔줌.
    }
    if (tempCN === DONE_CN) {
        localStorage.setItem(DONE_LS, JSON.stringify(tempDoneArr)); //이건 JS의 object를 string으로 바꿔줌.
    }
}

function getNewID() {
    const newId = Date.now().toString() + Math.floor(Math.random() * 100); //현재시간을 string으로 바꾼 값을 넣어줌
    return newId;
}

function loadToDos() {
    //처음 딱 새로고침 되었을 때 localstorage에 있는 todo를 화면에 기록해줘야함.
    const loaderDones = localStorage.getItem(DONE_LS);
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); //string으로 만들어진 object를 다시 object로 변환.
        //원래 tempToDoArr[]는 비어있으니까. 로컬스토리지에 있는 값들을 여기 tempToDoArr[]에 넣어주면서 화면에 뿌릴꺼임. paintToDo 함수 사용
        parsedToDos.forEach(function (toDo) {
            printToDo(toDo, TODOS_CN, 2);
        });
    }
    if (loaderDones !== null) {
        const parsedDones = JSON.parse(loaderDones);
        parsedDones.forEach(function (toDo) {
            printToDo(toDo, DONE_CN, 2);
        });
    }
}
/***********************CHECK UNCHECK Handle  과 관련된 함수들************** */


function checkTodo(event) {
    //toDo -> Done으로 
    const btn = event.target,
        li = btn.parentNode;
    deleteToDo(li, TODOS_CN);

    const toDoObj = {
        text: li.childNodes[1].innerText,
        id: getNewID(),
        targetMonth: li.targetMonth,
        targetDate: li.targetDate
    };

    printToDo(toDoObj, DONE_CN, 3);
}

function uncheckTodo(event) {
    const btn = event.target,
        li = btn.parentNode;

    deleteToDo(li, DONE_CN);

    const toDoObj = {
        text: li.childNodes[1].innerText,
        id: getNewID(),
        targetMonth: li.targetMonth,
        targetDate: li.targetDate
    };
    printToDo(toDoObj, TODOS_CN, 3);
}

/***********************INPUT SUBMIT  과 관련된 함수들************** */
function handleBlank(e) {
    console.log("enter handleBlank")
    e.target.classList.toggle("applyShake");
}

function handleSubmit(event) {
    event.preventDefault(); //기존에 submit 하면 하는 이벤트 없애주고 submit 하면 새로고침을 해버려서..
    const eClassName = event.target.className;
    if (eClassName === "js-toDoForm") {
        const toDoObj = {
            text: toDoInput.value,
            id: getNewID(),
            targetMonth: today.getMonth(),
            targetDate: today.getDate()
        };

        if (toDoObj.text === "") {
            //공백을 입력하면 입력 안되게 막음. 그리고 효과주기
            handleBlank(event);
        }
        else {
            printToDo(toDoObj, TODOS_CN, 1);
            toDoInput.value = "";
        }
    }
    else if (eClassName === "js-toDoForm2") {

        const tDate = new Date(todoTargetDate2.value);
        const toDoObj = {
            text: toDoInput2.value,
            id: getNewID(),
            targetMonth: tDate.getMonth(),
            targetDate: tDate.getDate()
        };

        if (toDoObj.text === "") {
            handleBlank(event);
        }
        else {
            printToDo(toDoObj, TODOS_CN, 1);
            toDoInput2.value = "";
        }
    }
}
/***********************ALL COMPLETED, CLEAR 과 관련된 함수들************** */

function deleteAllDone() {
    if (confirm('Are you sure you want to delete all?')) {
        //all delete done
        tempDoneArr = [];
        doneListScreen.innerHTML = "";
        saveToDo_LS(DONE_CN);
        paintNumOfDO(DONE_CN);
    } else {
        // Do nothing!
    }

}
function deleteAllTodo() {
    tempToDoArr = [];
    toDoListScreen.innerHTML = "";
    saveToDo_LS(TODOS_CN);
    paintNumOfDO(TODOS_CN);
}

function deleteAll() {
    deleteAllDone();
    deleteAllTodo();
}

function AllCompleted() {
    for (let i = 0; i < tempToDoArr.length; i++) {
        printToDo(tempToDoArr[i], DONE_CN, 3);
    }
    deleteAllTodo();
}




/******************* 날짜와 연관된 함수들***************** */
function showCalendar() {
    const tCalendar = icon_calendar.value;
    tempSelDate.setFullYear(Number(tCalendar.substring(0,4)),Number(tCalendar.substring(5,7))-1,Number(tCalendar.substring(8,10)));
    showDate(tempSelDate.getMonth(),tempSelDate.getDate());
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
    tM = tempSelDate.getMonth() < 9 ? `0${tempSelDate.getMonth() + 1}` : tempSelDate.getMonth();
    tD = tempSelDate.getDate() < 10 ? `0${tempSelDate.getDate()}` : tempSelDate.getDate();

    todoTargetDate2.value = `${tY}-${tM}-${tD}`;
    //paintToDoDependDate();
    paintToDoDependDate();
}

function paintToDoDependDate() {
    const updatedToDos = tempToDoArr.filter(function (toDo) {
        //return toDo.targetDate >= tempSelDate.getDate();
        return checkOverdue(toDo, tempSelDate);
    });
    const updatedDones = tempDoneArr.filter(function (toDo) {
        //return toDo.targetDate >= tempSelDate.getDate();
        return checkOverdue(toDo, tempSelDate);
    });
    const overdueToDos = tempToDoArr.filter(function (toDo) {
        return !checkOverdue(toDo, tempSelDate);
        //toDo.targetDate < tempSelDate.getDate();
    });


    toDoListScreen.innerHTML = "";
    doneListScreen.innerHTML = "";
    if (updatedToDos !== null) {
        updatedToDos.forEach(function (toDo) {
            printToDo(toDo, TODOS_CN, 4);
        });
    }
    if (overdueToDos !== null) {
        overdueToDos.forEach(function (toDo) {
            printToDo(toDo, TODOS_CN, 5);
        });
    }
    if (updatedDones !== null) {
        updatedDones.forEach(function (toDo) {
            printToDo(toDo, DONE_CN, 4);
        });
    }
}





function init() {

    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    toDoForm2.addEventListener("submit", handleSubmit);
    toDoForm.addEventListener("animationend", handleBlank);
    toDoForm2.addEventListener("animationend", handleBlank);

    //btn_deleteAll.addEventListener("click",deleteAll);  //deleteAll button is risky
    btn_deleteDone.addEventListener("click", deleteAllDone);
    btn_allCompleted.addEventListener("click", AllCompleted);



    //날짜와 연계된 기능들
    showToday();
    icon_calendar.addEventListener("change", showCalendar);
    btn_pre.addEventListener("click", getPreDate);
    btn_next.addEventListener("click", getNextDate);
    icon_today.addEventListener("click", showToday);
}

init();