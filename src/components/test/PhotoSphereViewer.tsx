"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

// Raum-Namen für Tooltips
const nodeNames: Record<string, string> = {
  entrance: "Eingangsbereich",
  livingroom: "Wohnzimmer",
  kitchen: "Küche",
  bedroom: "Schlafzimmer",
  terrace: "Terrasse",
};

// House Tour - 5 verbundene Räume mit schwebenden Markern (Google Style)
const tourNodes = [
  {
    id: "entrance",
    name: "Eingangsbereich",
    panorama: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-1.jpg",
    links: [
      { nodeId: "livingroom", position: { yaw: "80deg", pitch: "0deg" } },
    ],
  },
  {
    id: "livingroom",
    name: "Wohnzimmer",
    panorama: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-2.jpg",
    links: [
      { nodeId: "entrance", position: { yaw: "-120deg", pitch: "0deg" } },
      { nodeId: "kitchen", position: { yaw: "30deg", pitch: "0deg" } },
      { nodeId: "terrace", position: { yaw: "150deg", pitch: "0deg" } },
    ],
  },
  {
    id: "kitchen",
    name: "Küche",
    panorama: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-3.jpg",
    links: [
      { nodeId: "livingroom", position: { yaw: "-90deg", pitch: "0deg" } },
      { nodeId: "bedroom", position: { yaw: "60deg", pitch: "0deg" } },
    ],
  },
  {
    id: "bedroom",
    name: "Schlafzimmer",
    panorama: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-4.jpg",
    links: [
      { nodeId: "kitchen", position: { yaw: "-120deg", pitch: "0deg" } },
      { nodeId: "terrace", position: { yaw: "45deg", pitch: "0deg" } },
    ],
  },
  {
    id: "terrace",
    name: "Terrasse",
    panorama: "https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-5.jpg",
    links: [
      { nodeId: "livingroom", position: { yaw: "-60deg", pitch: "0deg" } },
      { nodeId: "bedroom", position: { yaw: "90deg", pitch: "0deg" } },
    ],
  },
];

// Marker-Style Optionen
type MarkerStyleType = "google" | "circle" | "chevron" | "portal";

interface Props {
  markerStyle?: MarkerStyleType;
}

export default function PhotoSphereViewer({ markerStyle = "google" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [currentNode, setCurrentNode] = useState("entrance");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStyle, setActiveStyle] = useState<MarkerStyleType>(markerStyle);

  // Erstellt ein benutzerdefiniertes Arrow-Element für den gewählten Stil
  const createArrowElement = useCallback((style: MarkerStyleType, label: string) => {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "cursor:pointer;display:flex;flex-direction:column;align-items:center;";

    switch (style) {
      case "google": {
        // Google Maps Style - Schwebender Kreis mit Pfeil
        const circle = document.createElement("div");
        circle.style.cssText = `
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.95);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          border: 3px solid #A68A75;
        `;
        circle.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="#A68A75"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;
        circle.onmouseenter = () => {
          circle.style.transform = "scale(1.15)";
          circle.style.boxShadow = "0 6px 30px rgba(0,0,0,0.4)";
        };
        circle.onmouseleave = () => {
          circle.style.transform = "scale(1)";
          circle.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        };
        wrapper.appendChild(circle);

        const labelEl = document.createElement("div");
        labelEl.style.cssText = `
          background: rgba(0,0,0,0.75);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
          white-space: nowrap;
          text-align: center;
        `;
        labelEl.textContent = label;
        wrapper.appendChild(labelEl);
        break;
      }
      case "circle": {
        // Pulsierender Kreis
        const container = document.createElement("div");
        container.style.cssText = "position:relative;width:50px;height:50px;";

        const pulse = document.createElement("div");
        pulse.style.cssText = `
          position:absolute;
          inset:0;
          background:#A68A75;
          border-radius:50%;
          animation: psvPulse 2s infinite;
          opacity:0.4;
        `;
        container.appendChild(pulse);

        const inner = document.createElement("div");
        inner.style.cssText = `
          position:absolute;
          inset:8px;
          background:#A68A75;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        inner.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;
        container.appendChild(inner);
        wrapper.appendChild(container);

        const labelEl = document.createElement("div");
        labelEl.style.cssText = `
          background:rgba(0,0,0,0.7);
          color:white;
          padding:4px 10px;
          border-radius:12px;
          font-size:11px;
          margin-top:6px;
          white-space:nowrap;
        `;
        labelEl.textContent = label;
        wrapper.appendChild(labelEl);
        break;
      }
      case "chevron": {
        // Chevron/Pfeil nach vorne
        const chevron = document.createElement("div");
        chevron.style.cssText = `
          width:70px;
          height:70px;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:transform 0.3s;
        `;
        chevron.innerHTML = `
          <svg width="70" height="70" viewBox="0 0 100 100">
            <defs>
              <filter id="chevronShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.4"/>
              </filter>
            </defs>
            <path d="M30 80 L50 40 L70 80" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" filter="url(#chevronShadow)"/>
            <path d="M30 80 L50 40 L70 80" fill="none" stroke="#A68A75" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        chevron.onmouseenter = () => { chevron.style.transform = "scale(1.2)"; };
        chevron.onmouseleave = () => { chevron.style.transform = "scale(1)"; };
        wrapper.appendChild(chevron);

        const labelEl = document.createElement("div");
        labelEl.style.cssText = `
          background:rgba(255,255,255,0.9);
          color:#333;
          padding:6px 14px;
          border-radius:20px;
          font-size:12px;
          font-weight:600;
          box-shadow:0 2px 10px rgba(0,0,0,0.2);
          white-space:nowrap;
        `;
        labelEl.textContent = label;
        wrapper.appendChild(labelEl);
        break;
      }
      case "portal": {
        // Portal/Tür-Icon
        const portal = document.createElement("div");
        portal.style.cssText = `
          width:60px;
          height:80px;
          background:linear-gradient(180deg, rgba(166,138,117,0.9) 0%, rgba(139,115,85,0.9) 100%);
          border-radius:30px 30px 0 0;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 4px 20px rgba(0,0,0,0.3);
          transition:all 0.3s;
          border:2px solid rgba(255,255,255,0.5);
        `;
        portal.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;
        portal.onmouseenter = () => { portal.style.transform = "scale(1.1)"; };
        portal.onmouseleave = () => { portal.style.transform = "scale(1)"; };
        wrapper.appendChild(portal);

        const labelEl = document.createElement("div");
        labelEl.style.cssText = `
          background:#333;
          color:white;
          padding:5px 12px;
          border-radius:4px;
          font-size:11px;
          margin-top:8px;
          white-space:nowrap;
        `;
        labelEl.textContent = label;
        wrapper.appendChild(labelEl);
        break;
      }
    }

    return wrapper;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup previous viewer
    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    // CSS für Puls-Animation hinzufügen
    const styleId = "psv-pulse-animation";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes psvPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const viewer = new Viewer({
      container: containerRef.current,
      loadingTxt: "Lädt...",
      navbar: ["autorotate", "zoom", "caption", "fullscreen"],
      plugins: [
        [
          VirtualTourPlugin,
          {
            positionMode: "manual",
            nodes: tourNodes,
            startNodeId: "entrance",
            preload: true,
            transitionOptions: {
              showLoader: true,
              speed: "20rpm",
              fadeIn: true,
              rotation: true,
            },
            arrowStyle: {
              element: (link: { nodeId: string }) => createArrowElement(activeStyle, nodeNames[link.nodeId] || link.nodeId),
              size: { width: 100, height: 120 },
            },
          },
        ],
        [MarkersPlugin, {}],
      ],
    });

    viewer.addEventListener("ready", () => {
      setIsLoaded(true);
    });

    const virtualTour = viewer.getPlugin<VirtualTourPlugin>(VirtualTourPlugin);
    if (virtualTour) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      virtualTour.addEventListener("node-changed", ((e: any) => {
        setCurrentNode(e.node.id);
      }));
    }

    viewerRef.current = viewer;

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [activeStyle, createArrowElement]);

  const changeNode = (nodeId: string) => {
    if (viewerRef.current) {
      const virtualTour = viewerRef.current.getPlugin<VirtualTourPlugin>(VirtualTourPlugin);
      if (virtualTour) {
        virtualTour.setCurrentNode(nodeId);
      }
    }
  };

  const currentNodeData = tourNodes.find(n => n.id === currentNode);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Current Room Info */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg z-10">
        <p className="text-sm font-medium">{currentNodeData?.name}</p>
      </div>

      {/* Marker Style Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <select
          value={activeStyle}
          onChange={(e) => setActiveStyle(e.target.value as MarkerStyleType)}
          className="bg-white/90 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium shadow-lg border-0 cursor-pointer"
        >
          <option value="google">Google Style</option>
          <option value="circle">Pulsierender Kreis</option>
          <option value="chevron">Chevron Pfeil</option>
          <option value="portal">Portal/Tür</option>
        </select>
      </div>

      {/* Room Navigation */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {tourNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => changeNode(node.id)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition shadow-lg ${
                currentNode === node.id
                  ? "bg-[#A68A75] text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              }`}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#A68A75] border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600">Lädt Panorama...</p>
          </div>
        </div>
      )}
    </div>
  );
}
