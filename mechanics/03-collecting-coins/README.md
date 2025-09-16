# Collecting Coins for Extra Lives / Score

**TL;DR:** This demo illustrates the classic platformer mechanic where players collect coins scattered in the environment to gain extra lives or increase their score. The mechanic includes coin spawning, collision detection for collection, and UI updates for lives and score.

## What this shows
- Coin spawning and placement in the 3D environment
- Collision detection for collecting coins
- Score and lives tracking
- UI display for current score and lives
- Optional: Coin respawning or limited collection

## Technical description
The demo uses Three.js to render a scene with a player character and multiple coins. Coins are represented as yellow spheres. The player can move and collect coins by colliding with them. Upon collection, the coin is removed, score increases, and occasionally an extra life is granted. The UI displays the current score and lives.

## Earliest known uses
- **Donkey Kong** (1981, Nintendo arcade) – Introduced coin collection for scoring.
- **Super Mario Bros.** (1985, Nintendo NES) – Popularized coin collection for extra lives and scoring.

## Running the demo
Open `demo-threejs/index.html` in a modern web browser. Use the arrow keys (or A/D) to move left and right, and space to jump. Collect the yellow coins to increase your score and gain extra lives.

## License
All source code and assets in this folder are dedicated to the public domain under the CC0 1.0 Universal license.