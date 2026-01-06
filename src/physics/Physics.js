import { TerrainGenerator } from '../world/TerrainGenerator.js';
import { BLOCKS } from '../world/BlockRegistry.js';

export const GRAVITY = -25;
export const JUMP_FORCE = 10;
export const PLAYER_HEIGHT = 1.8;

export function applyPhysics(player, dt) {
  // Apply Gravity
  player.velocity.y += GRAVITY * dt;
  player.position.y += player.velocity.y * dt;

  // Collision Detection
  // We check the block directly below the player's feet
  const x = Math.round(player.position.x);
  const z = Math.round(player.position.z);
  // Feet position (roughly)
  const y = Math.floor(player.position.y - PLAYER_HEIGHT);

  const blockBelow = TerrainGenerator.getBlock(x, y, z);

  if (blockBelow !== BLOCKS.AIR.id) {
    // We hit the ground
    // Snap to top of block (y + 1) + player height
    const groundLevel = y + 1 + PLAYER_HEIGHT;
    
    // Only snap if we are falling onto it, not jumping up through it
    if (player.velocity.y <= 0 && player.position.y < groundLevel) {
       player.position.y = groundLevel;
       player.velocity.y = 0;
       player.onGround = true;
       return;
    }
  }

  player.onGround = false;
}
