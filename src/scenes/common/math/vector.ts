import { Matrix } from '@/scenes/common/math/matrix';

export class Vector {
  private readonly _vector: number[];

  constructor(vector: number[] | Vector) {
    if (Array.isArray(vector)) {
      this._vector = vector;
      return;
    }
    this._vector = vector.vector;
  }

  get vector(): number[] {
    return this._vector;
  }

  get length(): number {
    return this._vector.length;
  }

  public at(index: number): number {
    return this.vector[index];
  }

  public toMatrix(): Matrix {
    return new Matrix([this._vector]);
  }

  public map(callback: (value: number, index: number) => number): Vector {
    return new Vector(this._vector.map(callback));
  }

  static linspace(start: number, end: number, count: number): Vector {
    return new Vector(new Array(count).fill(start).map((value, index) => value + (end - start) / (count - 1) * index));
  }
}