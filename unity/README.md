# DreamQuest Unity Project

This Unity project is responsible for generating the playable WebGL worlds from dream blueprints.

## Setup

1. Open this folder as a Unity project (Unity 2022.3 LTS or later recommended)
2. The main scene should contain:
   - Main Camera with `FirstPersonController` script
   - Directional Light
   - BlueprintLoader GameObject with the `BlueprintLoader` script attached
   - WeatherParticles GameObject with a Particle System

## Required Prefabs

Create and assign these prefabs in the BlueprintLoader component:

- **BirdPrefab**: A simple bird model (can be a cube with wings)
- **TreePrefab**: A tree model (low-poly tree for performance)
- **HousePrefab**: A house model (simple cube house)
- **PersonPrefab**: A character model (simple humanoid)
- **TerrainPrefab**: A terrain plane or Unity terrain

## Blueprint JSON Structure

The `BlueprintLoader.cs` script expects JSON in this format:

```json
{
  "world": "forest",
  "time": "night",
  "weather": "feathers_rain",
  "goal": "follow_bird_to_flying_house",
  "characters": [
    { "type": "bird", "role": "guide" },
    { "type": "house", "float": true }
  ],
  "style": "lowpoly",
  "mood": "mystic"
}
```

## WebGL Build Process

1. File → Build Settings
2. Select WebGL platform
3. Click "Switch Platform"
4. Set "Compression Format" to Disabled (for easier debugging) or Gzip
5. Build to `/frontend/public/webgl/{jobId}/`
6. The build will create:
   - `index.html`
   - `Build/` folder with .wasm, .data, .framework.js, .loader.js

## StreamingAssets

Place test `blueprint.json` files in `Assets/StreamingAssets/` for testing in the Editor.

## URL Parameters

When deployed, the WebGL build can receive the blueprint URL via:
```
https://yoursite.com/webgl/job123/index.html?blueprintUrl=/v1/jobs/job123/blueprint
```

## First Person Controller

You'll need to add a first-person controller script or use Unity's Starter Assets package:
- WASD/Arrow keys for movement
- Mouse for looking around
- Spacebar for jump

## Production Considerations

For production deployment:

1. **Optimize builds**: Enable compression, strip unnecessary code
2. **Asset optimization**: Use texture atlases, LOD systems
3. **Loading screens**: Add custom loading UI
4. **Error handling**: Graceful fallbacks if blueprint fails to load
5. **Performance**: Target 60 FPS on mid-range hardware
6. **Mobile**: Consider mobile WebGL builds with touch controls
7. **Cloud Build**: Integrate with Unity Cloud Build for automated builds
