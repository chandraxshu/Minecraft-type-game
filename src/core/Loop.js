export class Loop {
  constructor(update, render) {
    this.update = update;
    this.render = render;
    this.last = performance.now();
  }

  start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  tick(time) {
    const dt = (time - this.last) / 1000;
    this.last = time;
    this.update(dt);
    this.render();
    requestAnimationFrame(this.tick.bind(this));
  }
}
