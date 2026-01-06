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
          this.blocks[this.index(x, y, z)] = TerrainGenerator.getBlock(wx, wy, wz);
        }
      }
    }
  }

  buildMesh() {
    // 1. Count visible blocks to initialize InstancedMesh
    let count = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i] !== BLOCKS.AIR.id) count++;
    }

    if (count === 0) return new THREE.Group();

    // 2. Create Instance Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff }); // Color handles per-instance
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    
    // Helper to position instances
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    let i = 0;

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let y = 0; y < CHUNK_SIZE; y++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          const blockId = this.blocks[this.index(x, y, z)];
          
          if (blockId !== BLOCKS.AIR.id) {
            // Position
            dummy.position.set(
              x + this.cx * CHUNK_SIZE,
              y + this.cy * CHUNK_SIZE,
              z + this.cz * CHUNK_SIZE
            );
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);

            // Color based on Block ID
            if (blockId === BLOCKS.GRASS.id) color.setHex(0x55aa55);
            else if (blockId === BLOCKS.DIRT.id) color.setHex(0x8b4513);
            else if (blockId === BLOCKS.STONE.id) color.setHex(0x888888);
            else color.setHex(0xff00ff); // Error pink

            mesh.setColorAt(i, color);
            i++;
          }
        }
      }
    }

    this.mesh = mesh;
    return mesh;
  }
}
