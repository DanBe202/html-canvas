import {Canvas} from '../elements/canvas.element';

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

  constructor(x: number, y: number, r: number, stroke?: string, fill?: string) {
    this._x = x;
    this._y = y;
    this._r = r;
    this._stroke = stroke;
    this._fill = fill;
  }

  draw(): void {
    if (this._stroke) {
      Canvas.ctx.strokeStyle = this._stroke;
    }
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
    if (this._fill) {
      Canvas.ctx.fillStyle = this._fill;
      Canvas.ctx.fill();
    }
    Canvas.ctx.stroke();
  }
}
