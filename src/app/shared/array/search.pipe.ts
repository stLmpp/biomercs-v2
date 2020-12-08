import { Pipe, PipeTransform } from '@angular/core';

export function normalize(str: any): string {
  return (str ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function search<T, K extends keyof T>(array: T[], key: K, term: string): T[] {
  term = normalize(term).toLowerCase();
  array ??= [];
  if (!term) {
    return array;
  }
  return array.filter(item => normalize(item[key]).toLowerCase().includes(term));
}

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform<T = any, K extends keyof T = keyof T>(value: T[], key: K, term: string): T[] {
    return search(value, key, term);
  }
}
