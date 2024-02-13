import type {Point} from "@/interfaces/point.interface";
import type { Canvas } from '@/scenes/common/elements/canvas.element';
import { Colors } from '@/scenes/common/colors';

export class PointObject implements Point {
  private _x: number;
  private _y: number;
  private readonly _fillStyle: string | CanvasGradient | CanvasPattern;

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

  constructor(public readonly canvas: Canvas, x: number, y: number, fillStyle: string | CanvasGradient | CanvasPattern = Colors.FireEngineRed) {
    this._x = x;
    this._y = y;
    this._fillStyle = fillStyle;
  }

  draw(): void {
    this.canvas.ctx.fillStyle = this._fillStyle;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(this._x, this._y, 3, 0, 2 * Math.PI);
    this.canvas.ctx.fill();
  }
}
