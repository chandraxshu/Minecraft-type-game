import { Renderer } from '../rendering/Renderer.js';
import { Camera } from '../rendering/Camera.js';
import { Loop } from './Loop.js';
import { World } from '../world/World.js';
import { Input } from './Input.js';
import { Player } from '../entities/Player.js';

export class Game {
  constructor() {
    this.renderer = new Renderer();
    this.camera = new Camera(this.renderer.domElement);
    this.input = new Input(this.renderer.domElement);
    this.world = new World();

    this.player = new Player(this.input, this.camera);
    this.loop = new Loop(this.update.bind(this), this.render.bind(this));
  }

  start() {
    this.world.generateInitialChunks();
    this.loop.start();
  }

  update(dt) {
    this.player.update(dt);
  }

  render() {
    this.renderer.render(this.world.scene, this.camera.camera);
  }
}
