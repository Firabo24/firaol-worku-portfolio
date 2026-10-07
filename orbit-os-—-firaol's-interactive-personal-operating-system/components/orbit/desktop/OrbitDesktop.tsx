import React, { useState, useEffect, useRef } from 'react';
import { OrbitCore } from '../core/OrbitCore';
import { OrbitNode } from '../nodes/OrbitNode';
import { ORBIT_NODES } from '../nodes/nodes.config';
import { LivingBackground } from '../background/LivingBackground';
import { OrbitHUD } from '../hud/OrbitHUD';
import { WindowManager } from '../windows/WindowManager';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { soundFx } from '@/lib/utils';
import {
  Compass,
  Cpu,
  Award,
  GitBranch,
  Terminal,
  Layers,
  X,
  Minus,
  User,
  FileText
} from 'lucide-react';

export function OrbitDesktop() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const { windows, activeWindowId, openWindow, focusWindow, toggleWindow, closeAll } =
    useWindowContext();
  const { hoveredNodeId, isResonating } = useOrbitContext();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Open windows for taskbar
  const openWindowsList = (Object.keys(windows) as WindowId[])
    .map((id) => windows[id])
    .filter((w) => w.isOpen);

  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

  // Center coordinate of desktop: invariant to window states to eliminate any layout jitter
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const topClearance = isMobile ? 62 : 68; // Space below top HUD
  const bottomClearance = 76; // Safe clearance above bottom taskbar
  const edgeMarginX = isMobile ? 12 : 24;

  // Node dimensions for safety margin calculations
  const nodeHalfW = isMobile ? 60 : isTablet ? 75 : 88;
  const nodeHalfH = isMobile ? 18 : isTablet ? 22 : 24;

  // 1. Top node boundary constraint (MISSIONS at angle -90°: y = centerY - R)
  const maxRTop = Math.max(80, centerY - topClearance - nodeHalfH);

  // 2. Bottom nodes boundary constraint (ACHIEVEMENTS at 54°, ENGINEERING at 126°: sin(54°) = 0.809)
  const maxRBottom = Math.max(
    80,
    (dimensions.height - bottomClearance - centerY - nodeHalfH) / 0.809
  );

  // 3. Side nodes boundary constraint (KNOWLEDGE at -18°, TERMINAL at 198°: cos(18°) = 0.951)
  const maxRSide = Math.max(
    80,
    (centerX - edgeMarginX - nodeHalfW) / 0.951
  );

  // Safe radius ensures every node is 100% inside the viewport across all screen sizes
  const maxSafeRadius = Math.min(maxRTop, maxRBottom, maxRSide);

  // Ideal target aesthetic radius
  const idealRadius = isMobile ? 120 : isTablet ? 195 : 245;
  const orbitRadius = Math.max(85, Math.min(idealRadius, maxSafeRadius * 0.96));

  // Calculate exact coordinates for each node
  const nodePositions = ORBIT_NODES.map((node) => {
    const rad = (node.angleDeg * Math.PI) / 180;
    const r = orbitRadius * (node.radiusMultiplier || 1.0);
    return {
      node,
      x: centerX + Math.cos(rad) * r,
      y: centerY + Math.sin(rad) * r
    };
  });

  const getNodeIcon = (id: WindowId) => {
    switch (id) {
      case 'mission-control':
        return <Compass className="w-3.5 h-3.5" />;
      case 'knowledge-matrix':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'achievement-vault':
        return <Award className="w-3.5 h-3.5" />;
      case 'engineering-log':
        return <GitBranch className="w-3.5 h-3.5" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5" />;
      case 'profile':
        return <User className="w-3.5 h-3.5" />;
      case 'cv':
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#05070c] select-none"
    >
      {/* 1. Living Atmospheric Background */}
      <LivingBackground />

      {/* 2. Top System HUD Telemetry */}
      <OrbitHUD />

      {/* 3 & 4 & 5. Core & Orbital Nodes Desktop Space */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Subtle SVG connection traces between Core and Nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
            </linearGradient>
          </defs>

          {/* Orbit guideline ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={orbitRadius}
            fill="none"
            stroke="rgba(30, 41, 59, 0.35)"
            strokeDasharray="4 6"
            strokeWidth="1"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={orbitRadius * 0.65}
            fill="none"
            stroke="rgba(30, 41, 59, 0.2)"
            strokeWidth="1"
          />

          {/* Radial connection beams */}
          {nodePositions.map(({ node, x, y }) => {
            const isHovered = hoveredNodeId === node.id;
            const isActive = windows[node.id]?.isOpen;

            return (
              <g key={`conn-${node.id}`}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke={
                    isActive
                      ? 'rgba(6, 182, 212, 0.6)'
                      : isHovered
                      ? 'rgba(6, 182, 212, 0.45)'
                      : 'rgba(51, 65, 85, 0.25)'
                  }
                  strokeWidth={isActive || isHovered ? '1.5' : '1'}
                  strokeDasharray={isActive ? 'none' : '3 4'}
                  className="transition-all duration-300"
                />
                {/* Small animated pulse packet on connection line if active */}
                {(isActive || isHovered || isResonating) && (
                  <circle
                    cx={(centerX + x) / 2}
                    cy={(centerY + y) / 2}
                    r="2"
                    fill="#22d3ee"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Orbit Core - exactly centered at (centerX, centerY) */}
        <div
          style={{
            position: 'absolute',
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: 'translate(-50%, -50%)'
          }}
          className="pointer-events-auto"
        >
          <OrbitCore />
        </div>

        {/* Five Spatial Orbit Nodes - distributed symmetrically around Core */}
        {nodePositions.map(({ node, x, y }) => (
          <OrbitNode
            key={node.id}
            config={node}
            coords={{ x, y }}
            isMobileList={false}
          />
        ))}
      </div>

      {/* 6. Window Manager & Application Shells */}
      <WindowManager />

      {/* 7. Bottom Taskbar when applications are open */}
      {openWindowsList.length > 0 && (
        <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
          <nav
            aria-label="Running Applications"
            className="pointer-events-auto flex items-center gap-1.5 p-1.5 bg-[#0a0f1d]/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl max-w-full overflow-x-auto"
          >
            {/* Core home indicator */}
            <div className="flex items-center gap-1 px-2 py-1 border-r border-zinc-800 text-[10px] font-mono-tech text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="hidden sm:inline">ORBIT</span>
            </div>

            {/* Active window items */}
            {openWindowsList.map((win) => {
              const isActive = activeWindowId === win.id && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => toggleWindow(win.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  aria-label={`${win.shortTitle}: ${win.isMinimized ? 'Restore' : isActive ? 'Minimize' : 'Bring to front'}`}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 shadow-sm'
                      : win.isMinimized
                      ? 'bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 border border-transparent'
                      : 'bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-zinc-400'}>
                    {getNodeIcon(win.id)}
                  </span>
                  <span className="font-medium">{win.shortTitle}</span>
                  {win.isMinimized && (
                    <span className="text-[9px] text-zinc-500">(min)</span>
                  )}
                </button>
              );
            })}

            {/* Close All Action */}
            <button
              onClick={closeAll}
              onMouseEnter={() => soundFx.playHover()}
              aria-label="Close all windows"
              title="Close all open windows"
              className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
