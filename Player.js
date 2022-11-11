export default class Player {
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.touchX = "";

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 90;
        this.width = 80;
        this.height = 60;
        this.image = new Image();
        this.image.src = "images/player.png";

        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
        window.addEventListener("touchstart", this.keydown);
        window.addEventListener("touchend", this.keyup);

        window.addEventListener("touchstart", e => {
            this.touchX = e.changedTouches[0].pageX;
        });
        window.addEventListener("touchmove", e => {
            e.preventDefault();
            console.log(e)
            if (this.touchX < this.canvas.width / 2) {
                this.x--, this.x += -this.velocity / 2;
                this.bulletController.shoot(this.x + this.width / 2, this.y, 6, 10);
            }
            if (this.touchX > this.canvas.width / 2) {
                this.x++, this.x += this.velocity / 2;
                this.bulletController.shoot(this.x + this.width / 2, this.y, 6, 10);
            }
        });
    }

    draw(ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width / 2, this.y, 6, 10);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls() {
        //left
        if (this.x < 0) {
            this.x = 0;
        }

        //right
        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
    }

    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    }

    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
        if (event.code == "Space") {
            this.shootPressed = true;
        }
    };

    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
        if (event.code == "Space") {
            this.shootPressed = false;
        }
    };
}