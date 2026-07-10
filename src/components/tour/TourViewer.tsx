"use client";

import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

// Demo-Rundgang: Beispiel-Panoramen, bis echte Almweiß-Aufnahmen vorliegen
const tourNodes = [
  {
    id: "raum-1",
    name: "Beispielraum 1",
    panorama: "/images/tour/demo-raum-1.webp",
    caption: "Beispielraum 1 (Demo-Ansicht)",
    links: [{ nodeId: "raum-2", position: { yaw: "80deg", pitch: "0deg" } }],
  },
  {
    id: "raum-2",
    name: "Beispielraum 2",
    panorama: "/images/tour/demo-raum-2.webp",
    caption: "Beispielraum 2 (Demo-Ansicht)",
    links: [{ nodeId: "raum-1", position: { yaw: "-120deg", pitch: "0deg" } }],
  },
];

const nodeNames: Record<string, string> = Object.fromEntries(
  tourNodes.map((n) => [n.id, n.name])
);

// Schwebender Kreis-Pfeil mit Raum-Label (Google-Maps-Stil)
function createArrowElement(label: string) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "cursor:pointer;display:flex;flex-direction:column;align-items:center;";

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
  };
  circle.onmouseleave = () => {
    circle.style.transform = "scale(1)";
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

  return wrapper;
}

export default function TourViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [currentNode, setCurrentNode] = useState("raum-1");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      container: containerRef.current,
      loadingTxt: "Panorama wird geladen...",
      navbar: ["zoom", "caption", "fullscreen"],
      // Mobile: 1-Finger-Scrollen der Seite nicht blockieren, Mausrad nur mit Strg zoomen
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      lang: {
        zoom: "Zoom",
        fullscreen: "Vollbild",
        loadError: "Das Panorama konnte nicht geladen werden.",
        ctrlZoom: "Strg + Scrollen zum Zoomen",
        twoFingers: "Mit zwei Fingern bewegen",
      },
      plugins: [
        [
          VirtualTourPlugin,
          {
            positionMode: "manual",
            nodes: tourNodes,
            startNodeId: "raum-1",
            preload: true,
            transitionOptions: {
              showLoader: true,
              speed: "20rpm",
              fadeIn: true,
              rotation: true,
            },
            arrowStyle: {
              element: (link: { nodeId: string }) =>
                createArrowElement(nodeNames[link.nodeId] || link.nodeId),
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
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, []);

  const changeNode = (nodeId: string) => {
    viewerRef.current
      ?.getPlugin<VirtualTourPlugin>(VirtualTourPlugin)
      ?.setCurrentNode(nodeId);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Raum-Navigation */}
      <div className="absolute bottom-14 left-4 right-4 z-10 pointer-events-none">
        <div className="flex gap-2 flex-wrap justify-center">
          {tourNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => changeNode(node.id)}
              className={`pointer-events-auto px-4 py-2 rounded-full text-xs font-medium transition shadow-lg ${
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
        <div className="absolute inset-0 bg-[#1C1917] flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#A68A75] border-t-transparent mx-auto mb-4" />
            <p className="text-white/80">Panorama wird geladen...</p>
          </div>
        </div>
      )}
    </div>
  );
}
