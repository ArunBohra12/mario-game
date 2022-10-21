import { Coordinate } from './types';

class Platform {
  width: number;
  height: number;

  constructor(private ctx: CanvasRenderingContext2D, public position: Coordinate, public image: CanvasImageSource) {
    this.width = Number(this.image.width);
    this.height = Number(this.image.height);
  }

  draw() {
    const ctx = this.ctx;

    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

export default Platform;
