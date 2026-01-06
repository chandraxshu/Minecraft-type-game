import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { Chunk } from './Chunk.js';

export class World {
  constructor() {
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x87ceeb);

  this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const sun = new THREE.DirectionalLight(0xffffff, 1);
  sun.position.set(50, 100, 50);
  this.scene.add(sun);

  this.chunks = new Map();
}


  generateInitialChunks() {
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        const chunk = new Chunk(x, 0, z);
        this.scene.add(chunk.buildMesh());
      }
    }
  }

  update() {}
}
