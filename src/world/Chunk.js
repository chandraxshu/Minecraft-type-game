import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { TerrainGenerator } from './TerrainGenerator.js';
import { BLOCKS } from './BlockRegistry.js';

export const CHUNK_SIZE = 16;

export class Chunk {
  constructor(cx, cy, cz) {
    this.cx = cx;
    this.cy = cy;
    this.cz = cz;
    this.blocks = new Uint8Array(CHUNK_SIZE ** 3);
    this.mesh = null;
    this.generate();
  }

  index(x, y, z) {
    return x + CHUNK_SIZE * (y + CHUNK_SIZE * z);
  }

  generate() {
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let y = 0; y < CHUNK_SIZE; y++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          const wx = x + this.cx * CHUNK_SIZE;
          const wy = y + this.cy * CHUNK_SIZE;
          const wz = z + this.cz * CHUNK_SIZE;
          this.blocks[this.index(x, y, z)] =
            TerrainGenerator.getBlock(wx, wy, wz);
        }
      }
    }
  }

  buildMesh() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshLambertMaterial({ color: 0x55aa55 });
    const group = new THREE.Group();

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let y = 0; y < CHUNK_SIZE; y++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          const id = this.blocks[this.index(x, y, z)];
          if (id !== BLOCKS.AIR.id) {
            const m = new THREE.Mesh(geo, mat);
            m.position.set(
              x + this.cx * CHUNK_SIZE,
              y + this.cy * CHUNK_SIZE,
              z + this.cz * CHUNK_SIZE
            );
            group.add(m);
          }
        }
      }
    }
    this.mesh = group;
    return group;
  }
}
