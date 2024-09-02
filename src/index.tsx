const Swisseph = require('./NativeSwisseph').default;

export function multiply(a: number, b: number): number {
  return Swisseph.multiply(a, b);
}
