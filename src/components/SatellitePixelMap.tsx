import React, { useEffect, useRef, useState } from 'react';
import { MapPin, RefreshCw, Compass, ShieldCheck } from 'lucide-react';

interface SatellitePixelMapProps {
  location: string;
  coordinates: {
    lat: number;
    lng: number;
    zoom: number;
    gridResolution: string;
  };
  category: string;
  assetTitle: string;
}

export const SatellitePixelMap: React.FC<SatellitePixelMapProps> = ({
  location,
  coordinates,
  category,
  assetTitle,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<'pixel' | 'lidar' | 'spectral'>('pixel');
  const gridSize = 16;

  // Draw procedural light-theme satellite pixel map on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * gridSize;
        const y = r * gridSize;

        const seed = (r * 13 + c * 37 + Math.floor(Math.abs(coordinates.lat) * 100)) % 100;
        const isCenterTarget =
          Math.abs(r - Math.floor(rows / 2)) <= 2 && Math.abs(c - Math.floor(cols / 2)) <= 2;

        let fillStyle = '#e2e8f0';

        if (category === 'carbon') {
          if (viewMode === 'pixel') {
            fillStyle = isCenterTarget ? '#16a34a' : `rgb(${220 - (seed % 40)}, ${240 - (seed % 20)}, ${220 - (seed % 30)})`;
          } else {
            fillStyle = isCenterTarget ? '#15803d' : `rgb(240, ${253 - (seed % 20)}, 244)`;
          }
        } else if (category === 'real_estate') {
          if (viewMode === 'pixel') {
            fillStyle = isCenterTarget ? '#2563eb' : `rgb(${210 - (seed % 30)}, ${230 - (seed % 20)}, ${250 - (seed % 10)})`;
          } else {
            fillStyle = isCenterTarget ? '#1d4ed8' : '#eff6ff';
          }
        } else if (category === 'fine_art') {
          fillStyle = isCenterTarget ? '#d97706' : `rgb(${254 - (seed % 20)}, ${243 - (seed % 20)}, ${199 - (seed % 30)})`;
        } else {
          fillStyle = isCenterTarget ? '#0284c7' : `rgb(${224 - (seed % 20)}, ${242 - (seed % 20)}, 254)`;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, gridSize - 1, gridSize - 1);
      }
    }

    // Overlay Crosshair at center
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.strokeStyle = category === 'carbon' ? '#15803d' : '#1d4ed8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 26, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 32, centerY);
    ctx.lineTo(centerX + 32, centerY);
    ctx.moveTo(centerX, centerY - 32);
    ctx.lineTo(centerX, centerY + 32);
    ctx.stroke();
  }, [category, coordinates, viewMode]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs">
        <div className="flex items-center space-x-2 text-slate-700 font-semibold">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="truncate max-w-[200px]">{location}</span>
          <span className="px-2 py-0.5 rounded bg-white text-slate-600 font-mono text-[11px] border border-slate-200">
            {coordinates.lat.toFixed(4)}°, {coordinates.lng.toFixed(4)}°
          </span>
        </div>

        <div className="flex rounded-lg bg-white p-0.5 border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setViewMode('pixel')}
            className={`px-2.5 py-1 rounded transition ${
              viewMode === 'pixel' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            GIS Grid
          </button>
          <button
            onClick={() => setViewMode('lidar')}
            className={`px-2.5 py-1 rounded transition ${
              viewMode === 'lidar' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            LIDAR
          </button>
          <button
            onClick={() => setViewMode('spectral')}
            className={`px-2.5 py-1 rounded transition ${
              viewMode === 'spectral' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Spectral
          </button>
        </div>
      </div>

      {/* Main Pixel Canvas */}
      <div className="relative w-full h-[200px] bg-slate-100 flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} width={500} height={200} className="w-full h-full object-cover" />

        {/* HUD Info Box */}
        <div className="absolute top-3 left-3 bg-white/95 border border-slate-200 rounded-lg p-2 text-[10px] text-slate-700 font-mono space-y-0.5 shadow-sm pointer-events-none">
          <div className="flex items-center space-x-1 text-emerald-700 font-bold">
            <ShieldCheck className="w-3 h-3" />
            <span>GIS SATELLITE TELEMETRY</span>
          </div>
          <div>RES: {coordinates.gridResolution}</div>
          <div>SENSOR: European Sentinel-2A Laser</div>
        </div>

        {/* Target Label */}
        <div className="absolute bottom-3 right-3 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-800 font-bold shadow-sm flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-slate-600" />
          <span>{assetTitle}</span>
        </div>
      </div>
    </div>
  );
};
