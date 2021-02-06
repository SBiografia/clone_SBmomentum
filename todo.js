const toDoForm = document.querySelector(".js-toDoForm")
    toDoForm2 = document.querySelector(".js-toDoForm2"),
    toDoInput = toDoForm.querySelector("input"),
    toDoInput2 = toDoForm2.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-DoneList");
const btn_deleteAll = document.querySelector("#deleteAll"),
    btn_deleteDone = document.querySelector("#deleteDone");

const TODOS_LS = "toDoList";
const DONE_LS = "doneList";
//todo를 삭제하고 나면 교체해줘야되니. let으로 바꿨음
let toDos = [];
let dones =[];
let idNum = 0;

function realDeleteTodo(li, listName){
    //console.log("START realDeleteToDO");
        //화면상에서 todolist 삭제하기. but TODOS_LS에서는 안사라짐.
        if(listName === "js-toDoList"){
            toDoList.removeChild(li);
                    //filter 함수는 array의 모든 아이템을 통해 인자로 넣어주는 사용자함수를 실행하고, 리턴값이 true인 아이템들만 가지고 새로운 배열을 만듬
              const cleanToDos = toDos.filter(function(toDo){
            //console.log(toDo.id, li.id, toDo.id !== li.id, toDo.id !== parseInt(li.id));
            //li.id 가 string이라서 int로 변경  --> 기존에는 string이라서 int로 바꿨는데, date함수 쓰니 같이 string이라서 원래대로 씀 위에 콘솔 로그참고
            return toDo.id !== li.id;
            });  
            //console.log(cleanToDos);
            toDos = cleanToDos;
            saveToDos(listName);
        }
        else if(listName === "js-DoneList"){
            doneList.removeChild(li);
            const cleanDones = dones.filter(function(toDo){
                return toDo.id !== li.id;
            });  
                dones = cleanDones;
                saveToDos(listName);
        }
         
}
function deleteToDo(event){
    //console.dir(event);
    //console.dir(event.target);
    const btn = event.target,
    li = btn.parentNode,
    classname = event.path[2].className;
    //console.dir(li);
    //console.log(classname);
    realDeleteTodo(li, classname);
}

function checkTodo(event){
    //toDo -> Done으로 
    const btn = event.target,
    li = btn.parentNode;
    realDeleteTodo(li, "js-toDoList");
    //doneList.appendChild(li); //그냥 단순히 붙여넣으면 안됨. 체크 언체크가 섞이게 되니까.
    paintToDo(li.childNodes[1].innerText,"js-DoneList");
}
function uncheckTodo(event){
    const btn = event.target,
    li = btn.parentNode;    
    realDeleteTodo(li, "js-DoneList");
    paintToDo(li.childNodes[1].innerText,"js-toDoList");
}

function saveToDos(listName){
    //localStorage.setItem(TODOS_LS,toDos); //근데 localstorage에는 string만 넣을 수 있음. 그래서 jSON.stringify를 사용했음.
    //console.log(listName, listName === "js-toDoList", listName === "js-DoneList");
    if(listName === "js-toDoList"){
        localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //이건 JS의 object를 string으로 바꿔줌.
    }
    if(listName === "js-DoneList"){
      //  console.log("HI, here is done List for save");
        //console.log(dones);
        localStorage.setItem(DONE_LS,JSON.stringify(dones)); //이건 JS의 object를 string으로 바꿔줌.
    }
}

function paintToDo(text, listName){
    //console.log(text);
    //console.log("START paintToDo");
    const li = document.createElement("li"); //비어 있는 li 를 만들고
    const checkBtn = document.createElement("i");
    const uncheckBtn = document.createElement("i");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    const strikeLine = document.createElement("div");
    //const newId = ++idNum; //****************************id 값이 중복되는 걸 해결해보기!!
    const newId = Date.now().toString() + Math.floor(Math.random()*100); //현재시간을 string으로 바꾼 값을 넣어줌
    const toDoObj = { //아래는 만들어진 todo를 배열에 넣어서 기억하게 하는것.
        text: text,
        id: newId
    };

    checkBtn.classList.add("far", "fa-circle");
    delBtn.classList.add("fas", "fa-times");
    uncheckBtn.classList.add("far","fa-check-circle");
    strikeLine.classList.add("strike");
    checkBtn.addEventListener("click",checkTodo);
    uncheckBtn.addEventListener("click",uncheckTodo);
    delBtn.addEventListener("click",deleteToDo);

    span.innerText = text;
    li.id = newId;


    
    if(listName === "js-toDoList"){
        li.appendChild(checkBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        toDoList.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
        toDos.push(toDoObj);
        saveToDos(toDoList.className);
        //지금은 LI 누르면 체크 언체크인데 나중에는 수정 할 수 있게 만들기!!
        //li.addEventListener("click",checkTodo);
    //    console.log(toDoList);
    }
    else if(listName ==="js-DoneList"){
        //console.log("HI PAINT _ DONE LIST FOR SAVE");
        li.appendChild(uncheckBtn);
        li.appendChild(span); //li에다가 span과 
        li.appendChild(delBtn); //del 버튼을 넣어줬음
        li.appendChild(strikeLine);
        doneList.appendChild(li); //appendChild는 특정 요소를 부모한테 넣는걸 말함.
        dones.push(toDoObj);
        saveToDos(doneList.className);
        //li.addEventListener("click",uncheckTodo);
    }
    



}

function handleSubmit(event){
    
    event.preventDefault(); //기존에 submit 하면 하는 이벤트 없애주고 submit 하면 새로고침을 해버려서..
    const eClassName = event.target.className;

    if(eClassName === "js-toDoForm"){
        const currentValue = toDoInput.value; 
        //console.log(toDoList);
        paintToDo(currentValue, toDoList.className);
        toDoInput.value = "";
    }
    else if(eClassName === "js-toDoForm2"){
        const currentValue = toDoInput2.value; 
        paintToDo(currentValue, toDoList.className);
        toDoInput2.value = "";
    }
}

function loadToDos(){ //처음 딱 새로고침 되었을 때 localstorage에 있는 todo를 화면에 기록해줘야함.
    const loaderDones = localStorage.getItem(DONE_LS);
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //string으로 만들어진 object를 다시 object로 변환.
        //원래 toDos[]는 비어있으니까. 로컬스토리지에 있는 값들을 여기 toDos[]에 넣어주면서 화면에 뿌릴꺼임. paintToDo 함수 사용
        parsedToDos.forEach(function(toDo){
            //console.log(toDo.text);
            paintToDo(toDo.text, toDoList.className);
        });
    }
    if(loaderDones !== null){
        const parsedDones = JSON.parse(loaderDones); //string으로 만들어진 object를 다시 object로 변환.
        parsedDones.forEach(function(toDo){
            paintToDo(toDo.text, doneList.className);
        });
    }
}
function deleteAllDone(){
    dones =[];
    doneList.innerHTML="";
    saveToDos("js-DoneList");

}
function deleteAllTodo(){
    toDos=[];
    toDoList.innerHTML="";
    saveToDos("js-toDoList");
}

function deleteAll(){
    deleteAllDone();
    deleteAllTodo();
}

function init(){
    
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
    toDoForm2.addEventListener("submit",handleSubmit);
    btn_deleteAll.addEventListener("click",deleteAll);
    btn_deleteDone.addEventListener("click",deleteAllDone);

}
init();