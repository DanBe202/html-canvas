export class Complex {
  private readonly _real: number;
  private readonly _imaginary: number;

  constructor(real: number, imaginary: number) {
    this._real = real;
    this._imaginary = imaginary;
  }

  public get real(): number {
    return this._real;
  }

  public get imag(): number {
    return this._imaginary;
  }

  public add(other: Complex): Complex {
    return new Complex(this._real + other.real, this._imaginary + other.imag);
  }

  public sub(other: Complex): Complex {
    return new Complex(this._real - other.real, this._imaginary - other.imag);
  }

  public div(other: Complex): Complex {
    const divider = (other.real * other.real + other.imag * other.imag);
    const real = (this._real * other.real + this._imaginary * other.imag) / divider;
    const imaginary = (this._imaginary * other.real - this._real * other.imag) / divider;
    return new Complex(real, imaginary);
  }

  public mul(other: Complex): Complex {
    const real = (this._real * other.real - this._imaginary * other.imag);
    const imaginary = (this._imaginary * other.real + this._real * other.imag);
    return new Complex(real, imaginary);
  }

  public get absSq(): number {
    return (this._real * this._real) + (this._imaginary * this._imaginary);
  }

  public get abs(): number {
    return Math.sqrt(this.absSq);
  }

  public get conj(): Complex {
    return new Complex(this._real, this._imaginary ? -this._imaginary : this._imaginary);
  }

  public get exp(): Complex {
    const multiplier = new Complex(Math.pow(Math.E, this._real), 0);
    const eulerFormula = new Complex(Math.cos(this._imaginary), Math.sin(this._imaginary));
    return multiplier.mul(eulerFormula);
  }
}