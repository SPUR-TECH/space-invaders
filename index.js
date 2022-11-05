import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


canvas.width = 1000;
canvas.height = 600;

const background = new Image();
background.src = 'images/background.jpg';

const playerBulletController = new BulletController(canvas, 6, "brown", true);
const enemyController = new EnemyController(canvas);
const player = new Player(canvas, 3, playerBulletController);


function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
}

setInterval(game, 1000 / 60);