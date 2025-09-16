# ✅ COMPLETED: Collecting Coins for Extra Lives/Score

## Mechanic Details

**Name:** Collecting Coins for Extra Lives/Score  
**Description:** Players collect scattered coins in the game environment to increase their score and gain extra lives. This fundamental platformer mechanic involves coin spawning, collision detection, and UI feedback systems.

## Implementation Features
- ✅ **Coin Objects:** Yellow cubes randomly placed in 3D space
- ✅ **Collection System:** Collision detection removes coins on contact
- ✅ **Scoring:** +1 point per coin collected
- ✅ **Lives System:** +1 extra life every 10 coins collected
- ✅ **Random Spawning:** Maintains minimum 5 coins on the map
- ✅ **Visual Feedback:** Green +1 indicators for score/lives changes
- ✅ **UI Display:** Real-time score and lives counters
- ✅ **Controls:** WASD/Arrow keys for movement, Space for jumping

## Technical Specifications
- **Framework:** Three.js WebGL
- **Collision:** Bounding box intersection detection
- **Rendering:** Real-time 3D graphics
- **Input:** Keyboard controls (accessible)
- **Performance:** Optimized for 60 FPS

## Historical Context
- **Earliest Use:** Donkey Kong (1981) - coin collection for scoring
- **Popularization:** Super Mario Bros. (1985) - coin collection for extra lives
- **Patent Status:** Prior art - fundamental mechanic predating modern patents

## Demo Location
📁 `mechanics/03-collecting-coins/demo-threejs/`  
🌐 Run locally: `http-server` in project root, visit `/mechanics/03-collecting-coins/demo-threejs/`

## Files Modified
- `main.js` - Core game logic, collision detection, scoring
- `index.html` - UI elements, styling, HUD display
- `README.md` - Documentation and instructions
- `metadata.json` - Mechanic metadata

## Testing Completed
- ✅ Functionality verification
- ✅ Performance testing (60 FPS)
- ✅ Accessibility (keyboard controls)
- ✅ Cross-browser compatibility
- ✅ Edge case handling

## Prior Art Documentation
📄 Defensive disclosure draft prepared and included in mechanic folder.

## Status: READY FOR CLOSURE
This implementation fully demonstrates the collecting coins mechanic with modern 3D graphics and interactive features. The demo serves as both educational reference and prior art documentation.

**Completed:** September 16, 2025  
**Commits:** 
- `cb04cff` - Implement collecting coins demo. Closes #3
- `dc69153` - Add faster coin spawning and green +1 indicators