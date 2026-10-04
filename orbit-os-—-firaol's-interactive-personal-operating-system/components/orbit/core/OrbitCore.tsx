import React from 'react';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { missions } from '@/data/missions';
import { ORBIT_NODES } from '../nodes/nodes.config';

export function OrbitCore() {
  const { isResonating, triggerCorePulse } = useOrbitContext();

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Interactive concentric orbital rings around Core */}
      <button
        type="button"
        onClick={triggerCorePulse}
        aria-label="ORBIT Central Core: Click to trigger resonance pulse"
        className="relative group w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
      >
        {/* Outermost orbit trace ring */}
        <div
          className={`absolute inset-0 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-700 ${
            isResonating ? 'scale-110 border-cyan-400 opacity-100' : 'opacity-60'
          }`}
        >
          {/* Subtle orbital perimeter tick marks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
        </div>

        {/* Secondary rotating segmented ring */}
        <div
          className={`absolute inset-2.5 sm:inset-3.5 rounded-full border border-dashed border-zinc-700/60 group-hover:border-cyan-500/50 transition-all duration-500 ${
            isResonating ? 'rotate-180 border-cyan-400/70' : ''
          }`}
          style={{ animation: 'spin 60s linear infinite' }}
        />

        {/* Inner glow halo */}
        <div
          className={`absolute inset-5 sm:inset-7 rounded-full bg-gradient-to-tr from-cyan-950/20 via-[#0d1627]/60 to-[#070b13] border border-zinc-800 backdrop-blur-md shadow-2xl transition-all duration-500 ${
            isResonating ? 'scale-105 border-cyan-500/60 shadow-[0_0_40px_rgba(6,182,212,0.3)]' : 'group-hover:border-zinc-700'
          }`}
        />

        {/* Core Focal Center Body */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-2">
          {/* Micro status ticker */}
          <div className="flex items-center gap-1.5 mb-0.5 text-[8px] sm:text-[9px] font-mono-tech tracking-widest text-cyan-400/90 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>CORE ONLINE</span>
          </div>

          {/* Primary Identity */}
          <h1 className="text-lg sm:text-2xl font-display font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            FIRAOL
          </h1>

          <p className="text-[9px] sm:text-[10px] text-zinc-400 font-mono-tech tracking-wider mt-0.5 max-w-[120px] sm:max-w-[150px] truncate">
            SYSTEMS &amp; HEALTH
          </p>

          {/* Core Telemetry Readout */}
          <div className="mt-1.5 pt-1.5 border-t border-zinc-800/80 flex items-center gap-2 text-[8px] sm:text-[9px] font-mono-tech text-zinc-400">
            <span>{ORBIT_NODES.length} NODES</span>
            <span className="text-zinc-700">|</span>
            <span>{missions.length} MISSIONS</span>
          </div>

          {/* Resonance hint on hover */}
          <div className="mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono-tech text-cyan-400/70 hidden sm:block">
            [ PULSE ]
          </div>
        </div>

        {/* Subtle center energy core point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] pointer-events-none" />
      </button>

      {/* Brief editorial subtitle below Core - positioned absolutely so it never shifts the geometric center */}
      <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 text-center pointer-events-none hidden md:block whitespace-nowrap">
        <p className="text-[11px] text-zinc-400/80 font-light">
          Autonomous workspace &amp; technical portfolio
        </p>
      </div>
    </div>
  );
}
