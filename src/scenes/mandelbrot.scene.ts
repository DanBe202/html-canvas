import { BaseScene } from '@/scenes/common/base.scene';
import { Colors } from '@/scenes/common/colors';
import { Complex } from '@/scenes/common/math/complex';

export class MandelbrotScene extends BaseScene {
  private readonly _iterations: number = 100;

  constructor(root: string) {
    super(root, 960, 600);
  }

  reset(): void {
    this.canvas.background(Colors.Beige);
    this._draw();
  }

  protected _draw(): void {
    this.mandelbrot(this.canvas.width, this.canvas.height);
  }

  private mandelbrot(width: number, height: number): void {
    const minX: number = -2.0;
    const maxX: number = 0.47;
    const minY: number = -1.12;
    const maxY: number = 1.12;

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const complexPoint = new Complex(minX + (x / width) * (maxX - minX), minY + (y / height) * (maxY - minY));

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
