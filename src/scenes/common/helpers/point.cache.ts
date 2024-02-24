export class PointCache<T> {
  // private readonly _cache: Record<string, T> = {};
  private readonly _cache: (T | undefined)[];
  private readonly _length: number;

  constructor(size: number, sizeRow: number = 1) {
    this._cache = new Array(size * sizeRow).fill(undefined);
    this._length = size;
  }

  public set(x: number, y: number, value: T): void {
    // this._cache[`${x}:${y}`] = value;
    this._cache[x * this._length + y] = value;
  }

  public get(x: number, y: number): T | undefined;
  public get(x: number, y: number, defaultValueFn: () => T): T;
  public get(x: number, y: number, defaultValueFn?: () => T): T | undefined {
    // let value = this._cache[`${x}:${y}`];
    let value = this._cache[x * this._length + y];
    if (value === undefined) {
      if (!defaultValueFn) {
        return undefined;
      }
      value = defaultValueFn();
      this.set(x, y, value);
    }
    return value;
  }

  public reset(): void {
    this._cache.fill(undefined);
  }
}