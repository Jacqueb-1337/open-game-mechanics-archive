# Jumping / Stomping Enemies

**TL;DR:** This demo illustrates the classic platformer mechanic where a player character jumps and can defeat enemies by landing on them from above. The mechanic includes gravity, variable jump arcs, and a downward collision check to determine if the enemy is stomped.

## What this shows
- Player movement in a 2D/3D space using a single input to jump.
- A jump arc is implemented with gravity
- Enemy defeat triggered when the player collides with the enemy from above.
- Bounce-back effect after stomping.
- Reset button to restart the demo.

## Technical description
The demo uses Three.js to render a simple scene with a player and an enemy. The player can move horizontally and initiate a jump by pressing the space bar. Gravity is applied each frame to create a parabolic jump arc. Collision detection checks if the player's bounding box intersects the enemy's and whether the player’s vertical velocity is directed downward at the moment of impact. If so, the enemy is removed and the player bounces slightly.

## Earliest known uses
- **Donkey Kong** (1981, Nintendo arcade) – introduced jumping as a primary way to navigate obstacles.
- **Super Mario Bros.** (1985, Nintendo NES) – popularized jumping to defeat enemies such as Goombas.

## Running the demo
Open `demo-threejs/index.html` in a modern web browser. The file loads Three.js from a CDN and executes the demo. Use the arrow keys (or A/D) to move left and right, and press the space bar to jump. Land on the enemy to defeat it. Use the "Reset" button in the top-right to restart the demo.

## License
All source code and assets in this folder are dedicated to the public domain under the CC0 1.0 Universal license.
