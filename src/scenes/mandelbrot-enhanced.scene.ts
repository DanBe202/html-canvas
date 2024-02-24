import { BaseScene } from '@/scenes/common/base.scene';
import { Colors } from '@/scenes/common/colors';
import { PointCache } from '@/scenes/common/helpers/point.cache';
import { hsl2rgb } from '@/scenes/common/helpers/hsl-to-rgb';
import type { Point } from '@/interfaces/point.interface';

export class MandelbrotEnhancedScene extends BaseScene {
  private readonly _complexPointsCache = new PointCache<Point>(this.canvas.width, this.canvas.height);
  private readonly _limitCache = new PointCache<Point>(this.canvas.width, this.canvas.height);
  private readonly _iterationCache = new PointCache<number>(this.canvas.width, this.canvas.height);
  private readonly _iterations: number = 250;
  private _iteration: number = 0;
  private _imageData: ImageData = new ImageData(this.canvas.width, this.canvas.height);

  constructor(root: string) {
    super(root, 960, 600);
  }

  reset(): void {
    this.canvas.background(Colors.Beige);
    this._iteration = 0;
    this._limitCache.reset();
    this._iterationCache.reset();
    this._complexPointsCache.reset();
    this._draw();
  }

  protected _draw(): void {
    this.canvas.putImageData(this._imageData, 0, 0);
  }

  private mandelbrot(width: number, height: number): void {
    const minX: number = -2.0;
    const maxX: number = 0.47;
    const minY: number = -1.12;
    const maxY: number = 1.12;
    this._imageData = new ImageData(this.canvas.width, this.canvas.height);

    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        const complexPoint = this._complexPointsCache.get(x, y, () => ({
          x: minX + (x / width) * (maxX - minX),
          y: minY + (y / height) * (maxY - minY),
        }));

        const limit = this._limitCache.get(x, y, () => ({ x: 0, y: 0 }));
        const limitXSquare = limit.x * limit.x;
        const limitYSquare = limit.y * limit.y;
        if (limitXSquare + limitYSquare <= 4) {
          const limitMultiply = limit.x * limit.y;
          this._limitCache.set(x, y, {
            x: limitXSquare - limitYSquare + complexPoint.x,
            y: limitMultiply + limitMultiply + complexPoint.y
          });
          this._iterationCache.set(x, y, this._iteration);
        }
        const iterationRatio = this._iterationCache.get(x, y, () => 0) / this._iterations;
        const index: number = (y * width + x) * 4;
        const [hue, saturation, lightness] = [Math.pow(iterationRatio * 360, 1.5) % 360, 0.5, iterationRatio];
        const [r, g, b] = hsl2rgb(hue, saturation, lightness);
        this._imageData.data[index] = r;
        this._imageData.data[index + 1] = g;
        this._imageData.data[index + 2] = b;
        this._imageData.data[index + 3] = 255;
      }
    }
  }

  protected _step(): void {
    if (this._iteration > this._iterations) {
      this.reset();
      return;
    }
    this.mandelbrot(this.canvas.width, this.canvas.height);
    ++this._iteration;
  }
}
