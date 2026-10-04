import React, { useEffect } from 'react';
import { useOrbitContext, BootStage } from '@/providers/OrbitProvider';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { OrbitDesktop } from './desktop/OrbitDesktop';
import { soundFx } from '@/lib/utils';
import { X, Sparkles, Terminal, Keyboard } from 'lucide-react';

export function OrbitOS() {
  const {
    bootStage,
    isBooting,
    skipBoot,
    showHelp,
    setShowHelp
  } = useOrbitContext();

  const { openWindow, activeWindowId, closeWindow } = useWindowContext();

  // Keyboard navigation system
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently interacting with an input or editable field
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        if (showHelp) {
          setShowHelp(false);
          return;
        }
        if (isBooting) {
          skipBoot();
          return;
        }
        if (activeWindowId) {
          closeWindow(activeWindowId);
          return;
        }
      }

      // Numerical shortcuts [1 - 5]
      const keyMap: Record<string, WindowId> = {
        '1': 'mission-control',
        '2': 'knowledge-matrix',
        '3': 'achievement-vault',
        '4': 'engineering-log',
        '5': 'terminal'
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        openWindow(keyMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBooting, skipBoot, showHelp, setShowHelp, activeWindowId, closeWindow, openWindow]);

  const getBootProgress = (stage: BootStage) => {
    switch (stage) {
      case 'INITIALIZING':
        return { label: 'INITIALIZING ORBIT', pct: 20 };
      case 'LOADING_CORE':
        return { label: 'LOADING CORE ARCHITECTURE', pct: 45 };
      case 'CALIBRATING':
        return { label: 'CALIBRATING ORBITAL NODES', pct: 70 };
      case 'CONNECTING':
        return { label: 'CONNECTING KNOWLEDGE MATRIX', pct: 90 };
      case 'READY':
        return { label: 'SYSTEM READY', pct: 100 };
      default:
        return { label: 'SYSTEM ACTIVE', pct: 100 };
    }
  };

  const bootInfo = getBootProgress(bootStage);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070c] text-zinc-100 font-sans">
      {/* Cinematic Boot Experience Overlay */}
      {isBooting && (
        <div
          onClick={skipBoot}
          className="fixed inset-0 z-50 bg-[#05070c] flex flex-col items-center justify-center p-6 cursor-pointer select-none transition-opacity duration-500"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-950/20 blur-[100px] pointer-events-none" />

          {/* Central Boot Graphic */}
          <div className="relative flex flex-col items-center text-center max-w-sm w-full space-y-6">
            {/* Concentric rotating ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-zinc-800 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '6s' }} />
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse" />
            </div>

            {/* Boot Telemetry Log */}
            <div className="space-y-2 w-full">
              <div className="text-xs font-mono-tech text-cyan-400 tracking-widest uppercase">
                ORBIT OS // BOOT PROTOCOL
              </div>
              <div className="text-sm font-mono-tech font-semibold text-zinc-200">
                {bootInfo.label}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-900 border border-zinc-800 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-cyan-400 h-full transition-all duration-500 ease-out"
                  style={{ width: `${bootInfo.pct}%` }}
                />
              </div>
            </div>

            {/* Skip Hint */}
            <div className="text-[11px] font-mono-tech text-zinc-500 pt-4 flex items-center gap-2">
              <span>Click or press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                ESC
              </kbd>
              <span>to skip</span>
            </div>
          </div>
        </div>
      )}

      {/* Main ORBIT Desktop */}
      <OrbitDesktop />

      {/* Shortcuts & System Guide Overlay Modal */}
      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 select-none"
        >
          <div className="w-full max-w-md bg-[#090e1a] border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-5 text-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-mono-tech font-bold text-zinc-100">
                  ORBIT OS // SYSTEM SHORTCUTS
                </h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                aria-label="Close Help"
                className="p-1 text-zinc-400 hover:text-zinc-100 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono-tech">
              <div className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-zinc-300">Open Mission Control</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-cyan-400">[1]</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-zinc-300">Open Knowledge Matrix</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-cyan-400">[2]</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-zinc-300">Open Achievement Vault</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-cyan-400">[3]</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-zinc-300">Open Engineering Log</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-cyan-400">[4]</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-zinc-300">Launch Interactive Terminal</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-cyan-400">[5]</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-zinc-300">Close Active Window / Dismiss</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">[ESC]</kbd>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 font-light border-t border-zinc-800 pt-3">
              ORBIT OS is an interactive operating system and portfolio by Firaol. Click the Core to trigger resonance pulses or drag desktop windows anywhere on the canvas.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
