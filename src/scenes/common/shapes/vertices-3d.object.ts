import { Matrix } from '@/scenes/common/math/matrix';
import { Angle } from '@/scenes/common/math/angle';
import { Matrices } from '@/scenes/common/helpers/matrices';
import type { Canvas } from '@/scenes/common/elements/canvas.element';
import { PointObject } from '@/scenes/common/shapes/point.object';
import { VerticesObject } from '@/scenes/common/shapes/vertices.object';
import { Colors } from '@/scenes/common/colors';
import type { Vertices3dInterface } from '@/interfaces/vertices-3d.interface';

export class Vertices3D {
  private readonly _vertices: Matrix;
  private readonly _angleX: Angle = new Angle(0);
  private readonly _angleY: Angle = new Angle(0);
  private readonly _angleZ: Angle = new Angle(0);
  private _scale: number = 100;
  private readonly _lineIndexes: Matrix | undefined;
  private _showPoints: boolean = false;

  constructor(
    public readonly canvas: Canvas,
    vertices: Matrix | number[][] | Vertices3dInterface,
    lineIndexes?: Matrix,
  ) {
    if (vertices instanceof Matrix || Array.isArray(vertices)) {
      this._lineIndexes = lineIndexes;
      this._vertices = new Matrix(vertices);
      return;
    }
    this._vertices = vertices.points;
    this._lineIndexes = vertices.lines;
  }

  get angleY(): Angle {
    return this._angleY;
  }

  public rotateX(degree: number): this {
    this._angleX.add(degree);
    return this;
  }

  public rotateY(degree: number): this {
    this._angleY.add(degree);
    return this;
  }

  public rotateZ(degree: number): this {
    this._angleX.add(degree);
    return this;
  }

  public showPoints(): void {
    this._showPoints = true;
  }

  public draw(): void {
    const projection = this._vertices.multiply(this._scale).mapRow((row) => {
      let rotation = Matrices.rotationX(this._angleX).multiply(row.toMatrix().transpose());
      rotation = Matrices.rotationY(this._angleY).multiply(rotation);
      rotation = Matrices.rotationZ(this._angleZ).multiply(rotation);
      return Matrices.isometricProjection().multiply(rotation).transpose().matrix[0];
    });
    this.canvas.state(() => {
        this.canvas.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      if (this._showPoints) {
        projection.forEachRow((vector) => {
          new PointObject(this.canvas, vector.vector[0], vector.vector[1]).draw();
        });
      }
      this._lineIndexes?.forEachRow((vector) => {
        const [x1, y1] = projection.matrix[vector.vector[0]].vector;
        const [x2, y2] = projection.matrix[vector.vector[1]].vector;
        VerticesObject.line(this.canvas, x1, y1, x2, y2, Colors.HunterGreen);
      });
    });
  }
}