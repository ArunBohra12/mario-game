import { Coordinate, Velocity } from './types';
import { characterRunLeft, characterRunRight, characterStandLeft, characterStandRight } from './images';

const gravity: number = 0.5;

class Player {
  position: Coordinate = {
    x: 100,
    y: 100,
  };

  width: number = 66;
  height: number = 150;

  velocity: Velocity = {
    x: 0,
    y: 0,
  };

  image: CanvasImageSource = characterStandRight;
  frames: number = 0;

  readonly speed: number = 10;

  sprites = {
    stand: {
      right: characterStandRight,
      cropWidth: 177,
      width: 66,
    },
    run: {
      right: characterRunRight,
      cropWidth: 341,
      width: 80,
    },
  };

  currentSprite = characterStandRight;
  currentSpriteCropWidth: number = this.sprites.stand.cropWidth;

  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {}

  draw() {
    const ctx = this.ctx;

    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.currentSprite,
      // cropping the image start
      this.currentSpriteCropWidth * this.frames,
      0,
      this.currentSpriteCropWidth,
      400,
      // cropping the image end
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames === 59 && this.currentSprite === this.sprites.stand.right) this.frames = 0;
    else if (this.frames > 29 && this.currentSprite === this.sprites.run.right) this.frames = 0;

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

export default Player;
