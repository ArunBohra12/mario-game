import Platform from './platform';
import { Coordinate } from './types';

class GenericObject extends Platform {
  constructor(ctx: CanvasRenderingContext2D, position: Coordinate, image: CanvasImageSource) {
    super(ctx, position, image);
  }
}

export default GenericObject;
