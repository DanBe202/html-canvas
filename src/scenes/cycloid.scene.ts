import {Canvas} from './common/elements/canvas.element';
import {RangeElement} from './common/elements/range.element';
import {CircleObject} from './common/shapes/circle.object';
import {BaseScene} from './common/base.scene';
import {NumberElement} from './common/elements/number.element';
import {PointObject} from './common/shapes/point.object';

export class CycloidScene extends BaseScene {
  private readonly _groundHeight = 100;
  private _diameter: number;
  private _pointDistance: number;
  private readonly _circle: CircleObject;
  private readonly _point: PointObject;
  private _angle: number = 270;
  private _line: number[][] = [];

  set diameter(value: number) {
    this._diameter = value;
    this._line = [];
    this._circle.radius = value / 2;
    this._circle.x = value / 2;
    this._circle.y = this._getCircleYCoordinate();
  }

  set pointDistance(value: number) {
    this._pointDistance = value;
    this._line = [];
    this._circle.x = this._circle.radius;
  }

  private get angleRadians(): number {
    return this._angle * Math.PI / 180;
  }

  constructor(initialDiameter: number, initialPointDistance: number) {
    super(960, 600);
    this._diameter = initialDiameter;
    this._pointDistance = initialPointDistance;
    this._circle = new CircleObject(this._diameter / 2, this._getCircleYCoordinate(), this._diameter / 2, '#000');
    this._point = new PointObject(this._circle.x, this._circle.y - this._pointDistance);
  }

  protected _draw(): void {
    this._resetCanvas();
    this._ground();
    this._drawLine();
    if (this._circle.x + this._circle.radius < Canvas.width) {
      this._angle += 1;
      this._point.x = this._circle.x + (this._pointDistance * Math.cos(this.angleRadians));
      this._point.y = this._circle.y + (this._pointDistance * Math.sin(this.angleRadians));
      this._line.push([this._point.x, this._point.y]);
      this._circle.x += 1;
    }
    this._circle.draw();
    this._drawLineBetween();
    this._point.draw();
  }

  private _resetCanvas(): void {
    Canvas.ctx.fillStyle = 'white';
    Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
  }

  private _ground(): void {
    Canvas.ctx.fillStyle = '#333';
    Canvas.ctx.fillRect(0, Canvas.height - this._groundHeight, Canvas.width, Canvas.height - this._groundHeight);
  }

  private _drawLineBetween(): void {
    Canvas.ctx.strokeStyle = '#0f0';
    Canvas.ctx.beginPath();
    Canvas.ctx.moveTo(this._circle.x, this._circle.y);
    Canvas.ctx.lineTo(this._point.x, this._point.y);
    Canvas.ctx.stroke();
  }

  private _drawLine(): void {
    if (this._line.length < 2) {
      return;
    }
    Canvas.ctx.strokeStyle = '#f00';
    Canvas.ctx.beginPath();
    Canvas.ctx.moveTo(this._line[0][0], this._line[0][1]);
    this._line.forEach(point => {
      Canvas.ctx.lineTo(point[0], point[1]);
    });
    Canvas.ctx.stroke();
  }

  private _getCircleYCoordinate(): number {
    return Canvas.height - this._groundHeight - (this._diameter / 2);
  }
}
