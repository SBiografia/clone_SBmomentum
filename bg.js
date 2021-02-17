const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber){
    const img = new Image();
    //img.src = `images/${imgNumber+1}.jpg`;
    //img.src = 'https://source.unsplash.com/category/nature/1600x900';
    img.classList.add("bgImage");
    body.appendChild(img);
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    /* 기존에는 저장되어 있는 이미지 5장 중에서 랜덤으로 고르는거였으나.
    const randomNumber = getRandom();
    paintImage(randomNumber);
    */
   /* https://source.unsplash.com/featured/?{KEYWORD},{KEYWORD} 
    ex) https://source.unsplash.com/1600x900/?nature,water */
    //unsplash api 를 이용해서 랜덤으로 가져오는 걸로 바꾸었고, 화면사이즈만 조정해주기로!
    //console.log(window.screen.width, window.screen.height);
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    console.log(screenWidth, screenHeight);
    //${screenWidth}x${screenHeight}
    body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?nature,landscape)`;
    
}
init();