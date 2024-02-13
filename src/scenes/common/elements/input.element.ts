export abstract class InputElement<T> {
  protected readonly _element: HTMLInputElement;

  get element(): HTMLInputElement {
    return this._element;
  }

  abstract get value(): T;

  constructor(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id ${elementId} does not exist`);
    }
    if (!(element instanceof HTMLInputElement)) {
      throw new Error(`Element is not an input element`);
    }
    if (!this._checkElementType(element)) {
      throw new Error(`Element is a ${element.type}`);
    }
    this._element = element;
  }

  protected abstract _checkElementType(element: HTMLInputElement): boolean;

  onChange(callback: (value: T) => void): void {
    this._element.addEventListener('input', () => {
      callback(this.value);
    });
  }
}
