# Defensive Disclosure Draft: Collecting Coins for Extra Lives/Score

## Mechanic Overview
**Name:** Collecting Coins for Extra Lives/Score  
**Description:** Players collect scattered coins in the game environment to increase their score and gain extra lives. Coins are typically represented as small collectible objects that disappear upon collection.

## Technical Implementation Details
- **Coin Representation:** Yellow cube objects in 3D space
- **Collection Method:** Collision detection between player and coin objects
- **Scoring System:** +1 point per coin collected
- **Lives System:** +1 life granted every 10 coins collected
- **Respawning:** Random coin spawning maintains minimum coin count
- **UI Feedback:** Real-time score/lives display with +1 visual indicators

## Historical Context
- **First Known Use:** Donkey Kong (1981) - coin collection for scoring
- **Popularization:** Super Mario Bros. (1985) - coin collection for extra lives
- **Patent Status:** This fundamental mechanic predates modern software patents and is considered prior art

## Implementation Notes
- Uses Three.js for 3D rendering
- Collision detection via bounding box intersection
- Random spawning algorithm maintains gameplay balance
- No proprietary assets or IP-specific implementations

## Prior Art References
1. Donkey Kong (1981) - coin collection mechanics
2. Super Mario Bros. (1985) - coin collection for lives
3. Pac-Man (1980) - pellet collection for scoring
4. Various platformers from 1980s-1990s era

## Legal Analysis
This mechanic is:
- Ancient in gaming terms (over 40 years old)
- Fundamental to the medium
- Well-documented in prior art
- Not eligible for patent protection due to obviousness and prior use

## Disclosure Statement
This implementation is provided as educational reference and prior art documentation. The mechanic of collecting coins for score/lives is a fundamental gaming concept that predates modern patent systems and should remain in the public domain.

**Date:** September 16, 2025  
**Prepared by:** Open Game Mechanics Archive