import {BaseScene} from "./common/base.scene";
import {RangeElement} from "./common/elements/range.element";
import {CircleObject} from "./common/shapes/circle.object"
import {PointObject} from "./common/shapes/point.object";
import {Canvas} from "./common/elements/canvas.element";
import {VerticeObject} from "./common/shapes/vertice.object";
import {Angle} from "./common/geometry/angle";
import {NumberElement} from "./common/elements/number.element";

export class EpicycloidApp extends BaseScene {
  private readonly _innerDiameter = new RangeElement('inner-circle-diameter');
  private readonly _outerDiameter = new RangeElement('outer-circle-diameter');
  private readonly _innerCircle: CircleObject;
  private readonly _outerCircle: CircleObject;
  private readonly _pointDistance = new NumberElement('point-distance');
  private readonly _point: PointObject;
  private _circleAngle: Angle = new Angle(360);
  private _pointAngle: Angle = new Angle(360);
  private _line: VerticeObject = new VerticeObject();

  constructor() {
    super(960, 600);
    Canvas.init('main-canvas', 960, 600);
    this._innerCircle = new CircleObject(Canvas.width / 2, Canvas.height / 2, this._innerDiameter.value / 2, '#000');
    this._outerCircle = new CircleObject(this._innerCircle.x, this._innerCircle.y + this._outerDiameter.value / 2, this._outerDiameter.value / 2, '#000');
    this._point = new PointObject(this._outerCircle.x, this._outerCircle.y + this._pointDistance.value);
    this._initListeners();
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
    this._point.x = this._outerCircle.x - ((this._pointDistance.value) * Math.cos(this._pointAngle.radians));
    this._point.y = this._outerCircle.y - ((this._pointDistance.value) * Math.sin(this._pointAngle.radians));
    this._line.addPoint(this._point.x, this._point.y);
  }

  private _resetCanvas(): void {
    Canvas.ctx.fillStyle = 'white';
    Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
  }

  private _initListeners(): void {
    this._innerDiameter.onChange(diameter => {
      this._line.reset();
      this._innerCircle.radius = diameter / 2;
    });
    this._outerDiameter.onChange(diameter => {
      this._line.reset();
      this._outerCircle.radius = diameter / 2;
    });
    this._pointDistance.onChange(() => {
      this._line.reset();
    });
  }

  private _drawLineBetween(): void {
    Canvas.ctx.strokeStyle = '#0f0';
    Canvas.ctx.beginPath();
    Canvas.ctx.moveTo(this._outerCircle.x, this._outerCircle.y);
    Canvas.ctx.lineTo(this._point.x, this._point.y);
    Canvas.ctx.stroke();
  }
}