import React from 'react';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { useWindowContext } from '@/providers/WindowProvider';
import { missions } from '@/data/missions';
import { ORBIT_NODES } from '../nodes/nodes.config';
import { soundFx } from '@/lib/utils';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Terminal as TerminalIcon, Sparkles, Search } from 'lucide-react';

export function OrbitHUD() {
  const {
    systemTime,
    uptimeSeconds,
    isMuted,
    toggleMute,
    reboot,
    triggerCorePulse,
    setShowHelp,
    showHelp
  } = useOrbitContext();

  const { windows, openWindow } = useWindowContext();

  const openCount = Object.values(windows).filter((w) => w.isOpen).length;

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30 pointer-events-none p-3 sm:p-5 flex items-start justify-between">
      {/* Top Left: System Telemetry Identity */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#0a0f1d]/85 backdrop-blur-md border border-zinc-800/80 rounded-lg text-xs font-mono-tech shadow-sm">
          <div className="relative flex items-center justify-center w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
          </div>
          <span className="font-semibold text-zinc-100 tracking-wider">ORBIT OS</span>
          <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">/</span>
          <span className="text-zinc-400 hidden sm:inline">v3.2</span>
          <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-cyan-400/90 font-medium hidden sm:inline">SYS_NOMINAL</span>
        </div>

        {/* Telemetry pill: nodes & missions */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0a0f1d]/60 backdrop-blur-md border border-zinc-800/60 rounded-lg text-[11px] font-mono-tech text-zinc-400">
          <span>NODES: <strong className="text-zinc-200">{ORBIT_NODES.length}</strong></span>
          <span className="text-zinc-700">·</span>
          <span>MISSIONS: <strong className="text-cyan-400">{missions.length}</strong></span>
          <span className="text-zinc-700">·</span>
          <span>UPTIME: <span className="tabular-nums text-zinc-300">{formatUptime(uptimeSeconds)}</span></span>
        </div>
      </div>

      {/* Top Right: Clock, Terminal trigger, and Utility Actions */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
        {/* Active Windows Indicator */}
        {openCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0a0f1d]/80 backdrop-blur-md border border-cyan-900/40 rounded-lg text-[11px] font-mono-tech text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>ACTIVE: {openCount}</span>
          </div>
        )}

        {/* Live System Time */}
        <div className="px-2.5 sm:px-3 py-1.5 bg-[#0a0f1d]/80 backdrop-blur-md border border-zinc-800/80 rounded-lg text-xs font-mono-tech text-zinc-300 tabular-nums flex items-center gap-1.5 sm:gap-2 shadow-sm">
          <span className="text-zinc-500 text-[10px] hidden sm:inline">UTC</span>
          <span className="font-medium tracking-wider">{systemTime || '12:00:00'}</span>
        </div>

        {/* Command Palette Trigger */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('orbit:open-command-palette'))}
          onMouseEnter={() => soundFx.playHover()}
          aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
          title="Command Palette (Ctrl+K)"
          className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#0a0f1d]/80 hover:bg-zinc-800/80 active:bg-zinc-700/80 text-zinc-300 hover:text-cyan-300 border border-zinc-800/80 rounded-lg text-xs font-mono-tech transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer shadow-sm"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline text-[10px] text-zinc-400 font-mono-tech">
            <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 text-[9px]">CTRL K</kbd>
          </span>
        </button>

        {/* Quick Launch Terminal Button */}
        <button
          onClick={() => openWindow('terminal')}
          onMouseEnter={() => soundFx.playHover()}
          aria-label="Open ORBIT Terminal (Press 5)"
          title="Open ORBIT Terminal (Press 5)"
          className="p-1.5 bg-[#0a0f1d]/80 hover:bg-zinc-800/80 active:bg-zinc-700/80 text-zinc-300 hover:text-cyan-400 border border-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
        >
          <TerminalIcon className="w-4 h-4" />
        </button>

        {/* Pulse Core Trigger */}
        <button
          onClick={() => triggerCorePulse()}
          onMouseEnter={() => soundFx.playHover()}
          aria-label="Trigger Core Resonance Pulse"
          title="Trigger Core Resonance Pulse"
          className="hidden sm:flex p-1.5 bg-[#0a0f1d]/80 hover:bg-zinc-800/80 active:bg-zinc-700/80 text-zinc-300 hover:text-cyan-400 border border-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleMute}
          onMouseEnter={() => soundFx.playHover()}
          aria-label={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
          title={isMuted ? 'Audio Muted' : 'Audio Enabled'}
          className="p-1.5 bg-[#0a0f1d]/80 hover:bg-zinc-800/80 active:bg-zinc-700/80 text-zinc-300 hover:text-cyan-400 border border-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Help / Shortcuts modal toggle */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          onMouseEnter={() => soundFx.playHover()}
          aria-label="System Shortcuts & Help"
          title="System Shortcuts (ESC)"
          className="p-1.5 bg-[#0a0f1d]/80 hover:bg-zinc-800/80 active:bg-zinc-700/80 text-zinc-300 hover:text-cyan-400 border border-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Reboot button */}
        <button
          onClick={reboot}
          onMouseEnter={() => soundFx.playHover()}
          aria-label="Reboot ORBIT OS"
          title="Reboot System"
          className="hidden sm:flex p-1.5 bg-[#0a0f1d]/80 hover:bg-zinc-800/80 active:bg-zinc-700/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
