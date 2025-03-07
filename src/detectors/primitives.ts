// 用于检测基本类型的工具函数
// 基本类型：string、number、boolean、symbol、null、undefined
export type Primitive = string | number | boolean | symbol | null | undefined;
// 除了 null、undefined 以外的 Primitive 基本类型
export type NonNullablePrimitive = Exclude<Primitive, null | undefined>;
// 精确类型谓词检测
export type Nuneric = number | string;

// 精确类型谓词检测
export const isString = (val: unknown): val is string =>
  typeof val === 'string';

// 精确类型谓词检测
export const isNumber = (val: unknown): val is number =>
  typeof val === 'number' && !Number.isNaN(val);

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean';

export const isNull = (val: unknown): val is null =>
  val === null;

export const isUndefined = (val: unknown): val is undefined =>
  val === undefined;

// 复合类型检测
export const isNumeric = (val: unknown): val is Nuneric =>
  isNumber(val) || (isString(val) && !Number.isNaN(Number(val)));

export const isPrimitive = (val: unknown): val is Primitive =>
  val === null || (typeof val !== 'object' && typeof val !== 'function');

// 复合类型检测
export const isNonNullablePrimitive = (val: unknown): val is NonNullablePrimitive =>
  val !== null && val !== undefined && isPrimitive(val);
