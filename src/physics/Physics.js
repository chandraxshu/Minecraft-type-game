export const GRAVITY = -25;
export const JUMP_FORCE = 10;
export const PLAYER_HEIGHT = 1.8;

export function applyPhysics(player, dt) {
  player.velocity.y += GRAVITY * dt;
  player.position.addScaledVector(player.velocity, dt);

  // simple ground collision
  if (player.position.y < PLAYER_HEIGHT) {
    player.position.y = PLAYER_HEIGHT;
    player.velocity.y = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}
