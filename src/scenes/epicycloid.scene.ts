import { BaseScene } from './common/base.scene';
import { CircleObject } from './common/shapes/circle.object';
import { PointObject } from './common/shapes/point.object';
import { VerticesObject } from './common/shapes/vertices.object';
import { Angle } from '@/scenes/common/math/angle';
import { Colors } from '@/scenes/common/colors';

export class EpicycloidScene extends BaseScene {
  private readonly _innerCircle: CircleObject;
  private readonly _outerCircle: CircleObject;
  private readonly _point: PointObject;
  private readonly _circleAngle: Angle = new Angle(360);
  private readonly _pointAngle: Angle = new Angle(360);
  private readonly _line: VerticesObject = new VerticesObject(this.canvas, Colors.FireEngineRed);

  private _innerDiameter: number;

  set innerDiameter(value: number) {
    this._innerDiameter = value;
    this._innerCircle.radius = value / 2;
    this.reset();
  }

  private _outerDiameter: number;

  set outerDiameter(value: number) {
    this._outerDiameter = value;
    this._outerCircle.radius = value / 2;
    this.reset();
  }

  private _pointDistance: number;

  set pointDistance(value: number) {
    this._pointDistance = value;
    this.reset();
  }

  constructor(root: string, innerInitialDiameter: number, outerInitialDiameter: number, initialPointDistance: number) {
    super(root, 960, 600);
    this._innerDiameter = innerInitialDiameter;
    this._outerDiameter = outerInitialDiameter;
    this._pointDistance = initialPointDistance;
    this._innerCircle = new CircleObject(
      this.canvas,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this._innerDiameter / 2,
      Colors.PrussianBlue,
    );
    this._outerCircle = new CircleObject(
      this.canvas,
      this._innerCircle.x - this._innerDiameter / 2,
      this._innerCircle.y,
      this._outerDiameter / 2,
      Colors.PrussianBlue,
    );
    this._point = new PointObject(this.canvas, this._outerCircle.x, this._outerCircle.y - this._pointDistance);
  }

  public reset() {
    this._line.reset();
    this._innerCircle.x = this.canvas.width / 2;
    this._outerCircle.setCenter(this._innerDiameter + this._innerCircle.x, this._innerCircle.y);
    this._point.setCenter({ x:  this._outerCircle.x + this._pointDistance, y: this._outerCircle.y });
    this._circleAngle.set(360);
    this._pointAngle.set(360);
    if (!this.processing) {
      this._draw();
    }
  }

  protected _draw(): void {
    this.canvas.background(Colors.Beige);
    this._line.draw();
    this._innerCircle.draw();
    this._outerCircle.draw();
    VerticesObject.line(
      this.canvas,
      this._outerCircle.x,
      this._outerCircle.y,
      this._point.x,
      this._point.y,
      Colors.Teal,
    );
    this._point.draw();
  }

  protected _step(): void {
    this._circleAngle.add(1);
    this._pointAngle.add(this._innerCircle.radius / this._outerCircle.radius + 1);
    this._outerCircle.x =
      this._innerCircle.x + (this._innerCircle.radius + this._outerCircle.radius) * Math.cos(this._circleAngle.radians);
    this._outerCircle.y =
      this._innerCircle.y + (this._innerCircle.radius + this._outerCircle.radius) * Math.sin(this._circleAngle.radians);
    this._point.x = this._outerCircle.x + this._pointDistance * Math.cos(this._pointAngle.radians);
    this._point.y = this._outerCircle.y + this._pointDistance * Math.sin(this._pointAngle.radians);
    this._line.addPoint(this._point.x, this._point.y);
  }
}
