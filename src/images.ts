import platformSourceImage from './assets/platform.png';
import backgroundSourceImage from './assets/background.png';
import hillsSourceImage from './assets/hills.png';
import platformSmallTallSourceImage from './assets/platformSmallTall.png';
import characterRunLeftSourceImage from './assets/spriteRunLeft.png';
import characterRunRightSourceImage from './assets/spriteRunRight.png';
import characterStandLeftSourceImage from './assets/spriteStandLeft.png';
import characterStandRightSourceImage from './assets/spriteStandRight.png';

const createCanvasImage = function (imageSrc: string): CanvasImageSource {
  const image = new Image();
  image.src = imageSrc;

  return image;
};

// Took benifit of type inference to
// not make the image exporting lines very long
export const platformImage = createCanvasImage(platformSourceImage);
export const backgroundImage = createCanvasImage(backgroundSourceImage);
export const hillsImage = createCanvasImage(hillsSourceImage);
export const platformSmallTall = createCanvasImage(platformSmallTallSourceImage);

export const characterRunLeft = createCanvasImage(characterRunLeftSourceImage);
export const characterRunRight = createCanvasImage(characterRunRightSourceImage);
export const characterStandLeft = createCanvasImage(characterStandLeftSourceImage);
export const characterStandRight = createCanvasImage(characterStandRightSourceImage);
