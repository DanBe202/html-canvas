import { Canvas } from '@/scenes/common/elements/canvas.element';
import type { Ref } from 'vue';
import { ref } from 'vue';

export abstract class BaseScene {
  public readonly canvas: Canvas;
  private readonly _processing: Ref<boolean> = ref(false);

  protected constructor(root: string, width: number, height: number) {
    this.canvas = new Canvas(root, width, height);
  }

  get processing(): boolean {
    return this._processing.value;
  }

  protected abstract _draw(): void;

  public abstract reset(): void;

  setup(start: boolean = false): void {
    this.canvas.setup();
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

  start(): void {
    this._processing.value = true;
  }

  stop(): void {
    this._processing.value = false;
  }

  private _redraw() {
    if (this.processing) {
      this._draw();
    }
    window.requestAnimationFrame(this._redraw.bind(this));
  }
}
