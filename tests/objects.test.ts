import { describe, expect, test } from 'vitest';
import {
  isObjectLike,
  isStrictObject,
  isEmptyObject,
  matchStructure,
} from '../src/detectors/objects';

describe('对象类型检测', () => {
  test('isObjectLike', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike(null)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
    expect(isObjectLike(123)).toBe(false);
    expect(isObjectLike('123')).toBe(false);
    expect(isObjectLike(true)).toBe(false);
    expect(isObjectLike(false)).toBe(false);
  });

  test('isStrictObject', () => {
    expect(isStrictObject({})).toBe(true);
    expect(isStrictObject([])).toBe(false); // 数组不是严格对象
    expect(isStrictObject(null)).toBe(false);
    expect(isStrictObject(undefined)).toBe(false);
    expect(isStrictObject(123)).toBe(false);
    expect(isStrictObject('123')).toBe(false);
    expect(isStrictObject(true)).toBe(false);
    expect(isStrictObject(false)).toBe(false);
  });

  test('isEmptyObject', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
    expect(isEmptyObject(undefined)).toBe(false);
    expect(isEmptyObject(123)).toBe(false);
    expect(isEmptyObject('123')).toBe(false);
    expect(isEmptyObject(true)).toBe(false);
    expect(isEmptyObject(false)).toBe(false);
  });
})