import {BaseScene} from "./common/base.scene";
import {CircleObject} from "./common/shapes/circle.object"
import {PointObject} from "./common/shapes/point.object";
import {VerticesObject} from "./common/shapes/vertices.object";
import {Angle} from "./common/geometry/angle";
import { Colors } from '@/scenes/common/colors';

export class HypocycloidScene extends BaseScene {
  private _innerDiameter: number;
  private _outerDiameter: number;
  private readonly _innerCircle: CircleObject;
  private readonly _outerCircle: CircleObject;
  private _pointDistance: number;
  private readonly _point: PointObject;
  private _circleAngle: Angle = new Angle(360);
  private _pointAngle: Angle = new Angle(360);
  private _line: VerticesObject = new VerticesObject(this.canvas, Colors.FireEngineRed);

  set innerDiameter(value: number) {
    this._innerDiameter = value;
    this._line.reset();
    this._innerCircle.radius = value / 2;
    this._innerCircle.x = this.canvas.width / 2;
  }

  set outerDiameter(value: number) {
    this._outerDiameter = value;
    this._line.reset();
    this._outerCircle.radius = value / 2;
    this._outerCircle.x = this._outerCircle.radius + value / 2;
  }

  set pointDistance(value: number) {
    this._pointDistance = value;
    this._line.reset();
    this._outerCircle.x = this._outerCircle.radius;
  }

  constructor(root: string, innerInitialDiameter: number, outerInitialDiameter: number, initialPointDistance: number) {
    super(root,960, 600);
    this._innerDiameter = innerInitialDiameter;
    this._outerDiameter = outerInitialDiameter;
    this._pointDistance = initialPointDistance;
    this._innerCircle = new CircleObject(this.canvas,this.canvas.width / 2, this.canvas.height / 2, this._innerDiameter / 2, '#000');
    this._outerCircle = new CircleObject(this.canvas, this._innerCircle.x, this._innerCircle.y + this._outerDiameter / 2, this._outerDiameter / 2, '#000');
    this._point = new PointObject(this.canvas, this._outerCircle.x, this._outerCircle.y + this._pointDistance);
  }

  protected _draw(): void {
    this._resetCanvas();
    this._line.draw();
    this._step();
    this._innerCircle.draw();
    this._outerCircle.draw();
    this._drawLineBetween();
    this._point.draw();
  }

  private _step(): void {
    this._circleAngle.add(-1);
    this._pointAngle.add(this._innerCircle.radius / this._outerCircle.radius + 1);
    this._outerCircle.x = this._innerCircle.x - ((this._innerCircle.radius - this._outerCircle.radius) * Math.cos(this._circleAngle.radians))
    this._outerCircle.y = this._innerCircle.y - ((this._innerCircle.radius -  this._outerCircle.radius) * Math.sin(this._circleAngle.radians))
    this._point.x = this._outerCircle.x - ((this._pointDistance) * Math.cos(this._pointAngle.radians));
    this._point.y = this._outerCircle.y - ((this._pointDistance) * Math.sin(this._pointAngle.radians));
    this._line.addPoint(this._point.x, this._point.y);
  }

  private _resetCanvas(): void {
    this.canvas.ctx.fillStyle = Colors.Beige;
    this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private _drawLineBetween(): void {
    this.canvas.ctx.strokeStyle = Colors.Teal;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(this._outerCircle.x, this._outerCircle.y);
    this.canvas.ctx.lineTo(this._point.x, this._point.y);
    this.canvas.ctx.stroke();
  }
}
