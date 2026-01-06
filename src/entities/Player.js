import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { applyPhysics, JUMP_FORCE } from '../physics/Physics.js';

export class Player {
  constructor(input, camera) {
    this.input = input;
    this.camera = camera;

    // Spawn high up to prevent getting stuck in generation
    this.position = new THREE.Vector3(0, 20, 0); 
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.onGround = false;

    this.speed = 8;
    this.sensitivity = 0.002;
    
    // Bounding Box size (half-width)
    this.radius = 0.3; 
  }

  update(dt) {
    // mouse look
    const { dx, dy } = this.input.consumeMouse();
    this.yaw -= dx * this.sensitivity;
    this.pitch -= dy * this.sensitivity;
    this.pitch = Math.max(-1.4, Math.min(1.4, this.pitch));

    // movement direction
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    const move = new THREE.Vector3();
    if (this.input.keys['KeyW']) move.add(forward);
    if (this.input.keys['KeyS']) move.sub(forward);
    if (this.input.keys['KeyA']) move.sub(right);
    if (this.input.keys['KeyD']) move.add(right);

    move.normalize();
    this.position.addScaledVector(move, this.speed * dt);

    // jump
    if (this.input.keys['Space'] && this.onGround) {
      this.velocity.y = JUMP_FORCE;
      this.onGround = false;
    }

    applyPhysics(this, dt);
    this.camera.follow(this);
  }
}
