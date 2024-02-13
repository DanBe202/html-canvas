export class Canvas {

  private _setup: boolean = false;

  private readonly _id: string = Math.random().toString(16).slice(2);

  private readonly _root: string;

  private readonly _canvas: HTMLCanvasElement = document.createElement('canvas');

  private readonly _ctx: CanvasRenderingContext2D | null = this._canvas.getContext('2d');

  private readonly _width: number;

  private readonly _height: number;

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get ctx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      throw new Error('Error while obtaining canvas 2d context');
    }
    return this._ctx;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(root: string, width: number, height: number) {
    this._root = root;
    this._width = width;
    this._height = height;
    this._canvas.setAttribute('id', this._id);
    this._resize();
    try {
      this.setup();
    } catch (error) {
      console.warn('Canvas was not initialized in constructor');
    }
  }

  setup(): void {
    if (this._setup) {
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
    this._setup = true;
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
