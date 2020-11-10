import { isString } from '@stlmpp/utils';

export type CompareFn<T = any> = (valueA: T, valueB: T) => boolean;
export const compareByFactory = <T = any>(key: keyof T): CompareFn<T> => (valueA, valueB) =>
  valueA?.[key] === valueB?.[key];

export function convertToBoolProperty(val: any): boolean {
  if (isString(val)) {
    val = val.toLowerCase().trim();
    return val === 'true' || val === '';
  }
  return !!val;
}
