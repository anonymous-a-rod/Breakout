// SELECT CANVAS ELEMENT 
const canvas = document.getElementById("breakout");
const context = canvas.getContext("2d");

// ADD BORDER TO CANVAS
canvas.style.border = "2px solid #0ff";
context.lineWidth = 2;

// GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3; // PLAYER STARTING LIVES
let SCORE = 0;
let SCORE_UNIT = 10;
let LEVEL_BONUS = 50;
let LEVEL = 1;
const MAX_LEVEL = 50;
let GAME_OVER = false;
let leftArrow = false;
let rightArrow = false;
let Space = false;
let paused = true;



// CREATE THE PADDLE
const paddle = {
    x : canvas.width/2 - PADDLE_WIDTH/2,
    y : canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx : 5
}

// DRAW PADDLE
function drawPaddle(){
    context.fillStyle = "#2e3548";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    context.strokeStyle = "#ffcd05";
    context.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE   
document.addEventListener("keydown", function(event){ 
    if(!paused){
    if((event.key == "ArrowLeft") || (event.key == "a")){
        leftArrow = true;
    } else if ((event.key == "ArrowRight")  || (event.key == "d")){
        rightArrow = true;
    }
    }

});

document.addEventListener("keyup", function(event){
    if((event.key == "ArrowLeft") || (event.key == "a")){
        leftArrow = false;
    } else if ((event.key == "ArrowRight")  || (event.key == "d")){
        rightArrow = false;
    }
});


// MOVE PADDLE
function movePaddle(){
    if(!paused){
    if(leftArrow == true && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
    if(rightArrow == true && paddle.x < canvas.width - PADDLE_WIDTH) {
        paddle.x += paddle.dx;
    }
    }
}

// CONST THE BALL
const ball = {
    x : canvas.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS, 
    speed : 4,
    dx : 3*(Math.random()*2 -1),
    dy : -3,
}

// DRAW THE BALL
function drawBall(){
    context.beginPath();

    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI *2);
    context.fillStyle = "#ffcd05";
    context.fill();

    context.strokeStyle = "#2e3548";
    context.stroke();

    context.closePath();
}



// EVENT LISTENER FOR PAUSE KEYS
document.addEventListener("keydown", function(event) {
if (event.key == " ") // SPACEBAR KEY
{
    togglePause();
}
});

// INSTRUCTIONS TO TOGGLE ON / OFF 
let instructions = document.getElementById("instructions");

// PAUSE THE GAME
function togglePause(){
    if (!paused){  
        paused = true;
        if(!GAME_OVER){
         instructions.style.display = "flex";   
        }
        
    } else if (paused)
    {
       paused = false;
       instructions.style.display = "none";
    }
}


// MOVE THE BALL
function moveBall(){
    if(!paused){
    ball.x += ball.dx;
    ball.y += ball.dy;
    }
}

// BALL AND WALL COLLISION DETECTION SENSOR
function ballWallCollision(){
    if(ball.x + ball.radius > canvas.width){
        ball.x = canvas.width - ball.radius;
        ball.dx *= -1;
        WALL_HIT.play();
    }
    if(ball.y - ball.radius < 0){
        ball.y = ball.radius;
        ball.dy *= -1;
        WALL_HIT.play();
    }
    if(ball.x - ball.radius < 0){
        ball.x = ball.radius;
        ball.dx *= -1;
        WALL_HIT.play();
    }
    if(ball.y - ball.radius > canvas.height+BALL_RADIUS*2){
        LIFE--; // LOSE LIFE
        LIFE_LOST.play();
        resetBall();
    }
}

// RESET THE BALL
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = (ball.speed-1)*(Math.random()*2 -1);
    ball.dy = -(ball.speed)+1;
}


// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x > paddle.x && ball.x < paddle.x + paddle.width  && ball.y > paddle.y && ball.y < paddle.y + paddle.height){
 
        // PLAY SOUND
        PADDLE_HIT.play();

        //  CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width/2);

        //   NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width/2);

        // CALCULATE THE ANGLE OF THE BALL
        let angle = collidePoint * Math.PI/3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// CREATE BRICKS
const brick = {
    row : 1,
    column : 10,
    width : 55,
    height : 20,
    offSetLeft : 10,
    offSetTop : 10,
    marginTop : 40,
    fillColor : "#2e3548",
    rowColor0 : "#de5d8d",
    rowColor1 : "#ee4948",
    rowColor2 : "#dd6f30",
    rowColor3 : "#e4b806",
    rowColor4 : "#45b240",
    rowColor5 : "#363bd8",
    rowColor6 : "#8c49f6",
    rowColor7 : "#05d5d1",
    strokeColor : "#FFF"
}

let bricks = [];

function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}

createBricks();

// DRAW THE BRICKS
function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // IF THE BRICK IS NOT BROKEN
            if(b.status){
                switch(r){
                    case 0:
                        context.fillStyle = brick.rowColor0;
                        break;
                    case 1:
                        context.fillStyle = brick.rowColor1;
                        break;
                    case 2:
                        context.fillStyle = brick.rowColor2;
                        break;
                    case 3:
                        context.fillStyle = brick.rowColor3;
                        break;
                    case 4:
                        context.fillStyle = brick.rowColor4;
                        break;
                    case 5:
                        context.fillStyle = brick.rowColor5;
                        break;
                    case 6:
                        context.fillStyle = brick.rowColor6;
                        break;
                    case 7:
                        context.fillStyle = brick.rowColor7;
                        break;
                    default:
                        context.fillStyle = brick.fillColor;
                        break;
                }

                context.fillRect(b.x, b.y, brick.width, brick.height);

                context.strokeStyle = brick.strokeColor;
                context.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

// BALL BRICK COLLISION
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // IF THE BRICK IS NOT BROKEN
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    BRICK_HIT.play();
                    ball.dy *= -1;
                    b.status = false; // BRICK IS BROKEN
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}

//SHOW GAME STATS
function showGameStats(text, textX, textY, img, imgX, imgY){
    // DRAW TEXT 
    context.fillStyle = "#FFF";
    context.font = "25px Germania One";
    context.fillText(text, textX, textY);

    // DRAW IMAGE
    context.drawImage(img, imgX, imgY, width = 25 , height = 25);
}

// DRAW FUNCTION
function draw(){
    drawPaddle();

    drawBall();

    drawBricks();

    // SHOW SCORE
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
    // SHOW LIVES
    showGameStats(LIFE, canvas.width - 25, 25, LIFE_IMG, canvas.width-55, 5);
    // SHOW LEVEL
    showGameStats(LEVEL, canvas.width/2, 25, LEVEL_IMG, canvas.width/2 - 30, 5);
}

// GAME OVER
function gameOver(){
    if(LIFE <= 0){
        showYouLose();
        GAME_OVER = true;
    }
}

// LEVEL UP
function levelUp(){
    let isLevelDone = true;
    
    // CHECK IS ALL
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }
    
    if(isLevelDone){
        WIN.play();
        
        SCORE += LEVEL_BONUS * LEVEL; 
        if(LEVEL >= MAX_LEVEL){
            showYouWon();
            GAME_OVER = true;
            return;
        }
        if(LEVEL <= 8){
            brick.row++;
            createBricks();
        }

        ball.speed += 0.3;
        resetBall();
        LEVEL++;
    }
}

// UPDATE GAME FUNCTION
function update() {
    
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();

    ballBrickCollision();

    levelUp();

    gameOver();
}

// GAME LOOP
function loop(){
    // CLEAR THE CANVAS
    context.drawImage(BG_IMG, 0, 0, canvas.width, canvas.height);

    draw();

    update();

    if(! GAME_OVER){
        requestAnimationFrame(loop);  
    }   
}

loop();

// SELECT SOUND ELEMENT 
const soundElement = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager() {
    // CHANGE IMAGE SOUND_ON/OFF
    let imgSrc = soundElement.getAttribute("src");
    let SOUND_IMG = imgSrc == "img/SOUND_ON.png"? "img/SOUND_OFF.png" : "img/SOUND_ON.png";

    soundElement.setAttribute("src", SOUND_IMG);

    // MUTE AND UN MUTE SOUND
    WALL_HIT.muted = WALL_HIT.muted? false : true;
    PADDLE_HIT.muted = PADDLE_HIT.muted? false : true;
    BRICK_HIT.muted = BRICK_HIT.muted? false : true;
    WIN.muted = WIN.muted? false : true;
    LIFE_LOST.muted = LIFE_LOST.muted? false : true;
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youwon");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

// SHOW YOU WIN
function showYouWon(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}

// SHOW YOU LOSE
function showYouLose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}


// SELECT ELEMENTS
const maxScreen = document.getElementById("maxScreen")
const minScreen = document.getElementById("minScreen")
const gameDisplay = document.getElementById("game")


// LARGE SCREEN ONCLICK
function maximizeScreen(){
    
    if (window.innerWidth > 1155 && window.innerHeight > 875){
        maxScreen.style.display = "none";
        minScreen.style.display = "block";
       gameDisplay.style.transform = "scale(1.75)"; 
    }
}

// SMALL SCREEN ONCLICK
function minimizeScreen(){
    maxScreen.style.display = "block";
    minScreen.style.display = "none";
    gameDisplay.style.transform = "scale(1.0)";
}



// SCALE BASED ON SCREEN SIZE

let outer = document.getElementById('outer'),
        wrapper = document.getElementById('wrap'),
        maxWidth  = outer.clientWidth,
        maxHeight = outer.clientHeight;
window.addEventListener("resize", resize);
resize();
function resize(){let scale,
    width = window.innerWidth,
  height = window.innerHeight,
  isMax = width >= maxWidth && height >= maxHeight;

    scale = Math.min(width/maxWidth, height/maxHeight);
    outer.style.transform = isMax?'':'scale(' + scale + ')';
    wrapper.style.width = isMax?'':maxWidth * scale;
    wrapper.style.height = isMax?'':maxHeight * scale;
}




