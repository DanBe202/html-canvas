import { BaseScene } from '@/scenes/common/base.scene';
import { Colors } from '@/scenes/common/colors';
import { Complex } from '@/scenes/common/math/complex';

export class MandelbrotScene extends BaseScene {
  private readonly _iterations: number = 500;
  private _minX: number;
  private _maxX: number;
  private _minY: number;
  private _maxY: number;

  constructor(root: string, minX: number, maxX: number, minY: number, maxY: number) {
    super(root, 960, 600);
    this._minX = minX;
    this._maxX = maxX;
    this._minY = minY;
    this._maxY = maxY;
  }

  set minX(minX: number) {
    this._minX = minX;
    this.reset();
  }

  set maxX(maxX: number) {
    this._maxX = maxX;
    this.reset();
  }

  set minY(minY: number) {
    this._minY = minY;
    this.reset();
  }

  set maxY(maxY: number) {
    this._maxY = maxY;
    this.reset();
  }

  reset(): void {
    this.canvas.background(Colors.Beige);
    this._draw();
  }

  protected _draw(): void {
    this.mandelbrot(this.canvas.width, this.canvas.height);
  }

  private mandelbrot(width: number, height: number): void {
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const complexPoint = new Complex(this._minX + (x / width) * (this._maxX - this._minX), this._minY + (y / height) * (this._maxY - this._minY));

        let limit = new Complex(0, 0);
        let iteration = 0;
        while (limit.absSq <= 4 && iteration <= this._iterations) {
          limit = limit.mul(limit).add(complexPoint);
          ++iteration;
        }
        const iterationRatio = iteration / this._iterations;
        const [hue, saturation, lightness] = [Math.pow(iterationRatio * 360, 1.5) % 360, 50, iterationRatio * 100];
        this.canvas.ctx.fillStyle = `hsl(${360 - hue}, ${saturation}%, ${100 - lightness}%)`;
        this.canvas.ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  protected _step(): void {}
}
