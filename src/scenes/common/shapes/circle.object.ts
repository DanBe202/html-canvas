import type { Canvas } from '@/scenes/common/elements/canvas.element';
import { Angle } from '@/scenes/common/geometry/angle';
import { Colors } from '@/scenes/common/colors';
import type { Point } from '@/interfaces/point.interface';

export class CircleObject {
  private readonly _angle: Angle = new Angle(270);
  private readonly _stroke: string;
  private _asset: CanvasImageSource | undefined;
  private _r: number;
  private _x: number;
  private _y: number;

  constructor(
    public readonly canvas: Canvas,
    x: number,
    y: number,
    r: number,
    stroke: Colors = Colors.Black,
  ) {
    this._x = x;
    this._y = y;
    this._r = r;
    this._stroke = stroke;
  }

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

  get radius(): number {
    return this._r;
  }

  set radius(r: number) {
    this._r = r;
  }

  get angle(): Angle {
    return this._angle;
  }

  public moveForward(): void {
    this._x += this._r / 50;
    this._angle.add(1);
  }

  public draw(): void {
    this.canvas.state(() => {
      this.canvas.ctx.strokeStyle = this._stroke;
      this.canvas.ctx.translate(this.x, this.y);
      this.canvas.ctx.rotate(this._angle.radians);
      if (this._asset) {
        this.canvas.ctx.drawImage(this._asset, -this._r, -this._r, this._r * 2, this._r * 2);
        return;
      }
      this.canvas.ctx.beginPath();
      this.canvas.ctx.arc(0, 0, this._r, 0, 2 * Math.PI);
      this.canvas.ctx.stroke();
    });
  }

  public setCenter(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  public setAsset(image: CanvasImageSource): void {
    this._asset = image;
  }

  public getPoint(distance: number = this._r): Point {
    return {
      x: this._x + distance * Math.cos(this._angle.radians),
      y: this._y + distance * Math.sin(this._angle.radians),
    };
  }
}
