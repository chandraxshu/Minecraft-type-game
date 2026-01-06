import { noise } from '../utils/Noise.js';
import { BLOCKS } from './BlockRegistry.js';

export class TerrainGenerator {
  static getBlock(x, y, z) {
    // Scale inputs down for wider hills
    const n = noise(x * 0.1, z * 0.1); 
    
    // Map -1..1 to Height 4..12
    const height = Math.floor((n + 1) * 4 + 4); 

    if (y > height) return BLOCKS.AIR.id;
    if (y === height) return BLOCKS.GRASS.id;
    if (y > height - 3) return BLOCKS.DIRT.id;
    return BLOCKS.STONE.id;
  }
}
