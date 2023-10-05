// parametrar

var game = false;
var p1_count = 0;
var p2_count = 0;
var serves = 0;
var goal1 = document.getElementById("player1_score");
var goal2 = document.getElementById("player2_score");
var go = document.getElementById("gameOver");
//  set up the board
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
//sounds
var wall_sound = new Audio('sound/wall_blip.wav');
wall_sound.volume = 0.5;
var paddle_sound = new Audio('sound/paddle_blip.wav');
paddle_sound.volume = 0.5;
var game_fail = new Audio('sound/game_fail.wav');
game_fail.volume = 0.5;
var game_over = new Audio('sound/game-over.wav');
game_over.volume = 0.5;

config = {
    paddlewidth: 100,
    paddleheight: 10,
    canvasY: 500,
    canvasX: 800,
    winning_score: 11
}


var player1 = {
    x: 10,
    y: 200
};
var player2 = {
    x: config.canvasX - 20,
    y: 200

};
var ball = {
    height: 10,
    width: 10,
    x: 400,
    y: 250,
    speedx: 4,
    speedy: 4
};
function alive() {
    if (serves == 0) {
        goal2.innerHTML = p1_count;
        goal1.innerHTML = String(p2_count);
        go.innerHTML = "";
    }
    if (game == true) {
        game = false;

    } else {
        game = true;
        player1.x = 10;
        player1.y = 200;
        player2.x = config.canvasX - 20;
        player2.y = 200;
        serve();
    }
}

function draw() {
    //rita planen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, config.canvasX, config.canvasY);

    //rita bollen
    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    //rita player1
    ctx.fillStyle = "white";
    ctx.fillRect(player1.x, player1.y, config.paddleheight, config.paddlewidth);

    //rita player2
    ctx.fillStyle = "white";
    ctx.fillRect(player2.x, player2.y, config.paddleheight, config.paddlewidth);

    //rAF gör funktionen draw 30 ggr/sek typ
    requestAnimationFrame(draw);

    /******Kollar förändring på spelplan och uppdaterar parametrar 
     * som används för att rita ut spelet*** */

    //-----> kolla om game fortfarande lever 
    //och om bollen är inom lovligt område på x - axeln
    if (game == true &&
        ball.x < config.canvasX - 15 &&
        ball.x > config.canvasX - 794) {
        playBall(); //-->Vid ok: uppdaterar bollens rörelse

    }
    if (game == true &&
        ball.x >= 786) {
        console.log(ball.x);
        p1_count++;
        goal(goal1, p1_count);
        die();
        game_fail.play();
    }
    if (game == true &&
        ball.x <= 4) {
        console.log(ball.x);
        p2_count++;
        goal(goal2, p2_count);
        die();
        game_fail.play();
    }

    //-----> PLAYER2
    //kolla om game fortfarande lever 
    //och om bollen är på spellinjen för spelare2s paddel
    // och om bollen är inom paddelns område på y-axeln
    if (game == true && ball.x >= 770
        && ball.y > player2.y
        && ball.y < player2.y + 100) {
        bounceX(); //---> I sådant fall: X-leds-studs
        paddle_sound.play();


    }
    //-----> PLAYER1
    //kolla om game fortfarande lever 
    //och om bollen är på spellinjen för spelare1s paddel
    // och om bollen är inom paddelns område på y-axeln
    if (game == true && ball.x <= 20
        && ball.y > player1.y
        && ball.y < player1.y + 100) {
        bounceX(); //---> I sådant fall: X-leds-studs
        paddle_sound.play();
    }
    //-----> kolla om game fortfarande lever 
    //och om bollen når y-axelns topp eller botten (spelets sidor)

    if (game == true &&
        ball.y > config.canvasY - 10 || ball.y < config.canvasY - 490) {
        bounceY();//---> I sådant fall: Y-leds-studs
        wall_sound.play();
    }
}
requestAnimationFrame(draw);

function goal(player, count) {
    var resultat = String(count)
    player.innerHTML = resultat;
    serves++;
    console.log(serves);

    if (count == config.winning_score) {
        gameOver();
    }
}
function serve() {
    ball.x = 400;
    ball.y = Math.floor(Math.random() * 470) + 20;
    wall_sound.play();
    bounceX();

}
function gameOver() {
    goal2.innerHTML = "";
    goal1.innerHTML = "";
    go.innerHTML = "GAME OVER";
    game = false;
    p1_count = 0;
    p2_count = 0;
    serves = 0;
    game_over.play();



}

function die() {
    game = false;

}

function playBall() {
    ball.x += ball.speedx;
    ball.y += ball.speedy;

}
function bounceY() {
    ball.speedy = - ball.speedy;

}
function bounceX() {
    ball.speedx = - ball.speedx;
}



///////////////
//CONTROLLER//
//////////////
document.onkeyup = checkKey;

function checkKey(e) {
    if (e.key == 'w' && player1.y > 0) {
        player1.y -= 80;

    }
    if (e.key == 'e' && player1.y < config.canvasY - 100) {
        player1.y += 80;

    }
    if (e.key == 'o' && player2.y > 0) {
        player2.y -= 80;

    }
    if (e.key == 'p' && player2.y < config.canvasY - 100) {
        player2.y += 80;

    }
    if (e.key == 'g') {
        alive();
    }

}



