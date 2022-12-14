let inputDir={x: 0,y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');


let speed=12;
let lastPaintTime=0;
let snakeArr=[
    {x:9,y:9}
];
food={x:6,y:7}
let score =0;

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
     lastPaintTime=ctime;
     gameEngine();
}




function isCollide(snake){
     // if snake bump into itself
    for(let i=1;i<snakeArr.length;i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
        }
        if(snake[0].x >=26 || snake[0].x <=0 || snake[0].y>=26 || snake[0].y<=0){
           return  true;
        }
        return false;

}








function gameEngine(){
    // upadting the snake and food
    musicSound.play();
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play again!");

        snakeArr=[{x:9,y:9}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score: "+score;

    }
    // if youo eaten thye foood increment the score and regenerate the food
    if(snakeArr[0].y===food.y  && snakeArr[0].x===food.x){
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        if(score>hiscore){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            high.innerHTML = "High Score: " + hiscoreval;
        }

        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+ inputDir.y});
        let a=2;
        let b=24;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};


    }
    //move the snake
     for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
     }
     snakeArr[0].x+=inputDir.x;
     snakeArr[0].y+=inputDir.y;

    // Display the snake
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');    //new element
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement=document.createElement('div');    //new element
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


};





window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}   // start the game
    moveSound.play();
    switch(e.key){


    case "ArrowUp":
        console.log("Arrowup");
        inputDir.x=0;
        inputDir.y=-1;
        break;
    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;
    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x=-1;
        inputDir.y=0;
        break;
    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;
default:
    break;
    }
});
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    high.innerHTML = "High Score: " + hiscore;
}
