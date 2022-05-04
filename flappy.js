let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let ongtren = new Image();
let ongduoi = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
ongtren.src = "pipeNorth.png";
ongduoi.src = "pipeSouth.png";


// some variables

let gap = 120;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();
let lose = new Audio();

fly.src = "fly.mp3";
scor.src = "score.mp3";
lose.src = "lose.mp3";

// on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 35;
    fly.play();
}

// pipe coordinates

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// draw images

function draw() {

    ctx.drawImage(bg, 0, 0);


    for (let i = 0; i < pipe.length; i++) {

        constant = ongtren.height + gap;
        ctx.drawImage(ongtren, pipe[i].x, pipe[i].y);
        ctx.drawImage(ongduoi, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: (Math.random() * ongtren.height) - ongtren.height
            });
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + ongtren.width && (bY <= pipe[i].y + ongtren.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
                lose.play();
              location.reload();

        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#FF0000";
    ctx.font = "30px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);


}

draw();























