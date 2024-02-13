import { Canvas } from '@/scenes/common/elements/canvas.element';

export abstract class BaseScene {

  protected constructor(width: number, height: number) {
    Canvas.init('main-canvas', width, height);
  }

  protected abstract _draw(): void;

  start(): void {
    window.requestAnimationFrame(this._redraw.bind(this));
  }

  private _redraw() {
    this._draw();
    window.requestAnimationFrame(this._redraw.bind(this));
  }
}