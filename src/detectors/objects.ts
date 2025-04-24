type ObjectStructure = Record<string, (val: unknown) => boolean>;
type EmptyStrictObject = Record<string, never>;
type StrictObject = Record<string, unknown>;
export type DataType =
  "undefined" |
  "null" |
  "boolean" |
  "number" |
  "string" |
  "symbol" |
  "function" |
  "array" |
  "date" |
  "regexp" |
  "promise" |
  "error" |
  "object"

const objectToString: typeof Object.prototype.toString =
  Object.prototype.toString;


export function getDataType(data: any): DataType {
  // 使用Object.prototype.toString.call()方法获取数据类型
  return objectToString.call(data).slice(8, -1).toLowerCase();
}
// 检测对象类型
export const isObjectLike = (val: unknown): val is object =>
  typeof val === 'object' && val !== null;
// 检测严格对象
export const isStrictObject = (val: unknown): val is StrictObject =>
  getDataType(val) === 'object';

// 检测空对象
export const isEmptyObject = (val: unknown): val is EmptyStrictObject => {
  if (!isStrictObject(val)) return false;
  return Object.keys(val).length === 0;
}
// 检测非空对象
export const isNotEmptyObject = (val: unknown): val is StrictObject => {
  if (!isStrictObject(val)) return false;
  return Object.keys(val).length > 0;
}
// 检测对象结构
export const matchStructure = (obj: unknown, structure: ObjectStructure): boolean => {
  if (!isStrictObject(obj)) return false;
  return Object.entries(structure).every(([key, validator]) => {
    return key in obj && validator(obj[key]);
  });
};
// 检测对象是否是Function
export const isFunction = (val: unknown): val is Function => getDataType(val) === 'function';