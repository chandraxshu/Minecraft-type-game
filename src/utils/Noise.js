export function noise(x, z) {
  const v = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return v - Math.floor(v); // proper 0..1 noise
}
