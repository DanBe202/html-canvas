import type { Ref } from 'vue';
import { ref } from 'vue';
import { Colors } from '@/scenes/common/colors';

export class Canvas {
  private readonly _setup: Ref<boolean> = ref(false);
  private readonly _id: string = Math.random().toString(16).slice(2);
  private readonly _root: string;
  private readonly _canvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly _ctx: CanvasRenderingContext2D | null = this._canvas.getContext('2d');
  private readonly _preferredWidth: number;
  private readonly _height: number;
  private readonly _onResizeCallbacks: (() => void)[] = [];
  private _width: number;
  private readonly _lineWidth: number = 2;

  constructor(root: string, width: number, height: number) {
    this._root = root;
    this._width = width;
    this._preferredWidth = width;
    this._height = height;
    this._canvas.setAttribute('id', this._id);
    this._canvas.classList.add('rounded-2xl');
    this._resize();
    try {
      this.setup();
    } catch (error) {
      console.warn('Canvas was not initialized in constructor');
    }
  }

  get width(): number {
    return this._width;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get ctx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      throw new Error('Error while obtaining canvas 2d context');
    }
    return this._ctx;
  }

  get height(): number {
    return this._height;
  }

  public onResize(callback: () => void): void {
    this._onResizeCallbacks.push(callback);
  }

  setup(): void {
    if (this._setup.value) {
      return;
    }
    const rootElement = document.querySelector(this._root);
    if (!rootElement) {
      throw new RootSelectorNotFound(this._root);
    }
    if (!(rootElement instanceof HTMLElement)) {
      throw new RootElementTypeError();
    }
    rootElement.appendChild(this._canvas);
    this._onResize(rootElement);
    window.addEventListener(
      'resize',
      () => {
        this._onResize(rootElement);
      },
      true,
    );
    this._setup.value = true;
    if (this._ctx) {
      this._ctx.lineWidth = this._lineWidth;
    }
  }

  state(process: () => void): void {
    this.ctx.save();
    process();
    this.ctx.restore();
  }

  background(color: Colors): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public async putImageData(imageData: ImageData, dx: number, dy: number): Promise<void> {
    const bitmap = await createImageBitmap(imageData);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(bitmap, dx, dy, this.width, this.height);
  }

  private _onResize(element: HTMLElement): void {
    const width = Math.min(element.clientWidth, this._preferredWidth);
    if (width === this._width) {
      return;
    }
    this._width = width;
    this._resize();
    this._onResizeCallbacks.forEach((callback) => callback());
  }

  private _resize(): void {
    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;
    const scale = window.devicePixelRatio;
    this._canvas.width = Math.floor(this._width * scale);
    this._canvas.height = Math.floor(this._height * scale);
    this.ctx.scale(scale, scale);
  }
}

class RootSelectorNotFound extends Error {
  constructor(root: string) {
    super(`Root element with selector: ${root} was not found`);
  }
}

class RootElementTypeError extends Error {
  constructor() {
    super(`Root element is not an HTMLElement`);
  }
}
