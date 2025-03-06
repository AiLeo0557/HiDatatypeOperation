import { isNumber, isString } from "./primitives";

// 类型组合器
export const isOneOf = <T extends unknown[]>(
  ...validators: { [K in keyof T]: (val: unknown) => val is T[K] }
) => (val: unknown): val is T[number] => {
  return validators.some(validator => validator(val));
};

// 链式API构造器
export class TypeDetector {
  constructor(private value: unknown) { }

  get isString() {
    return isString(this.value);
  }

  get isNumber() {
    return isNumber(this.value);
  }

  matches<T>(validator: (val: unknown) => val is T): boolean {
    return validator(this.value);
  }
}

export const detect = (value: unknown) => new TypeDetector(value);