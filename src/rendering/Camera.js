import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  setFirstPerson(player) {
    this.camera.position.set(
      player.position.x,
      player.position.y + 0.6,
      player.position.z
    );

    this.camera.rotation.set(
      player.pitch,
      player.yaw,
      0,
      'YXZ'
    );
  }
}
