import { BaseScene } from '@/scenes/common/base.scene';
import { Colors } from '@/scenes/common/colors';
import { Matrix } from '@/scenes/common/math/matrix';
import { Vertices3D } from '@/scenes/common/shapes/vertices-3d.object';
import { BezierSurface} from '@/scenes/common/math/bezier-surface';
import type { Lines } from '@/scenes/common/math/bezier-surface';
import { Vector } from '@/scenes/common/math/vector';
import bezierSurface from '@/scenes/common/shapes/3d/bezier-surface.json';

export class BezierSurfaceScene extends BaseScene {
  private _controlSurface: Vertices3D;
  private _surface: Vertices3D;

  constructor(root: string) {
    super(root, 900, 600);
    const lines: Lines = bezierSurface.map((matrix) => new Matrix(matrix));
    this._surface = new Vertices3D(this.canvas, BezierSurface.calculate(lines, new Vector([15, 15])));
    this._controlSurface = new Vertices3D(this.canvas, BezierSurface.getControlSurface(lines));
  }

  protected _draw(): void {
    this.canvas.background(Colors.Beige);
    this._surface.draw();
    this._controlSurface.showPoints();
    this._controlSurface.draw();
  }

  protected _step(): void {
    this._surface.rotateY(1);
    this._controlSurface.rotateY(1);
  }

  public changeSurface(cells: Vector): void {
    const lines: Lines = bezierSurface.map((matrix) => new Matrix(matrix));
    const angle = this._surface.angleY;
    this._surface = new Vertices3D(this.canvas, BezierSurface.calculate(lines, cells)).rotateY(angle.degrees);
    this._controlSurface = new Vertices3D(this.canvas, BezierSurface.getControlSurface(lines)).rotateY(angle.degrees);
  }

  reset(): void {}
}
