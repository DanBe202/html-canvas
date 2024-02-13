import { Canvas } from '@/scenes/common/elements/canvas.element';

export abstract class BaseScene {
  public readonly canvas: Canvas;

  protected constructor(root: string, width: number, height: number) {
    this.canvas = new Canvas(root, width, height);
  }

  protected abstract _draw(): void;

  start(): void {
    this.canvas.setup();
    window.requestAnimationFrame(this._redraw.bind(this));
  }

  private _redraw() {
    this._draw();
    window.requestAnimationFrame(this._redraw.bind(this));
  }
}
