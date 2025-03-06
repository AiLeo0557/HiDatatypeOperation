# Hi Datatype Operation [![npm version](https://img.shields.io/npm/v/hi-datatype-operation.svg)](https://www.npmjs.com/package/hi-datatype-operation)
![CI Build](https://github.com/yourname/hi-datatype-operation/actions/workflows/ci.yml/badge.svg)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/hi-datatype-operation)

**下一代 JavaScript/TypeScript 运行时数据类型检测工具**，提供原子级类型守卫、复杂结构验证与智能类型推断，让数据验证从未如此优雅。

```bash
# 安装
npm install hi-datatype-operation
# yarn
yarn add hi-datatype-operation
# pnpm
pnpm add hi-datatype-operation
```
## ✨ 核心特性
- 🔍 20+ 基础类型检测 - 包含 NaN/undefined 安全校验

- 🧩 复杂结构验证 - 支持对象/数组/元组/联合类型

- ⚡ 3KB 极致轻量 - 零依赖，Tree-Shaking 友好

- 🔗 链式操作 API - 支持流畅的类型组合操作

- 🛡️ 安全增强 - XSS 防御与原型污染防护

- 🧠 智能类型推断 - 完美同步 TypeScript 类型系统
## 🚀 快速入门
### 基础类型检测
```ts
import { isString, isNumber } from 'hi-datatype-operation';

console.log(isString('hello')); // true
console.log(isNumber(42));      // true
console.log(isNumber(NaN));     // false
```
### 对象结构验证
```ts
import { matchStructure } from 'hi-datatype-operation';

const userValidator = {
  name: isString,
  age: (v: unknown) => isNumber(v) && v > 0,
  email: (v: unknown) => isString(v) && v.includes('@')
};

const validUser = {
  name: "Alice",
  age: 28,
  email: "alice@example.com"
};

console.log(matchStructure(validUser, userValidator)); // true
```
## 📚 使用示例
### 递归类型验证
```ts
import { createRecursiveValidator } from 'hi-datatype-operation';

type TreeNode = {
  value: number;
  children?: TreeNode[];
};

const isTreeNode = createRecursiveValidator<TreeNode>({
  value: isNumber,
  children: (v) => 
    isOptional(isArray(v => isTreeNode(v)))
});

const validTree = {
  value: 1,
  children: [
    { value: 2 },
    { value: 3, children: [{ value: 4 }] }
  ]
};

console.log(isTreeNode(validTree)); // true
```
### 元组类型验证
```ts
import { isTuple } from 'hi-datatype-operation';

const is3DPoint = isTuple(
  [isNumber, isNumber, isNumber]
);

console.log(is3DPoint([1, 2, 3])); // true
console.log(is3DPoint([1, "2"]));  // false
```
### 链式操作 API
```ts
import { detect } from 'hi-datatype-operation';

const riskyInput: unknown = "<script>alert(1)</script>";

const result = detect(riskyInput)
  .filter(v => isString(v))
  .transform(v => v.replace(/<[^>]*>?/g, '')) // XSS 清洗
  .validate(v => v.length > 0);

console.log(result.value); // "alert(1)"
```
### 数据清洗管道
```ts
import { createPipeline } from 'hi-datatype-operation';

const sanitizeUserInput = createPipeline()
  .filter(isString)
  .transform(s => s.trim())
  .validate(s => s.length <= 100);

const cleanData = sanitizeUserInput.process("  Too long...".repeat(20));
console.log(cleanData.success); // false
console.log(cleanData.error);   // "Validation failed"
```

## 📖 API 文档
### 基础类型检测
| 方法名 | 参数类型 | 返回类型 | 描述 |
| --- | --- | --- | --- |
| isString | `unknown` | `boolean` | 检查值是否为字符串 |
| isNumber | `unknown` | `boolean` | 检查值是否为数字 |
| isBoolean | `unknown` | `boolean` | 检查值是否为布尔值 |
| isBigInt | `unknown` | `boolean` | 检查值是否为 BigInt | |
| isSymbol | `unknown` | `boolean` | 检查值是否为 Symbol |
| isUndefined | `unknown` | `boolean` | 检查值是否为 undefined |
| isNull | `unknown` | `boolean` | 检查值是否为 null |
| isObject | `unknown` | `boolean` | 检查值是否为对象（不包括 null） |
| isArray | `unknown` | `boolean` | 检查值是否为数组 |
| isFunction | `unknown` | `boolean` | 检查值是否为函数 |
| isDate | `unknown` | `boolean` | 检查值是否为 Date 对象 |
| isRegExp | `unknown` | `boolean` | 检查值是否为正则表达式 |
| isSet | `unknown` | `boolean` | 检查值是否为 Set 对象 |
| isMap | `unknown` | `boolean` | 检查值是否为 Map 对象 |
| isWeakSet | `unknown` | `boolean` | 检查值是否为 WeakSet 对象 |
| isWeakMap | `unknown` | `boolean` | 检查值是否为 WeakMap 对象 |
| isPromise | `unknown` | `boolean` | 检查值是否为 Promise 对象 |
| isGeneratorFunction | `unknown` | `boolean` | 检查值是否为 GeneratorFunction 对象 |
| isAsyncFunction | `unknown` | `boolean` | 检查值是否为 AsyncFunction 对象 |
| isBuffer | `unknown` | `boolean` | 检查值是否为 Buffer 对象 |
| isTypedArray | `unknown` | `boolean` | 检查值是否为 TypedArray 对象 |
| isIterable | `unknown` | `boolean` | 检查值是否为可迭代对象 |
| isFinite | `unknown` | `boolean` | 检查值是否为有限数 |
| isInteger | `unknown` | `boolean` | 检查值是否为整数 |
| isNaN | `unknown` | `boolean` | 检查值是否为 NaN |
| isSafeInteger | `unknown` | `boolean` | 检查值是否为安全整数 |
| isPrimitive | `unknown` | `boolean` | 检查值是否为原始类型（包括 null、undefined、boolean、number、string、symbol） |
| isObjectLike | `unknown` | `boolean` | 检查值是否为类对象（不包括 null） |
| isPlainObject | `unknown` | `boolean` | 检查值是否为普通对象（不包括 null、数组、函数等） |
| isEmpty | `unknown` | `boolean` | 检查值是否为空（包括 null、undefined、空字符串、空数组、空对象等） |
| isNotEmpty | `unknown` | `boolean` | 检查值是否不为空（不包括 null、undefined、空字符串、空数组、空对象等） |
| isTruthy | `unknown` | `boolean` | 检查值是否为真值（不包括 null、undefined、0、NaN、空字符串、空数组、空对象等） |
| isFalsy | `unknown` | `boolean` | 检查值是否为假值（包括 null、undefined、0、NaN、空字符串、空数组、空对象等） |
| isSameType | `unknown, unknown` | `boolean` | 检查两个值是否为相同类型 |
| isSameValue | `unknown, unknown` | `boolean` | 检查两个值是否具有相同的值（使用 Object.is） |
| isSameValueZero | `unknown, unknown` | `boolean` | 检查两个值是否具有相同的值（使用 == 运算符） |
| isSameValueStrict | `unknown, unknown` | `boolean` | 检查两个值是否具有相同的值（使用 === 运算符） |
| isSameValueLoose | `unknown, unknown` | `boolean` | 检查两个值是否具有相同的值（使用 == 运算符，但允许类型转换） |
| isSameValueStrictLoose | `unknown, unknown` | `boolean` | 检查两个值是否具有相同的值（使用 === 运算符，但允许类型转换） |
| isSameValueZeroLoose | `unknown, unknown` | `boolean` | 检查两个值是否具有相同的值（使用 == 运算符，但允许类型转换） |
### 复杂结构验证
```ts
interface StructureValidator {
  /**
   * 对象结构验证
   * @param obj - 待验证对象
   * @param blueprint - 结构蓝图
   * @param options.strict - 是否严格模式（禁止多余属性）
   */
  matchStructure<T>(
    obj: unknown,
    blueprint: StructureBlueprint<T>,
    options?: { strict?: boolean }
  ): obj is T;
}
```
### 链式操作 API
```ts
class TypeOperator {
  /**
   * 值转换管道
   * @param transformer - 转换函数
   * @example
   * detect("123").transform(Number) // 返回数字类型守卫
   */
  transform<T>(transformer: (v: CurrentType) => T): TypeOperator<T>;
}
```
## License
MIT © 2024 [杜朝辉](https://github.com/AiLeo0557)