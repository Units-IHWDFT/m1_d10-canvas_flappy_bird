class Game {
  constructor(ctx, player, background, obstacles) {
    this.ctx = ctx;
    this.player = player;
    this.background = background;
    this.obstacles = obstacles;
    this.frameNumber = 0;
    this.score = 0;

    document.addEventListener("keydown", (event) => {
      this.onKeyDown(event.keyCode);
    });
  }

  start() {
    this.init();
    this.play();
  }

  init() {
    if(this.frameNumber) this.stop()
    this.frameNumber = 0;
    this.background.init()
    this.obstacles.init()
    this.player.init()
    // this.sound.init() etc..
  }

  play() {
    this.move();
    this.draw();
    if (this.checkCollisions()) this.gameOver();
    if (this.frameNumber !== null) {
      this.frameNumber = requestAnimationFrame(this.play.bind(this));
    }
  }

  stop() {
    cancelAnimationFrame(this.frameNumber);
    this.frameNumber = null;
  }

  onKeyDown(keyCode) {
    this.player.flyUp();
  }
  move() {
    this.background.move(this.frameNumber);
    this.obstacles.move(this.frameNumber);
    this.player.move(this.frameNumber);
  }

  draw() {
    this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.background.draw(this.frameNumber);
    this.obstacles.draw(this.frameNumber);
    this.player.draw(this.frameNumber);
    this.drawScore();
  }

  checkCollisions() {
    let collisions = false;

    if (
      this.obstacles.objects.some((obstacle) =>
        this.player.collidesWith(obstacle)
      )
    ) {
      collisions = true;
    }

    if (this.player.exitsCanvas()) collisions = true;


    return collisions;
  }

  drawScore() {
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.font = " bold 24px sans-serif";
    this.ctx.fillText(`Score: ${this.score} pts`, 20, 40);
    this.ctx.restore();
  }

  gameOver() {
    this.stop();
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 32px sans-serif";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    this.ctx.restore();
  }
}
