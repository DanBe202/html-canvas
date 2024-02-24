import {BaseScene} from "./common/base.scene";
import {CircleObject} from "./common/shapes/circle.object"
import {PointObject} from "./common/shapes/point.object";
import {VerticesObject} from "./common/shapes/vertices.object";
import {Angle} from "@/scenes/common/math/angle";
import { Colors } from '@/scenes/common/colors';

export class HypocycloidScene extends BaseScene {
  private _innerDiameter: number;
  private _outerDiameter: number;
  private _pointDistance: number;
  private readonly _innerCircle: CircleObject;
  private readonly _outerCircle: CircleObject;
  private readonly _point: PointObject;
  private readonly _circleAngle: Angle = new Angle(360);
  private readonly _pointAngle: Angle = new Angle(360);
  private readonly _line: VerticesObject = new VerticesObject(this.canvas, Colors.FireEngineRed);

  set innerDiameter(value: number) {
    this._innerDiameter = value;
    this._innerCircle.radius = value / 2;
    this.reset();
  }

  set outerDiameter(value: number) {
    this._outerDiameter = value;
    this._outerCircle.radius = value / 2;
    this.reset();
  }

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
      this._innerCircle.x,
      this._innerCircle.y + this._outerDiameter / 2,
      this._outerDiameter / 2,
      Colors.PrussianBlue,
    );
    this._point = new PointObject(this.canvas, this._outerCircle.x, this._outerCircle.y + this._pointDistance);
  }

  public reset(): void {
    this._line.reset();
    this._innerCircle.x = this.canvas.width / 2;
    this._outerCircle.x = this._outerDiameter / 2;
    this._circleAngle.set(360);
    this._pointAngle.set(360);
    if (!this.processing) {
      this._draw();
    }
  }

  protected _draw(): void {
    this._resetCanvas();
    this._line.draw();
    this._innerCircle.draw();
    this._outerCircle.draw();
    VerticesObject.line(this.canvas, this._outerCircle.x, this._outerCircle.y, this._point.x, this._point.y, Colors.Teal);
    this._point.draw();
  }

  protected _step(): void {
    this._circleAngle.add(-1);
    this._pointAngle.add(this._innerCircle.radius / this._outerCircle.radius - 1);
    this._outerCircle.x =
      this._innerCircle.x - (this._innerCircle.radius - this._outerCircle.radius) * Math.cos(this._circleAngle.radians);
    this._outerCircle.y =
      this._innerCircle.y - (this._innerCircle.radius - this._outerCircle.radius) * Math.sin(this._circleAngle.radians);
    this._point.x = this._outerCircle.x - this._pointDistance * Math.cos(this._pointAngle.radians);
    this._point.y = this._outerCircle.y - this._pointDistance * Math.sin(this._pointAngle.radians);
    this._line.addPoint(this._point.x, this._point.y);
  }

  private _resetCanvas(): void {
    this.canvas.ctx.fillStyle = Colors.Beige;
    this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
