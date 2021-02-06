//const title = document.getElementById("title");
const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

console.log(title);

title.innerHTML = "change H1 from JS!!!";
console.dir(title);

document.title = "title changes form JS";




/*
function handleResize(){
    console.log("I have been resized");
}
window.addEventListener("resize", handleResize);


function handleClick(){
    //console.log(title.style.color);
    const CURRENT_H1_COLOR = title.style.color;
     
    if(CURRENT_H1_COLOR === BASE_COLOR){
        title.style.color = OTHER_COLOR;
    } else {
        title.style.color = BASE_COLOR;
    }
       
}
*/

function handleClick(){
    //const currentClass = title.className;
    const hasClass = title.classList.contains(CLICKED_CLASS);
    
    //But 이런 식으로 class 이름을 바꾸어서 뭔가를 한다면 기존에 class 이름으로 적용한 css스타일들은 모조리 사라지게 되는 것임!
    //그래서 한 번에 이것들을 다 바꿔주자!!  주석처리한게 바꾼거임
    if(!hasClass){
        //title.className = CLICKED_CLASS;
        title.classList.add(CLICKED_CLASS);
    } else{
        //title.className = ""
        title.classList.remove(CLICKED_CLASS);
    }
    // -> 근데 이 모든 걸 요약해서 아래 toggle 메소드로 해결해버림..ㄸ
    //title.classList.toggle(CLICKED_CLASS);
}


function init(){
    title.addEventListener("click",handleClick);
}


init();