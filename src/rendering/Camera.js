import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export class Camera {
  constructor(dom) {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.distance = 6;
    this.height = 2;

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  follow(player) {
    const offset = new THREE.Vector3(
      Math.sin(player.yaw) * this.distance,
      this.height,
      Math.cos(player.yaw) * this.distance
    );

    this.camera.position.copy(player.position).add(offset);
    this.camera.lookAt(
      player.position.x,
      player.position.y + 1.2,
      player.position.z
    );
  }

  update() {}
}
