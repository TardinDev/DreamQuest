using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

/// <summary>
/// Blueprint data structure matching the JSON from the API
/// </summary>
[Serializable]
public class BlueprintCharacter
{
    public string type;
    public string role;
    public bool? @float; // nullable bool
}

[Serializable]
public class Blueprint
{
    public string world;
    public string time;
    public string weather;
    public string goal;
    public List<BlueprintCharacter> characters;
    public string style;
    public string mood;
}

/// <summary>
/// Loads blueprint JSON and dynamically constructs the Unity scene
/// This is the runtime script that makes the dream world playable
/// </summary>
public class BlueprintLoader : MonoBehaviour
{
    [Header("Prefab References")]
    public GameObject birdPrefab;
    public GameObject treePrefab;
    public GameObject housePrefab;
    public GameObject personPrefab;
    public GameObject terrainPrefab;

    [Header("Scene References")]
    public Light directionalLight;
    public Camera mainCamera;
    public ParticleSystem weatherParticleSystem;

    [Header("Configuration")]
    public string blueprintUrl = ""; // Can be set via URL param or StreamingAssets

    private Blueprint blueprint;

    void Start()
    {
        // Try to get blueprint URL from URL parameters (WebGL)
        #if UNITY_WEBGL && !UNITY_EDITOR
        string urlParam = GetURLParameter("blueprintUrl");
        if (!string.IsNullOrEmpty(urlParam))
        {
            blueprintUrl = urlParam;
        }
        #endif

        // Default to local blueprint.json in StreamingAssets
        if (string.IsNullOrEmpty(blueprintUrl))
        {
            blueprintUrl = System.IO.Path.Combine(Application.streamingAssetsPath, "blueprint.json");
        }

        StartCoroutine(LoadAndBuildWorld());
    }

    IEnumerator LoadAndBuildWorld()
    {
        Debug.Log($"Loading blueprint from: {blueprintUrl}");

        // Load blueprint JSON
        UnityWebRequest request = UnityWebRequest.Get(blueprintUrl);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError($"Failed to load blueprint: {request.error}");
            yield break;
        }

        string json = request.downloadHandler.text;
        Debug.Log($"Blueprint JSON: {json}");

        // Parse JSON
        try
        {
            blueprint = JsonUtility.FromJson<Blueprint>(json);
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to parse blueprint JSON: {e.Message}");
            yield break;
        }

        // Build the world based on blueprint
        BuildWorld();
    }

    void BuildWorld()
    {
        Debug.Log($"Building world: {blueprint.world} - {blueprint.mood}");

        // 1. Configure lighting based on time of day
        ConfigureLighting();

        // 2. Setup weather effects
        ConfigureWeather();

        // 3. Instantiate terrain/environment
        InstantiateTerrain();

        // 4. Instantiate characters and objects
        InstantiateCharacters();

        Debug.Log("World building complete!");
    }

    void ConfigureLighting()
    {
        if (directionalLight == null) return;

        switch (blueprint.time)
        {
            case "night":
                directionalLight.intensity = 0.3f;
                directionalLight.color = new Color(0.5f, 0.6f, 0.8f); // Blue tint
                RenderSettings.ambientLight = new Color(0.1f, 0.1f, 0.2f);
                break;

            case "day":
                directionalLight.intensity = 1.0f;
                directionalLight.color = Color.white;
                RenderSettings.ambientLight = new Color(0.5f, 0.5f, 0.5f);
                break;

            case "sunset":
                directionalLight.intensity = 0.7f;
                directionalLight.color = new Color(1.0f, 0.6f, 0.4f); // Orange tint
                RenderSettings.ambientLight = new Color(0.4f, 0.3f, 0.2f);
                break;

            case "dawn":
                directionalLight.intensity = 0.6f;
                directionalLight.color = new Color(1.0f, 0.8f, 0.6f); // Warm tint
                RenderSettings.ambientLight = new Color(0.3f, 0.3f, 0.4f);
                break;
        }

        // Mood-based color grading (simplified)
        switch (blueprint.mood)
        {
            case "mystic":
                RenderSettings.fogColor = new Color(0.5f, 0.3f, 0.7f);
                RenderSettings.fog = true;
                RenderSettings.fogDensity = 0.02f;
                break;

            case "calm":
                RenderSettings.fogColor = new Color(0.7f, 0.8f, 0.9f);
                RenderSettings.fog = true;
                RenderSettings.fogDensity = 0.01f;
                break;

            case "tense":
                RenderSettings.fogColor = new Color(0.3f, 0.2f, 0.2f);
                RenderSettings.fog = true;
                RenderSettings.fogDensity = 0.03f;
                break;

            case "nostalgic":
                RenderSettings.fogColor = new Color(0.8f, 0.7f, 0.6f);
                RenderSettings.fog = true;
                RenderSettings.fogDensity = 0.015f;
                break;
        }
    }

    void ConfigureWeather()
    {
        if (weatherParticleSystem == null) return;

        switch (blueprint.weather)
        {
            case "feathers_rain":
                // Configure particle system for feathers falling
                var main = weatherParticleSystem.main;
                main.startSpeed = 1.0f;
                main.startSize = 0.2f;
                main.startLifetime = 5.0f;

                var emission = weatherParticleSystem.emission;
                emission.rateOverTime = 20;

                weatherParticleSystem.Play();
                break;

            case "rain":
                var mainRain = weatherParticleSystem.main;
                mainRain.startSpeed = 10.0f;
                mainRain.startSize = 0.05f;

                var emissionRain = weatherParticleSystem.emission;
                emissionRain.rateOverTime = 100;

                weatherParticleSystem.Play();
                break;

            case "fog":
                // Fog is handled in lighting
                weatherParticleSystem.Stop();
                break;

            default:
                weatherParticleSystem.Stop();
                break;
        }
    }

    void InstantiateTerrain()
    {
        if (terrainPrefab == null)
        {
            Debug.LogWarning("Terrain prefab not assigned");
            return;
        }

        // Instantiate terrain at origin
        GameObject terrain = Instantiate(terrainPrefab, Vector3.zero, Quaternion.identity);
        terrain.name = $"Terrain_{blueprint.world}";
    }

    void InstantiateCharacters()
    {
        if (blueprint.characters == null || blueprint.characters.Count == 0)
        {
            Debug.LogWarning("No characters in blueprint");
            return;
        }

        foreach (var character in blueprint.characters)
        {
            GameObject prefab = GetPrefabForCharacter(character.type);

            if (prefab == null)
            {
                Debug.LogWarning($"No prefab found for character type: {character.type}");
                continue;
            }

            // Random position around the player (who starts at origin)
            Vector3 position = new Vector3(
                UnityEngine.Random.Range(-10f, 10f),
                character.@float == true ? 5f : 0f,
                UnityEngine.Random.Range(-10f, 10f)
            );

            GameObject instance = Instantiate(prefab, position, Quaternion.identity);
            instance.name = $"{character.type}_{character.role}";

            // Add floating behavior if needed
            if (character.@float == true)
            {
                var floater = instance.AddComponent<FloatingObject>();
                floater.amplitude = 0.5f;
                floater.frequency = 1.0f;
            }
        }
    }

    GameObject GetPrefabForCharacter(string type)
    {
        switch (type.ToLower())
        {
            case "bird":
                return birdPrefab;
            case "tree":
                return treePrefab;
            case "house":
                return housePrefab;
            case "person":
                return personPrefab;
            default:
                return null;
        }
    }

    // WebGL URL parameter parsing
    #if UNITY_WEBGL && !UNITY_EDITOR
    [System.Runtime.InteropServices.DllImport("__Internal")]
    private static extern string GetURLParameter(string name);
    #else
    private string GetURLParameter(string name) { return ""; }
    #endif
}

/// <summary>
/// Simple floating behavior for objects
/// </summary>
public class FloatingObject : MonoBehaviour
{
    public float amplitude = 0.5f;
    public float frequency = 1.0f;

    private Vector3 startPosition;

    void Start()
    {
        startPosition = transform.position;
    }

    void Update()
    {
        float offset = Mathf.Sin(Time.time * frequency) * amplitude;
        transform.position = startPosition + Vector3.up * offset;
    }
}
