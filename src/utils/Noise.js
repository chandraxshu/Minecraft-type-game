export function noise(x, z) {
  // Simple smoothing function (Combination of Sines)
  // In a real app, use SimplexNoise, but this works without external dependencies
  return (Math.sin(x) + Math.sin(z) + Math.sin(x * 0.5 + z * 0.5)) / 3;
}
