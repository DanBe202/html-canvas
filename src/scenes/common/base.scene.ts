import { Canvas } from '@/scenes/common/elements/canvas.element';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { ImageLoader } from '@/scenes/common/loaders/image.loader';

export abstract class BaseScene {
  public readonly canvas: Canvas;
  public readonly images: ImageLoader = new ImageLoader();
  private readonly _processing: Ref<boolean> = ref(false);

  protected constructor(root: string, width: number, height: number) {
    this.canvas = new Canvas(root, width, height);
  }

  get processing(): boolean {
    return this._processing.value;
  }

  public abstract reset(): void;

  public setup(start: boolean = false): void {
    this.canvas.setup();
    this.reset();
    this._draw();
    window.requestAnimationFrame(this._redraw.bind(this));
    this.canvas.onResize(() => {
      if (!this.processing) {
        this._draw();
      }
    });
    if (start) {
      this.start();
    }
  }

  public start(): void {
    this._processing.value = true;
  }

  public stop(): void {
    this._processing.value = false;
  }

  protected abstract _draw(): void;

  protected abstract _step(): void;

  private _redraw() {
    if (this.processing) {
      this._step();
      this._draw();
    }
    window.requestAnimationFrame(this._redraw.bind(this));
  }
}
