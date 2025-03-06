import { describe, expect, test } from 'vitest';
import {
  isString,
  isNumber,
  isNumeric
} from '../src/detectors/primitives';

describe('基础类型检测', () => {
  test('isString 准确识别字符串', () => {
    expect(isString('hello')).toBe(true);
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  test('isNumber 排除NaN值', () => {
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(true);
  });

  test('isNumeric 识别数值字符串', () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('12.3')).toBe(true);
    expect(isNumeric('abc')).toBe(false);
  });
});