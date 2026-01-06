import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export class Player {
  constructor(scene, input, camera) {
    this.input = input;
    this.camera = camera;

    this.position = new THREE.Vector3(0, 10, 0);
    this.velocity = new THREE.Vector3();

    this.yaw = 0;
    this.pitch = 0;

    this.speed = 6;
    this.gravity = -30;
    this.jumpForce = 10;
    this.onGround = false;

    // VISIBLE PLAYER BODY
    const geo = new THREE.CapsuleGeometry(0.4, 1.2, 4, 8);
    const mat = new THREE.MeshStandardMaterial({ color: 0x4444ff });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.copy(this.position);
    scene.add(this.mesh);
  }

  update(dt) {
    // mouse look
    const { dx, dy } = this.input.consumeMouse();
    this.yaw -= dx * 0.002;
    this.pitch -= dy * 0.002;
    this.pitch = Math.max(-1.4, Math.min(1.4, this.pitch));

    // movement direction
    const forward = new THREE.Vector3(
      Math.sin(this.yaw), 0, Math.cos(this.yaw)
    );
    const right = new THREE.Vector3(
      Math.cos(this.yaw), 0, -Math.sin(this.yaw)
    );

    const move = new THREE.Vector3();
    if (this.input.keys['KeyW']) move.add(forward);
    if (this.input.keys['KeyS']) move.sub(forward);
    if (this.input.keys['KeyA']) move.sub(right);
    if (this.input.keys['KeyD']) move.add(right);

    move.normalize();
    this.position.addScaledVector(move, this.speed * dt);

    // gravity
    this.velocity.y += this.gravity * dt;
    this.position.y += this.velocity.y * dt;

    // ground collision (temporary flat ground)
    if (this.position.y < 1.6) {
      this.position.y = 1.6;
      this.velocity.y = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    if (this.input.keys['Space'] && this.onGround) {
      this.velocity.y = this.jumpForce;
    }
