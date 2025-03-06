type ObjectStructure = Record<string, (val: unknown) => boolean>;

export const isObjectLike = (val: unknown): val is object =>
  typeof val === 'object' && val !== null;

export const isStrictObject = (val: unknown): val is Record<string, unknown> =>
  isObjectLike(val) && Object.getPrototypeOf(val) === Object.prototype;

export const matchStructure = (obj: unknown, structure: ObjectStructure): boolean => {
  if (!isStrictObject(obj)) return false;

  return Object.entries(structure).every(([key, validator]) => {
    return key in obj && validator(obj[key]);
  });
};