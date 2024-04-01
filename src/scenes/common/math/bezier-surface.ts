import { factorial } from '@/scenes/common/math/factorial';
import { Vector } from '@/scenes/common/math/vector';
import { Matrix } from '@/scenes/common/math/matrix';
import type { Vertices3dInterface } from '@/interfaces/vertices-3d.interface';

export type Lines = Matrix[];

export class BezierSurface {
  static binomialCoefficient(n: number, i: number): number {
    return factorial(n) / (factorial(i) * factorial(n - i));
  }

  static bernsteinPolynomial(n: number, i: number, u: Vector): Matrix {
    return u.map((value) => this.binomialCoefficient(n, i) * Math.pow(value, i) * Math.pow(1 - value, n - i))
      .toMatrix();
  }

  static getControlSurface(lines: Lines): Vertices3dInterface {
    const matrix: Vector[] = lines.reduce((accumulator, matrix) => [...accumulator, ...matrix.matrix], [] as Vector[]);
    const linesVectors: Vector[] = [];
    for (let i = 0; i < lines.length; ++i) {
      for (let j = 0; j < lines[i].height; ++j) {
        if (j < lines[i].height - 1) {
          linesVectors.push(new Vector([i * lines[i].height + j, i * lines[i].height + j + 1]))
        }
        if (i < lines.length - 1) {
          linesVectors.push(new Vector([i * lines[i].height + j, i * lines[i].height + j + lines[i].height]))
        }
      }
    }
    return {
      points: new Matrix(matrix),
      lines: new Matrix(linesVectors)
    };
  }

  static calculate(lines: Lines, cells: Vector): Vertices3dInterface {
    const x = new Matrix(lines.map((matrix) => matrix.transpose().matrix[0]));
    const y = new Matrix(lines.map((matrix) => matrix.transpose().matrix[1]));
    const z = new Matrix(lines.map((matrix) => matrix.transpose().matrix[2]));

    const uPoints = lines.length;
    const wPoints = lines[0].height;

    const n = uPoints - 1;
    const m = wPoints - 1;

    const u = Vector.linspace(0, 1, cells.at(0));
    const w = Vector.linspace(0, 1, cells.at(1));

    let xBezier = Matrix.from(cells.at(0), cells.at(1));
    let yBezier = Matrix.from(cells.at(0), cells.at(1));
    let zBezier = Matrix.from(cells.at(0), cells.at(1));

    for (let i = 0; i < uPoints; ++i) {
      for (let j = 0; j < wPoints; ++j) {
        const polynomial= this.bernsteinPolynomial(n, i, u)
          .transpose()
          .multiply(this.bernsteinPolynomial(m, j, w));
        xBezier = polynomial.multiply(x.at(i, j)).add(xBezier);
        yBezier = polynomial.multiply(y.at(i, j)).add(yBezier);
        zBezier = polynomial.multiply(z.at(i, j)).add(zBezier);
      }
    }

    const matrix: Vector[] = [];
    const linesVectors: Vector[] = [];
    for (let i = 0; i < xBezier.height; ++i) {
      for (let j = 0; j < xBezier.width; ++j) {
        matrix.push(new Vector([xBezier.at(i, j), yBezier.at(i, j), zBezier.at(i, j)]));
        if (j < xBezier.width - 1) {
          linesVectors.push(new Vector([i * xBezier.width + j, i * xBezier.width + j + 1]))
        }
        if (i < xBezier.height - 1) {
          linesVectors.push(new Vector([i * xBezier.width + j, i * xBezier.width + j + xBezier.width]))
        }
      }
    }
    return {
      points: new Matrix(matrix),
      lines: new Matrix(linesVectors)
    };
  }
}