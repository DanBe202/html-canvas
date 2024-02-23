export class Angle {

  private _degrees: number;

  get degrees(): number {
    return this._degrees;
  }

  get radians(): number {
    return this._degrees * Math.PI / 180;
  }

  constructor(degrees: number = 0) {
    this._degrees = degrees;
  }

  public add(degree: number): void {
    this._degrees += degree;
  }

  public set(degree: number): void {
    this._degrees = degree;
  }
}
