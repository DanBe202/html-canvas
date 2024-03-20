import { BaseScene } from '@/scenes/common/base.scene';
import { Colors } from '@/scenes/common/colors';
import { Vertices3D } from '@/scenes/common/shapes/vertices-3d.object';
import { Matrix } from '@/scenes/common/math/matrix';

export class CubeScene extends BaseScene {
  private readonly _cube: Vertices3D = new Vertices3D(this.canvas, new Matrix([
    [0, 0, 1],
    [1, 0, 1],
    [1, 0.5, 1],
    [0.5, 1, 1],
    [0, 1, 1],
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [1, 1, 0.5],
  ]).map((value) => (value - 0.5) * 100),
    new Matrix([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 5],
      [4, 8],
      [1, 6],
      [0, 5],
      [3, 9],
      [2, 9],
      [9, 7],
    ]));

  constructor(root: string) {
    super(root, 940, 600);
  }

  protected _draw(): void {
    this.canvas.background(Colors.Beige);
    this._cube.draw();

  }

  protected _step(): void {
    this._cube.rotateY(1)
      .rotateY(2)
      .rotateZ(0.5);
  }

  reset(): void {}
}