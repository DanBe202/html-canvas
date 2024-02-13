import {Canvas} from '../elements/canvas.element';
import type {Point} from "@/interfaces/point.interface";

export class PointObject implements Point {
  private _x: number;
  private _y: number;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  draw(): void {
    Canvas.ctx.fillStyle = '#f00';
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(this._x, this._y, 3, 0, 2 * Math.PI);
    Canvas.ctx.fill();
  }
}
