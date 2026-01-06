import { noise } from '../utils/Noise.js';
import { BLOCKS } from './BlockRegistry.js';

export class TerrainGenerator {
  static getBlock(x, y, z) {
    const height = Math.floor(noise(x * 0.05, z * 0.05) * 10 + 10);
    if (y > height) return BLOCKS.AIR.id;
    if (y === height) return BLOCKS.GRASS.id;
    if (y > height - 3) return BLOCKS.DIRT.id;
    return BLOCKS.STONE.id;
  }
}
