export class PointCache<T> {
  private readonly _cache: Record<string, T> = {};
  // private readonly _cache: (T | undefined)[][];

  constructor(sizeRow: number, sizeCols: number) {
    // this._cache = new Array(sizeRow).fill(new Array(sizeCols).fill(undefined));
  }


  public set(x: number, y: number, value: T): void {
    this._cache[`${x}:${y}`] = value;
    // this._cache[x][y] = value;
  }

  public get(x: number, y: number): T | undefined;
  public get(x: number, y: number, defaultValueFn: () => T): T;
  public get(x: number, y: number, defaultValueFn?: () => T): T | undefined {
    let value = this._cache[`${x}:${y}`];
    // let value = this._cache[x][y];
    if (value === undefined) {
      if (!defaultValueFn) {
        return undefined;
      }
      value = defaultValueFn();
      this.set(x, y, value);
    }
    return value;
  }
}