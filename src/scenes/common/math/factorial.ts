export function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Negative numbers don\'t have a factorial');
  }
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}