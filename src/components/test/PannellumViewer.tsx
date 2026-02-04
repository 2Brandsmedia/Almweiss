"use client";

import { useEffect, useRef, useState } from "react";
import "pannellum/build/pannellum.css";

// House Tour - 5 verbundene Räume (gleiche Bilder wie Photo Sphere Viewer)
const tourScenes = {
  entrance: {
    title: "Eingangsbereich",
    image: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-1.jpg",
    hotSpots: [
      { pitch: -5, yaw: 80, type: "scene", text: "→ Wohnzimmer", sceneId: "livingroom" },
    ],
  },
  livingroom: {
    title: "Wohnzimmer",
    image: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-2.jpg",
    hotSpots: [
      { pitch: -5, yaw: -120, type: "scene", text: "← Eingang", sceneId: "entrance" },
      { pitch: -5, yaw: 30, type: "scene", text: "→ Küche", sceneId: "kitchen" },
      { pitch: -5, yaw: 150, type: "scene", text: "→ Terrasse", sceneId: "terrace" },
    ],
  },
  kitchen: {
    title: "Küche",
    image: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-3.jpg",
    hotSpots: [
      { pitch: -5, yaw: -90, type: "scene", text: "← Wohnzimmer", sceneId: "livingroom" },
      { pitch: -5, yaw: 60, type: "scene", text: "→ Schlafzimmer", sceneId: "bedroom" },
    ],
  },
  bedroom: {
    title: "Schlafzimmer",
    image: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-4.jpg",
    hotSpots: [
      { pitch: -5, yaw: -120, type: "scene", text: "← Küche", sceneId: "kitchen" },
      { pitch: -5, yaw: 45, type: "scene", text: "→ Terrasse", sceneId: "terrace" },
    ],
  },
  terrace: {
    title: "Terrasse",
    image: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-5.jpg",
    hotSpots: [
      { pitch: -5, yaw: -60, type: "scene", text: "← Wohnzimmer", sceneId: "livingroom" },
      { pitch: -5, yaw: 90, type: "scene", text: "→ Schlafzimmer", sceneId: "bedroom" },
    ],
  },
};

const sceneOrder = ["entrance", "livingroom", "kitchen", "bedroom", "terrace"];
const sceneNames: Record<string, string> = {
  entrance: "Eingangsbereich",
  livingroom: "Wohnzimmer",
  kitchen: "Küche",
  bedroom: "Schlafzimmer",
  terrace: "Terrasse",
};

declare global {
  interface Window {
    pannellum: {
      viewer: (
        container: string | HTMLElement,
        config: Record<string, unknown>
      ) => PannellumViewerInstance;
    };
  }
}

interface PannellumViewerInstance {
  destroy: () => void;
  loadScene: (sceneId: string) => void;
  getScene: () => string;
  on: (event: string, callback: () => void) => void;
}

export default function PannellumViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewerInstance | null>(null);
  const [currentScene, setCurrentScene] = useState("entrance");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPannellum = async () => {
      if (typeof window !== "undefined" && !window.pannellum) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
        script.async = true;
        script.onload = () => initViewer();
        document.head.appendChild(script);
      } else if (window.pannellum) {
        initViewer();
      }
    };

    const initViewer = () => {
      if (!containerRef.current || viewerRef.current) return;

      const scenesConfig: Record<string, unknown> = {};
      Object.entries(tourScenes).forEach(([id, scene]) => {
        scenesConfig[id] = {
          title: scene.title,
          type: "equirectangular",
          panorama: scene.image,
          hotSpots: scene.hotSpots.map((hs) => ({
            ...hs,
            cssClass: "custom-hotspot",
          })),
        };
      });

      viewerRef.current = window.pannellum.viewer(containerRef.current, {
        default: {
          firstScene: "entrance",
          autoLoad: true,
          compass: true,
          autoRotate: -2,
          autoRotateInactivityDelay: 3000,
          showControls: true,
          mouseZoom: true,
          sceneFadeDuration: 1000,
        },
        scenes: scenesConfig,
      });

      viewerRef.current.on("scenechange", () => {
        if (viewerRef.current) {
          setCurrentScene(viewerRef.current.getScene());
        }
      });

      setIsLoaded(true);
    };

    loadPannellum();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const changeScene = (sceneId: string) => {
    if (viewerRef.current) {
      viewerRef.current.loadScene(sceneId);
      setCurrentScene(sceneId);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Current Room Info */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg z-10">
        <p className="text-sm font-medium">{sceneNames[currentScene]}</p>
      </div>

      {/* Room Navigation */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {sceneOrder.map((sceneId) => (
            <button
              key={sceneId}
              onClick={() => changeScene(sceneId)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition shadow-lg ${
                currentScene === sceneId
                  ? "bg-[#A68A75] text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              }`}
            >
              {sceneNames[sceneId]}
            </button>
          ))}
        </div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#A68A75] border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600">Lädt Panorama...</p>
          </div>
        </div>
      )}
    </div>
  );
}
