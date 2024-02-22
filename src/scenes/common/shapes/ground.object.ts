import type { Canvas } from '@/scenes/common/elements/canvas.element';
import type { Colors } from '@/scenes/common/colors';

export class GroundObject {
  private readonly _height: number;
  private readonly _background: Colors;

  constructor(
    private readonly canvas: Canvas,
    height: number,
    background: Colors,
  ) {
    this._height = height;
    this._background = background;
  }

  get height(): number {
    return this._height;
  }

  public draw(): void {
    this.canvas.ctx.fillStyle = this._background;
    const height = this.canvas.height - this._height;
    this.canvas.ctx.fillRect(0, height, this.canvas.width, height);
  }
}
