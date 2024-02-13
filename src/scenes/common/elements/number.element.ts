import {InputElement} from './input.element';

export class NumberElement extends InputElement<number> {

  get value(): number {
    return +this._element.value;
  }

  protected _checkElementType(element: HTMLInputElement): boolean {
    return element.type === 'number';
  }
}
