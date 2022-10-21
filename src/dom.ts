import { Dimentions, CanvasAndContext } from './types';

const getCanvasAndContext = function (canvasId: string): CanvasAndContext {
  const canvas: HTMLCanvasElement = document.querySelector(`canvas#${canvasId}`)!;
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

  return {
    canvas,
    ctx,
  };
};

const setCanvasSize = function (canvas: HTMLCanvasElement, canvasSize: Dimentions): void {
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
};

export { getCanvasAndContext, setCanvasSize };
