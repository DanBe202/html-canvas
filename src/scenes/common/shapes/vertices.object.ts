import type {Point} from '@/interfaces/point.interface';
import type { Canvas } from '@/scenes/common/elements/canvas.element';
import { Colors } from '@/scenes/common/colors';

export class VerticesObject {
  private _points: Point[] = [];
  private readonly _stroke: string | CanvasGradient | CanvasPattern;

  constructor(public readonly canvas: Canvas, stroke: string | CanvasGradient | CanvasPattern = Colors.FireEngineRed) {
    this._stroke = stroke;
  }

  public addPoint(x: number, y: number): void {
    this._points.push({x, y});
  }

  public draw(): void {
    if (this._points.length < 2) {
      return;
    }
    this.canvas.ctx.strokeStyle = this._stroke;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(this._points[0].x, this._points[0].y);
    this._points.forEach(point => {
      this.canvas.ctx.lineTo(point.x, point.y);
    });
    this.canvas.ctx.stroke();
  }

  public reset(): void {
    this._points = [];
  }

  public static line(canvas: Canvas, x1: number, y1: number, x2: number, y2: number, stroke: Colors): void {
    canvas.ctx.strokeStyle = stroke;
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(x1, y1);
    canvas.ctx.lineTo(x2, y2);
    canvas.ctx.stroke();
  }
}
