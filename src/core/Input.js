export class Input {
  constructor(dom) {
    this.keys = {};
    this.mouseDX = 0;
    this.mouseDY = 0;

    window.addEventListener('keydown', e => this.keys[e.code] = true);
    window.addEventListener('keyup', e => this.keys[e.code] = false);

    dom.addEventListener('click', () => dom.requestPointerLock());

    document.addEventListener('mousemove', e => {
      if (document.pointerLockElement === dom) {
        this.mouseDX += e.movementX;
        this.mouseDY += e.movementY;
      }
    });
  }

  consumeMouse() {
    const dx = this.mouseDX;
    const dy = this.mouseDY;
    this.mouseDX = this.mouseDY = 0;
    return { dx, dy };
  }
}
