import type { Angle } from '@/scenes/common/math/angle';
import { Matrix } from '@/scenes/common/math/matrix';

export namespace Matrices {
  export function rotationX(angle: Angle): Matrix {
    return new Matrix([
      [1, 0, 0],
      [0, Math.cos(angle.radians), -Math.sin(angle.radians)],
      [0, Math.sin(angle.radians), Math.cos(angle.radians)],
    ]);
  }

  export function rotationY(angle: Angle): Matrix {
    return new Matrix([
      [Math.cos(angle.radians), 0, Math.sin(angle.radians)],
      [0, 1, 0],
      [-Math.sin(angle.radians), 0, Math.cos(angle.radians)],
    ]);
  }

  export function rotationZ(angle: Angle): Matrix {
    return new Matrix([
      [Math.cos(angle.radians), -Math.sin(angle.radians), 0],
      [Math.sin(angle.radians), Math.cos(angle.radians), 0],
      [0, 0, 1],
    ]);
  }

  export function isometricProjection(): Matrix {
    return new Matrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
  }
}
