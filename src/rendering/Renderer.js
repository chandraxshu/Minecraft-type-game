
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.domElement = this.renderer.domElement;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
