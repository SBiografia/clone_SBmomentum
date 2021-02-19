const form = document.querySelector(".js-name"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    yourName = document.querySelector(".yourName"),
    wiseQuote = document.querySelector(".wiseQuote");
const btn_changeName = document.querySelector("#js-changeName");
const btn_wise = document.querySelector("#js-wise");
const greetingContainer = document.querySelector(".containerGreetings");
const containerIcon = greetingContainer.querySelector(".containerIcon");



const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    SHOWINGWISE_CN = "showingWise";
const quoteList =["Be of good cheer",
        "Do not think of yesterday's failures",
        "You will succeed if you perservere",
        "Hell to be at, Good to be from",
        "From a little spark may burst a flame"
        ];
let shortQuote = [];

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); //Event의 기본동작을 막음. form은 기본적으로 입력 후 enter 누르면 그 값을 어딘가로 보내고 새로고침 하는데 그게 없어짐
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){//currentUser key 값이 없으면 이걸 실행하고
    form.classList.add(SHOWING_CN);
    input.focus();
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){//currentUser key 값이 있으면 이걸 실행함.
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    yourName.classList.add(SHOWING_CN);
    containerIcon.style.display="flex";
    yourName.innerText = `${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //she iss not
        askForName();
    }
    else{
        //she is
        paintGreeting(currentUser);
    }

}
function tryToPreventNewLines(e) {
    //console.log(e.keyCode);
    //console.dir(e.target);
    switch (e.keyCode) {
        case 13:
            //yourName.blur();
            e.target.blur();
            e.preventDefault();
            //yourName.contentEditable = "false";
            e.target.contentEditable = "false";
            if(e.target === yourName){   
                saveName(e.target.innerText);
            } 
            else if(e.target.nodeName === "SPAN"){
                saveToDoContent(e.target);
            }
            return false;
    }
    return true;
}

function changeName(){
    //console.log("start change name");
    //greeting.classList.remove(SHOWING_CN);
    //askForName();
    
    yourName.contentEditable = "true";

    var range = document.createRange();  
    range.selectNodeContents(yourName);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    yourName.focus();  
    
    
    yourName.addEventListener('keydown', tryToPreventNewLines);
    yourName.addEventListener('change', tryToPreventNewLines);
    
}
function showWise(){
    console.log("start show wise saying");
    if(!wiseQuote.classList.contains(SHOWINGWISE_CN)){
        greeting.classList.remove(SHOWING_CN);
        yourName.classList.remove(SHOWING_CN);
        wiseQuote.classList.add(SHOWINGWISE_CN);
        //const ranNum = Math.floor(Math.random() * 5);
        //wiseQuote.innerText = quoteList[ranNum];
        const ranNum = Math.floor(Math.random() * 133);
        wiseQuote.innerText = shortQuote[ranNum].text;
        
        btn_wise.innerText = "Show Name";
        console.dir(wiseQuote);
        console.log(wiseQuote.offsetWidth, wiseQuote.offsetHeight, wiseQuote.style.fontSize);
        
        if(wiseQuote.offsetHeight > 56){
            wiseQuote.style.fontSize = "2.4vw";
        }
    }
    else if(wiseQuote.classList.contains(SHOWINGWISE_CN)){
        wiseQuote.classList.remove(SHOWINGWISE_CN);
        btn_wise.innerText = "Show Quote";
        loadName();
    }

}


function init(){
    loadName();
    btn_changeName.addEventListener("click",changeName);
    btn_wise.addEventListener("click",showWise);

    //로딩 시간을 줄이려고 여기다가 바로 우선 만들어놓음..
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //console.log(data);    
        shortQuote = data.filter(function(qqq){
            return qqq.text.length < 40;
        }); //133개
        console.log(shortQuote);
        
    });
    

}

init();