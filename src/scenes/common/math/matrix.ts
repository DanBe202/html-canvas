import { Vector } from '@/scenes/common/math/vector';

export class Matrix {
  private readonly _matrix: Vector[];
  public readonly id = Math.random().toString(16);

  constructor(matrix: Vector[] | number[][] | Matrix) {
    if (matrix instanceof Matrix) {
      this._matrix = matrix.matrix;
      return;
    }
    if (!matrix.length) {
      throw new Error('Matrix is EMPTY!');
    }
    if (matrix.some((vector) => matrix[0].length !== vector.length)) {
      throw new Error('Matrix is INCORRECT!');
    }
    this._matrix = matrix.map((vector) => new Vector(vector));
  }

  get matrix(): Vector[] {
    return this._matrix;
  }

  get width(): number {
    return this._matrix[0].length;
  }

  get height(): number {
    return this._matrix.length;
  }

  public map(callback: (value: number, index: number) => number): Matrix {
    return new Matrix(this._matrix.map((vector) => vector.map(callback)));
  }

  public forEachRow(callback: (vector: Vector) => void): void {
    this._matrix.forEach(callback);
  }

  public mapRow(callback: (row: Vector, rowIndex: number) => Vector): Matrix {
    return new Matrix(this._matrix.map(callback));
  }

  public transpose(): Matrix {
    return new Matrix(
      new Array(this.width)
        .fill(new Array(this.height).fill(0))
        .map((row, rowIndex) => row.map((col: number, colIndex: number) => this._matrix[colIndex].vector[rowIndex])),
    );
  }

  public at(row: number, col: number): number {
    return this._matrix[row].vector[col];
  }

  public add(other: Matrix): Matrix {
    if (this.width !== other.width || this.height !== other.height) {
      throw new Error('Matrices are not equal in size');
    }
    return this.mapRow((vector, rowIndex) => vector.map((value, index) => value + other.at(rowIndex, index)));
  }

  public multiply(other: number): Matrix;
  public multiply(other: Matrix): Matrix;
  public multiply(other: Matrix | number): Matrix {
    if (typeof other === 'number') {
      return this.map((value) => value * other);
    }
    if (this.width !== other.height) {
      throw new Error('Matrices are the wrong sizes');
    }
    return new Matrix(
      this.mapRow((_, i) => {
        return other.matrix[0].map((_, j) => {
          return this._matrix[i].vector.reduce((sum, elm, k) => sum + elm * other.at(k, j), 0);
        });
      }),
    );
  }

  static from(rows: number, cols: number, fill: number = 0): Matrix {
    return new Matrix(new Array(rows).fill(new Array(cols).fill(fill))).mapRow((vector) => new Vector(vector));
  }
}
