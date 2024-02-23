import { BaseScene } from '@/scenes/common/base.scene';
import { Colors } from '@/scenes/common/colors';
import { Complex } from '@/scenes/common/math/complex';
import { PointCache } from '@/scenes/common/helpers/point.cache';
import { hsl2rgb } from '@/scenes/common/helpers/hsl-to-rgb';

export class MandelbrotScene extends BaseScene {
  private readonly _complexPointsCache = new PointCache<Complex>(this.canvas.width, this.canvas.height);
  private readonly _limitCache = new PointCache<Complex>(this.canvas.width, this.canvas.height);
  private readonly _iterationCache = new PointCache<number>(this.canvas.width, this.canvas.height);
  private readonly _iterations: number = 10;
  private _iteration: number = 0;
  private readonly _imageData: ImageData = new ImageData(this.canvas.width, this.canvas.height);

  constructor(root: string) {
    super(root, 960, 600);
  }

  reset(): void {
    this.canvas.background(Colors.Beige);
    this._draw();
  }

  protected _draw(): void {
    this.canvas.putImageData(this._imageData, 0, 0);
  }

  private mandelbrot(width: number = 960, height: number = 600): void {
    const minX: number = -2.0;
    const maxX: number = 0.47;
    const minY: number = -1.12;
    const maxY: number = 1.12;

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const complexPoint = this._complexPointsCache.get(x, y, () =>
          new Complex(
            minX + (x / width) * (maxX - minX),
            minY + (y / height) * (maxY - minY)
          )
        );

        let limit = this._limitCache.get(x, y, () => new Complex(0, 0));
        if (limit.absSq <= 4) {
          limit = limit.mul(limit).add(complexPoint);
          this._limitCache.set(x, y, limit);
          this._iterationCache.set(x, y, this._iteration);
        }
        // this.canvas.ctx.fillStyle = `hsl(${360 - hue}, ${saturation}%, ${100 - lightness}%)`;
        // this.canvas.ctx.fillRect(x, y, 1, 1);
        const index: number = (y * height + x) * 4;
        const [hue, saturation, lightness] = [Math.pow((this._iteration / this._iterations) * 360, 1.5) % 360, 50, (this._iteration / this._iterations) * 100];
        const [r, g, b] = hsl2rgb(hue, saturation / 100, lightness / 100);
        this._imageData.data[index] = r;
        this._imageData.data[index + 1] = g;
        this._imageData.data[index + 2] = b;
        this._imageData.data[index + 3] = 255;
      }
    }
  }

  protected _step(): void {
    if (this._iteration > this._iterations) {
      console.timeEnd('performance');
      this.stop();
      // console.log(this._limitCache);
      return;
    }
    this.mandelbrot();
    ++this._iteration;
  }
}
