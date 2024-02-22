export class ImageLoader {
  private readonly _images: Map<string, HTMLImageElement> = new Map([]);

  load(name: string, src: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => {
        this._images.set(name, image);
        resolve();
      };
      image.onerror = () => {
        resolve();
      };
      image.src = src;
    });
  }

  get(name: string): HTMLImageElement {
    if (!this._images.has(name)) {
      return new Image();
    }
    return this._images.get(name)!;
  }
}
