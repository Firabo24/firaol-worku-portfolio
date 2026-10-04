import React from 'react';
import { OrbitNodeConfig } from './nodes.config';
import { useWindowContext } from '@/providers/WindowProvider';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { soundFx } from '@/lib/utils';
import {
  Compass,
  Cpu,
  Award,
  GitBranch,
  Terminal,
  Circle
} from 'lucide-react';

interface OrbitNodeProps {
  config: OrbitNodeConfig;
  coords: { x: number; y: number };
  isMobileList?: boolean;
}

export function OrbitNode({ config, coords, isMobileList = false }: OrbitNodeProps) {
  const { windows, openWindow, focusWindow } = useWindowContext();
  const { hoveredNodeId, setHoveredNodeId, isResonating } = useOrbitContext();

  const win = windows[config.id];
  const isOpen = win?.isOpen;
  const isHovered = hoveredNodeId === config.id;

  const handleClick = () => {
    if (isOpen && !win?.isMinimized) {
      soundFx.playClick();
      focusWindow(config.id);
    } else {
      openWindow(config.id);
    }
  };

  const getIcon = () => {
    switch (config.id) {
      case 'mission-control':
        return <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />;
      case 'knowledge-matrix':
        return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />;
      case 'achievement-vault':
        return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />;
      case 'engineering-log':
        return <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  if (isMobileList) {
    // Clean mobile list button presentation for small touch screens
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHoveredNodeId(config.id)}
        onMouseLeave={() => setHoveredNodeId(null)}
        className={`w-full flex items-center justify-between p-3 rounded-xl border backdrop-blur-md transition-all text-left cursor-pointer ${
          isOpen
            ? 'bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
            : 'bg-[#0a0f1d]/80 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#0f172a]/90'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold font-display tracking-wider text-zinc-100">
                {config.label}
              </span>
              <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                [{config.shortcut}]
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light mt-0.5">{config.description}</p>
          </div>
        </div>

        <div className="text-right pl-2 shrink-0">
          <span className="text-[10px] font-mono-tech text-zinc-500 block">
            {config.badge}
          </span>
          {isOpen && (
            <span className="inline-block mt-1 text-[9px] font-mono-tech text-cyan-400">
              ACTIVE
            </span>
          )}
        </div>
      </button>
    );
  }

  // Orbital Node (positioned in exact spatial coordinates relative to desktop center)
  return (
    <div
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: 'translate(-50%, -50%)',
        position: 'absolute'
      }}
      className="z-20 pointer-events-auto"
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHoveredNodeId(config.id)}
        onMouseLeave={() => setHoveredNodeId(null)}
        onFocus={() => setHoveredNodeId(config.id)}
        onBlur={() => setHoveredNodeId(null)}
        aria-label={`Open ${config.label} window (Key ${config.shortcut})`}
        className={`group relative flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 min-h-[44px] touch-manipulation rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 whitespace-nowrap ${
          isOpen
            ? 'bg-[#0e172a]/95 border-cyan-500/70 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
            : isHovered
            ? 'bg-[#0f172a]/90 border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.15)] scale-105'
            : 'bg-[#0a0f1d]/85 border-zinc-800/80 hover:border-zinc-700'
        } ${isResonating ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : ''}`}
      >
        {/* Node Icon Box */}
        <div
          className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
            isOpen
              ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300'
              : 'bg-zinc-900/90 border-zinc-800 group-hover:border-zinc-700 text-zinc-300'
          }`}
        >
          {getIcon()}
        </div>

        {/* Node Content */}
        <div className="text-left select-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-display font-bold tracking-wider text-zinc-100 group-hover:text-cyan-200 transition-colors">
              {config.label}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech px-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              {config.shortcut}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono-tech text-zinc-400 mt-0.5">
            <span className="text-zinc-500">{config.badge}</span>
            {isOpen && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="text-cyan-400 font-medium">OPEN</span>
              </>
            )}
          </div>
        </div>

        {/* Small active status dot */}
        {isOpen && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-[#05070c] animate-pulse" />
        )}
      </button>
    </div>
  );
}
