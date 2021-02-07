const toDoForm = document.querySelector(".js-toDoForm")
toDoForm2 = document.querySelector(".js-toDoForm2"),
    toDoInput = toDoForm.querySelector("input"),
    toDoInput2 = toDoForm2.querySelector("#js-text2"),
    todoTargetDate2 = toDoForm2.querySelector("#js-todoTargetDate2"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-DoneList");
const numOfToDo = document.querySelector(".numOfToDo"),
    numOfDone = document.querySelector(".numOfDone");
const progressCurrent = document.querySelector(".progressPercentCurrent");

const btn_deleteAll = document.querySelector("#deleteAll"),
    btn_deleteDone = document.querySelector("#deleteDone"),
    btn_allCompleted = document.querySelector("#allCompleted");

const TODOS_LS = "toDoList";
const DONE_LS = "doneList";
const TODOS_CN = "js-toDoList";
const DONE_CN = "js-DoneList";
//todo를 삭제하고 나면 교체해줘야되니. let으로 바꿨음
let toDos = [];
let dones = [];
let idNum = 0;

function paintPercentCompleted() {
    const intNumToDo = Number(numOfToDo.innerText);
    const intNumDone = Number(numOfDone.innerText)
    if(intNumToDo + intNumDone === 0){
        progressCurrent.innerText = "";
        progressCurrent.style.width = `0%`;
    }
    else{
        const percent = Math.floor(intNumDone / (intNumToDo + intNumDone) * 100);
        progressCurrent.innerText = `${percent}% `;
        progressCurrent.style.width = `${percent}% `;
    }

}

function paintNumOfDO(thisCN) {
    if (thisCN === TODOS_CN) {
        numOfToDo.innerText = toDoList.children.length;
    }
    else if (thisCN === DONE_CN) {
        numOfDone.innerText = doneList.children.length;
    }
    paintPercentCompleted();
}

function realDeleteTodo(li, listName) {
    //console.log("START realDeleteToDO");
    //화면상에서 todolist 삭제하기. but TODOS_LS에서는 안사라짐.
    if (listName === TODOS_CN) {
        toDoList.removeChild(li);
        //filter 함수는 array의 모든 아이템을 통해 인자로 넣어주는 사용자함수를 실행하고, 리턴값이 true인 아이템들만 가지고 새로운 배열을 만듬
        const cleanToDos = toDos.filter(function (toDo) {
            //console.log(toDo.id, li.id, toDo.id !== li.id, toDo.id !== parseInt(li.id));
            //li.id 가 string이라서 int로 변경  --> 기존에는 string이라서 int로 바꿨는데, date함수 쓰니 같이 string이라서 원래대로 씀 위에 콘솔 로그참고
            return toDo.id !== li.id;
        });
        //console.log(cleanToDos);
        toDos = cleanToDos;
        saveToDos(listName);
        paintNumOfDO(listName)
    }
    else if (listName === DONE_CN) {
        doneList.removeChild(li);
        const cleanDones = dones.filter(function (toDo) {
            return toDo.id !== li.id;
        });
        dones = cleanDones;
        saveToDos(listName);
        paintNumOfDO(listName)
    }

}
function deleteToDo(event) {
    //console.dir(event);
    //console.dir(event.target);
    const btn = event.target,
        li = btn.parentNode,
        classname = event.path[2].className;
    //console.dir(li);
    //console.log(classname);
    realDeleteTodo(li, classname);
}



function checkTodo(event) {
    //toDo -> Done으로 
    const btn = event.target,
        li = btn.parentNode;
    realDeleteTodo(li, TODOS_CN);
    paintToDo(li.childNodes[1].innerText, li.targetMonth, li.targetDate, DONE_CN);
}
function uncheckTodo(event) {
    const btn = event.target,
        li = btn.parentNode;
    realDeleteTodo(li, DONE_CN);
    paintToDo(li.childNodes[1].innerText, li.targetMonth, li.targetDate, TODOS_CN);
}

function saveToDos(listName) {
    //localStorage.setItem(TODOS_LS,toDos); //근데 localstorage에는 string만 넣을 수 있음. 그래서 jSON.stringify를 사용했음.
    //console.log(listName, listName === TODOS_CN, listName === DONE_CN);
    if (listName === TODOS_CN) {
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //이건 JS의 object를 string으로 바꿔줌.
    }
    if (listName === DONE_CN) {
        //  console.log("HI, here is done List for save");
        //console.log(dones);
        localStorage.setItem(DONE_LS, JSON.stringify(dones)); //이건 JS의 object를 string으로 바꿔줌.
    }
}

function paintToDo(text, targetMonth, targetDate, listName) {
    //console.log(text);
    //console.log("START paintToDo");
    const li = document.createElement("li"); //비어 있는 li 를 만들고
    const checkBtn = document.createElement("i");
    const uncheckBtn = document.createElement("i");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    const spanTarget = document.createElement("span");
    const strikeLine = document.createElement("div");
    //const newId = ++idNum; //****************************id 값이 중복되는 걸 해결해보기!!
    const newId = Date.now().toString() + Math.floor(Math.random() * 100); //현재시간을 string으로 바꾼 값을 넣어줌
    const toDoObj = { //아래는 만들어진 todo를 배열에 넣어서 기억하게 하는것.
        text: text,
        id: newId,
        targetMonth : targetMonth,  //temp*********************************
        targetDate : targetDate    //temp*********************************
    };

    checkBtn.classList.add("far", "fa-circle");
    delBtn.classList.add("fas", "fa-times");
    uncheckBtn.classList.add("far", "fa-check-circle");
    strikeLine.classList.add("strike");
    checkBtn.addEventListener("click", checkTodo);
    uncheckBtn.addEventListener("click", uncheckTodo);
    delBtn.addEventListener("click", deleteToDo);

    
    span.innerText = text;
    spanTarget.innerText = `~${targetMonth+1}/${targetDate<10 ? `0${targetDate}`:targetDate}`;
    li.id = newId;
    li.targetMonth = targetMonth;
    li.targetDate = targetDate;
    spanTarget.classList.add("target");

    

    if (listName === TODOS_CN) {
        
        li.appendChild(checkBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(spanTarget);
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        toDoList.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
        toDos.push(toDoObj);
        saveToDos(toDoList.className);
        paintNumOfDO(listName)
        //지금은 LI 누르면 체크 언체크인데 나중에는 수정 할 수 있게 만들기!!
        //li.addEventListener("click",checkTodo);
        //    console.log(toDoList);
    }
    else if (listName === DONE_CN) {
        //console.log("HI PAINT _ DONE LIST FOR SAVE");
        li.appendChild(uncheckBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(spanTarget);
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        li.appendChild(strikeLine);
        doneList.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
        dones.push(toDoObj);
        saveToDos(doneList.className);
        paintNumOfDO(listName);
        //li.addEventListener("click",uncheckTodo);
    }

}

function handleBlank(e) {
    console.log("enter handleBlank")
    e.target.classList.toggle("applyShake");
}

function handleSubmit(event) {
    event.preventDefault(); //기존에 submit 하면 하는 이벤트 없애주고 submit 하면 새로고침을 해버려서..
    const eClassName = event.target.className;

    if (eClassName === "js-toDoForm") {
        //공백을 입력하면 입력 안되게 막음. 그리고 효과주기
        const currentValue = toDoInput.value;
        const tempMonth = today.getMonth();
        const tempDate = today.getDate();
        if (currentValue === "") {
            handleBlank(event);
        }
        else {
            paintToDo(currentValue, tempMonth, tempDate, toDoList.className);
            toDoInput.value = "";
        }
    }
    else if (eClassName === "js-toDoForm2") {
        const currentValue = toDoInput2.value;
        var td = new Date(todoTargetDate2.value);
        const tempMonth = td.getMonth();
        const tempDate = td.getDate();
        if (currentValue === "") {
            handleBlank(event);
        }
        else {
            paintToDo(currentValue, tempMonth, tempDate, toDoList.className);
            toDoInput2.value = "";
        }
    }
}




function loadToDos() { //처음 딱 새로고침 되었을 때 localstorage에 있는 todo를 화면에 기록해줘야함.
    const loaderDones = localStorage.getItem(DONE_LS);
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); //string으로 만들어진 object를 다시 object로 변환.
        //원래 toDos[]는 비어있으니까. 로컬스토리지에 있는 값들을 여기 toDos[]에 넣어주면서 화면에 뿌릴꺼임. paintToDo 함수 사용
        parsedToDos.forEach(function (toDo) {
            //console.log(toDo.text);
            paintToDo(toDo.text, toDo.targetMonth, toDo.targetDate, toDoList.className);
        });
    }
    if (loaderDones !== null) {
        const parsedDones = JSON.parse(loaderDones); //string으로 만들어진 object를 다시 object로 변환.
        parsedDones.forEach(function (toDo) {
            paintToDo(toDo.text, toDo.targetMonth, toDo.targetDate, doneList.className);
        });
    }
}

function deleteAllDone() {
    if (confirm('Are you sure you want to delete all?')) {
        //all delete done
        console.log('Thing was saved to the database.');
        dones = [];
        doneList.innerHTML = "";
        saveToDos(DONE_CN);
        paintNumOfDO(DONE_CN);
    } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
    }

}
function deleteAllTodo() {
    toDos = [];
    toDoList.innerHTML = "";
    saveToDos(TODOS_CN);
    paintNumOfDO(TODOS_CN);
}

function deleteAll() {
    deleteAllDone();
    deleteAllTodo();
}

function AllCompleted() {
    for (let i = 0; i < toDos.length; i++) {
        paintToDo(toDos[i].text, toDos[i].targetMonth, toDos[i].targetDate, DONE_CN);
    }

    deleteAllTodo();
}

function init() {
    
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    toDoForm2.addEventListener("submit", handleSubmit);
    toDoForm.addEventListener("animationend", handleBlank);
    toDoForm2.addEventListener("animationend", handleBlank);
    //deleteAll button is risky
    //btn_deleteAll.addEventListener("click",deleteAll);
    btn_deleteDone.addEventListener("click", deleteAllDone);
    btn_allCompleted.addEventListener("click", AllCompleted);

}

init();