import { CircleObject } from './common/shapes/circle.object';
import { BaseScene } from './common/base.scene';
import { PointObject } from './common/shapes/point.object';
import { VerticesObject } from '@/scenes/common/shapes/vertices.object';
import { Colors } from '@/scenes/common/colors';
import { GroundObject } from '@/scenes/common/shapes/ground.object';

export class CycloidScene extends BaseScene {
  private readonly _ground = new GroundObject(this.canvas, 100, Colors.HunterGreen);
  private readonly _circle: CircleObject;
  private readonly _point: PointObject;
  private readonly _line: VerticesObject = new VerticesObject(this.canvas, Colors.FireEngineRed);
  private _diameter: number;
  private _pointDistance: number;

  constructor(root: string, initialDiameter: number, initialPointDistance: number) {
    super(root, 960, 600);
    this._diameter = initialDiameter;
    this._pointDistance = initialPointDistance;
    this._circle = new CircleObject(
      this.canvas,
      this._diameter / 2,
      this._getCircleYCoordinate(),
      this._diameter / 2,
      Colors.PrussianBlue,
    );
    this._point = new PointObject(this.canvas, this._circle.x, this._circle.y - this._pointDistance);
  }

  set diameter(value: number) {
    this._diameter = value;
    this._circle.radius = value / 2;
    this.reset();
  }

  set pointDistance(value: number) {
    this._pointDistance = value;
    this.reset();
  }

  override reset(): void {
    this._line.reset();
    this._circle.setCenter(this._circle.radius, this._getCircleYCoordinate());
    this._circle.angle.set(270);
    this._point.setCenter(this._circle.getPoint(this._pointDistance));
    if (!this.processing) {
      this._draw();
    }
  }

  protected _draw(): void {
    this.canvas.background(Colors.Beige);
    this._ground.draw();
    this._circle.draw();
    this._line.draw();
    VerticesObject.line(this.canvas, this._circle.x, this._circle.y, this._point.x, this._point.y, Colors.Teal);
    this._point.draw();
  }

  protected _step(): void {
    if (this._circle.x + this._circle.radius < this.canvas.width) {
      this._point.setCenter(this._circle.getPoint(this._pointDistance));
      this._line.addPoint(this._point.x, this._point.y);
      this._circle.moveForward();
    }
  }

  private _getCircleYCoordinate(): number {
    return this.canvas.height - this._ground.height - this._diameter / 2;
  }
}
