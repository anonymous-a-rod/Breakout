/////// LOAD IMAGES ////////


// BACKGROUND IMAGE
const BG_IMG = new Image();

// GENERATE A RANDOM BACKGROUND IMAGE
let randomNumer = Math.floor(Math.random()*14)

switch(randomNumer){
    case 0:
       BG_IMG.src = "img/cartoon-forest-bg.jpg";
       break;
    case 1:
        BG_IMG.src = "img/african-desert-bg.jpg"; 
        break;
    case 2:
        BG_IMG.src = "img/forest-bg.jpg";
        break;
    case 3:
        BG_IMG.src = "img/cosmic-bg.png";
        break;
    case 4:
        BG_IMG.src = "img/summer-bg.jpg";
        break;
    case 5:
        BG_IMG.src = "img/fantasy-bg.jpg";
        break;
    case 6:
        BG_IMG.src = "img/gothic-bg.jpg";
        break;
    case 7:
        BG_IMG.src = "img/jungle-bg.jpg";
        break;
    case 8:
        BG_IMG.src = "img/naboo-bg.png";
        break;
    case 9:
        BG_IMG.src = "img/nature-bg.jpg";
        break;
    case 10:
        BG_IMG.src = "img/riverside-bg.jpg";
        break;
    case 11:
        BG_IMG.src = "img/town-bg.jpg";
        break;
    case 12:
        BG_IMG.src = "img/tropic-bg.png";
        break;
    case 13:
        BG_IMG.src = "img/winter-bg.jpg";
        break;
    default:
        BG_IMG.src = "img/winter-bg.jpg"
}



const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.png";


/////// END LOAD IMAGES ////////

// ************************ //

/////// LOAD SOUNDS ////////

const WALL_HIT = new Audio();
WALL_HIT.src = "sounds/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "sounds/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sounds/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "sounds/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "sounds/brick_hit.mp3";



/////// END LOAD SOUNDS ////////
