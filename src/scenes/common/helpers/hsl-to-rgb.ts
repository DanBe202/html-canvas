export function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
  const a: number = s * Math.min(l, 1 - l);
  const f = (n: number, k: number = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}
