export class Canvas {

  private static _id: string | undefined;

  private static _canvas: HTMLCanvasElement | undefined;

  private static _ctx: CanvasRenderingContext2D | undefined;

  private static _width: number | undefined;

  private static _height: number | undefined;

  static get id(): string {
    if (!this._id) {
      throw new Error('Canvas was not initialized');
    }
    return this._id;
  }

  static get canvas(): HTMLCanvasElement {
    if (!this._canvas) {
      const element = document.getElementById(this.id);
      if (!element) {
        throw new Error(`Canvas with id ${this.id} was not found`);
      }
      if (!(element instanceof HTMLCanvasElement)) {
        throw new Error(`Element ${element.tagName} is not a canvas`);
      }
      this._canvas = element as HTMLCanvasElement;
    }
    return this._canvas;
  }

  static get ctx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      this._ctx = this.canvas.getContext('2d')!;
    }
    return this._ctx;
  }

  static get width(): number {
    if (!this._width) {
      throw new Error('Canvas was not initialized');
    }
    return this._width;
  }

  static get height(): number {
    if (!this._height) {
      throw new Error('Canvas was not initialized');
    }
    return this._height;
  }

  static init(id: string, width: number, height: number): void {
    this._id = id;
    this._width = width;
    this._height = height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    const scale = window.devicePixelRatio;
    this.canvas.width = Math.floor(width * scale);
    this.canvas.height = Math.floor(height * scale);
    this.ctx.scale(scale, scale);
  }
}
