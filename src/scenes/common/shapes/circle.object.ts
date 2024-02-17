import type { Canvas } from '@/scenes/common/elements/canvas.element';

export class CircleObject {
  private _x: number;
  private _y: number;
  private _r: number;
  private _stroke: string | undefined;
  private _fill: string | undefined;

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get radius(): number {
    return this._r;
  }

  set radius(r: number) {
    this._r = r;
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }

  constructor(
    public readonly canvas: Canvas,
    x: number,
    y: number,
    r: number,
    stroke?: string,
    fill?: string
  ) {
    this._x = x;
    this._y = y;
    this._r = r;
    this._stroke = stroke;
    this._fill = fill;
  }

  draw(): void {
    if (this._stroke) {
      this.canvas.ctx.strokeStyle = this._stroke;
    }
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
    if (this._fill) {
      this.canvas.ctx.fillStyle = this._fill;
      this.canvas.ctx.fill();
    }
    this.canvas.ctx.stroke();
  }

  public setCenter(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }
}
