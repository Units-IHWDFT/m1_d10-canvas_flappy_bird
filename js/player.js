class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 46;
    this.height = 32;

    // --- position ---
    this.x = 100;
    this.y = 100;

    // --- acceleration ---
    this.vy = 0;
    this.ay = 0.1;

    this.img = new Image();
    this.img.src = "images/flappy-sprite.png";

    // sprites image definition
    this.spriteColumns = 3;
    this.spriteRows = 1;

    // counters to navigate in the image
    this.spriteCol = 0;
    this.spriteRow = 0;
    this.spriteX = 0
    this.spriteY = 0
  }

  init(){
    this.x = 100;
    this.y = 100;
    this.vy = 0;
    this.spriteCol = 0;
    this.spriteRow = 0;
    this.spriteX = 0
    this.spriteY = 0
  }

  move() {
    // --- only move y coordinate in gravity filed ---
    this.vy += this.ay;
    this.y += this.vy;
  }

  // every 10 tiks, show the following frame, if is the last frame, start again.
  setSpriteFrame(frameNumber) {
    if (frameNumber % 10 === 0) {
      this.spriteCol += 1;

      if (this.spriteCol >= this.spriteColumns) {
        this.spriteCol = 0;
      }
      this.spriteX = (this.width * this.spriteCol) // the x of the current sprite in the image
      this.spriteY = (this.height * this.spriteRow) // the y of the current sprite in the image
    }
  }

  flyUp() {
      this.vy = -3.5;
  }

  draw(frameNumber) {
    this.setSpriteFrame(frameNumber);
    this.ctx.drawImage(
      this.img,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x, // the x-axis coordinate in the destination canvas
      this.y, // the y-axis coordinate in the destination canvas
      this.width, // allows scaling of the drawn image
      this.height // allows scaling of the drawn image
    );
  }

  collidesWith(object) {
     return (this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y)
  }

  exitsCanvas() {
    return this.y > this.ctx.canvas.height || this.y + this.height < 0;
  }
}
