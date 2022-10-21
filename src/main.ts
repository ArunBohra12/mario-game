import { Dimentions } from './types';

import Player from './player';
import Platform from './platform';
import { getCanvasAndContext, setCanvasSize } from './dom';

// Images
import { platformImage, platformSmallTall, backgroundImage, hillsImage } from './images';
import GenericObject from './genericObject';

const canvasSize: Dimentions = {
  width: 1024,
  height: 576,
};

const keys = {
  right: { isPressed: false },
  left: { isPressed: false },
};

const { canvas, ctx: canvasContext } = getCanvasAndContext('canvas');
setCanvasSize(canvas, canvasSize);

let player: Player = new Player(canvas, canvasContext);
let platforms: Array<Platform> = [];
let genericObjects: Array<GenericObject> = [];
let scrollOffset: number = 0;

const init = function (): void {
  player = new Player(canvas, canvasContext);

  platforms = [
    new Platform(canvasContext, { x: Number(platformImage.width) * 6 - 5, y: 270 }, platformSmallTall),

    new Platform(canvasContext, { x: -1, y: 470 }, platformImage),
    new Platform(canvasContext, { x: Number(platformImage.width) - 3, y: 470 }, platformImage),
    new Platform(canvasContext, { x: Number(platformImage.width) * 2 + 100, y: 470 }, platformImage),
    new Platform(canvasContext, { x: Number(platformImage.width) * 3 + 300, y: 470 }, platformImage),
    new Platform(canvasContext, { x: Number(platformImage.width) * 4, y: 470 }, platformImage),
    new Platform(canvasContext, { x: Number(platformImage.width) * 5 - 3, y: 470 }, platformImage),
    new Platform(canvasContext, { x: Number(platformImage.width) * 6 - 5, y: 470 }, platformImage),
  ];

  genericObjects = [
    new GenericObject(canvasContext, { x: -1, y: -1 }, backgroundImage),
    new GenericObject(canvasContext, { x: 0, y: 0 }, hillsImage),
  ];

  scrollOffset = 0;
};

const animate = function (): void {
  requestAnimationFrame(animate);
  canvasContext.fillStyle = '#fff';
  canvasContext.fillRect(0, 0, canvasSize.width, canvasSize.height);

  genericObjects.forEach(genericObject => genericObject.draw());
  platforms.forEach(platform => platform.draw());
  player.update();

  if (keys.right.isPressed && player.position.x < 400) player.velocity.x = player.speed;
  else if (
    (keys.left.isPressed && player.position.x >= 100) ||
    (keys.left.isPressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.isPressed) {
      scrollOffset += player.speed;
      platforms.forEach(platform => {
        platform.position.x -= player.speed;
      });

      genericObjects.forEach(genericObject => {
        genericObject.position.x -= player.speed * 0.25;
      });
    }

    if (keys.left.isPressed && scrollOffset > 0) {
      scrollOffset -= player.speed;

      platforms.forEach(platform => {
        platform.position.x += player.speed;
      });

      genericObjects.forEach(genericObject => {
        genericObject.position.x += player.speed * 0.25;
      });
    }

    // WIN CONDITION
    if (scrollOffset > 20000) {
      console.log('YOU WIN!!!');
    }

    // LOSE CONDITION
    if (player.position.y > canvas.height) {
      console.log('YOU LOSE!!!');
      init();
    }
  }

  platforms.forEach(platform => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    )
      player.velocity.y = 0;
  });
};

init();
animate();

window.addEventListener('keydown', function ({ code }: KeyboardEvent) {
  switch (code) {
    case 'ArrowUp':
      player.velocity.y -= 18;
      break;

    case 'ArrowLeft':
      keys.left.isPressed = true;
      break;

    case 'ArrowRight':
      keys.right.isPressed = true;
      player.currentSprite = player.sprites.run.right;
      player.currentSpriteCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;
  }
});

player.currentSprite = player.sprites.run.right;
player.currentSpriteCropWidth = player.sprites.run.cropWidth;
player.width = player.sprites.run.width;

window.addEventListener('keyup', function ({ code }: KeyboardEvent) {
  switch (code) {
    case 'ArrowUp':
      player.velocity.y = 0;
      break;

    case 'ArrowLeft':
      keys.left.isPressed = false;
      break;

    case 'ArrowRight':
      keys.right.isPressed = false;
      break;
  }
});
