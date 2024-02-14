import { CircleObject } from './common/shapes/circle.object';
import { BaseScene } from './common/base.scene';
import { PointObject } from './common/shapes/point.object';
import { VerticesObject } from '@/scenes/common/shapes/vertices.object';
import { Colors } from '@/scenes/common/colors';
import { Angle } from '@/scenes/common/geometry/angle';

export class CycloidScene extends BaseScene {
  private readonly _groundHeight = 100;
  private _diameter: number;
  private _pointDistance: number;
  private _angle: Angle = new Angle(270);
  private _line: VerticesObject = new VerticesObject(this.canvas, Colors.FireEngineRed);
  private readonly _circle: CircleObject;
  private readonly _point: PointObject;

  set diameter(value: number) {
    this._diameter = value;
    this._line.reset();
    this._circle.radius = value / 2;
    this._circle.x = value / 2;
    this._circle.y = this._getCircleYCoordinate();
  }

  set pointDistance(value: number) {
    this._pointDistance = value;
    this._line.reset();
    this._circle.x = this._circle.radius;
  }

  constructor(root: string, initialDiameter: number, initialPointDistance: number) {
    super(root, 960, 600);
    this._diameter = initialDiameter;
    this._pointDistance = initialPointDistance;
    this._circle = new CircleObject(this.canvas, this._diameter / 2, this._getCircleYCoordinate(), this._diameter / 2, Colors.PrussianBlue);
    this._point = new PointObject(this.canvas, this._circle.x, this._circle.y - this._pointDistance, );
  }

  protected _draw(): void {
    this._resetCanvas();
    this._ground();
    this._line.draw();
    this._step();
    this._circle.draw();
    this._drawLineBetween();
    this._point.draw();
  }

  private _step(): void {
    if (this._circle.x + this._circle.radius < this.canvas.width) {
      this._angle.add(1);
      this._point.x = this._circle.x + (this._pointDistance * Math.cos(this._angle.radians));
      this._point.y = this._circle.y + (this._pointDistance * Math.sin(this._angle.radians));
      this._line.addPoint(this._point.x, this._point.y);
      this._circle.x += Math.sqrt((this._diameter * this._diameter) / this.canvas.width);
    }
  }

  private _resetCanvas(): void {
    this.canvas.ctx.fillStyle = Colors.Beige;
    this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private _ground(): void {
    this.canvas.ctx.fillStyle = Colors.HunterGreen;
    this.canvas.ctx.fillRect(0, this.canvas.height - this._groundHeight, this.canvas.width, this.canvas.height - this._groundHeight);
  }

  private _drawLineBetween(): void {
    this.canvas.ctx.strokeStyle = Colors.Teal;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(this._circle.x, this._circle.y);
    this.canvas.ctx.lineTo(this._point.x, this._point.y);
    this.canvas.ctx.stroke();
  }

  private _getCircleYCoordinate(): number {
    return this.canvas.height - this._groundHeight - (this._diameter / 2);
  }
}
