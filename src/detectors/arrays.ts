export const isArrayLike = (val: unknown): val is ArrayLike<unknown> =>
  val != null && typeof (val as any)[Symbol.iterator] === 'function';

export const isUniformArray = <T>(
  arr: unknown,
  typeCheck: (val: unknown) => val is T
): arr is T[] => {
  return Array.isArray(arr) && arr.every(typeCheck);
};

export const isTuple = <T extends unknown[]>(
  arr: unknown,
  ...typeChecks: { [K in keyof T]: (val: unknown) => val is T[K] }
): arr is T => {
  return Array.isArray(arr) &&
    arr.length === typeChecks.length &&
    typeChecks.every((check, index) => check(arr[index]));
};