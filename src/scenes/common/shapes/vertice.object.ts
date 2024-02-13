import type {Point} from '@/interfaces/point.interface';
import {Canvas} from "../elements/canvas.element";

export class VerticeObject {
  private _points: Point[] = [];
  private readonly _stroke: string | CanvasGradient | CanvasPattern;

  constructor(stroke: string | CanvasGradient | CanvasPattern = '#f00') {
    this._stroke = stroke;
  }

  public addPoint(x: number, y: number): void {
    this._points.push({x, y});
  }

  public draw(): void {
    if (this._points.length < 2) {
      return;
    }
    Canvas.ctx.strokeStyle = this._stroke;
    Canvas.ctx.beginPath();
    Canvas.ctx.moveTo(this._points[0].x, this._points[0].y);
    this._points.forEach(point => {
      Canvas.ctx.lineTo(point.x, point.y);
    });
    Canvas.ctx.stroke();
  }

  public reset(): void {
    this._points = [];
  }
}