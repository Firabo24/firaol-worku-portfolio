import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WindowState } from '@/providers/WindowProvider';
import { Minus, Square, Minimize2, X, Terminal, Shield, Cpu, Compass, GitBranch, Layers } from 'lucide-react';

interface OrbitWindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export function OrbitWindow({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  children
}: OrbitWindowProps) {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dragging logic for desktop window titlebar
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || windowState.isMaximized) return;
    // Don't drag if clicking buttons
    if ((e.target as HTMLElement).closest('button')) return;

    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: windowState.position.x,
      startY: windowState.position.y
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const maxX = Math.max(10, window.innerWidth - 160);
      const maxY = Math.max(60, window.innerHeight - 110);

      const nextX = Math.max(10, Math.min(maxX, dragStartRef.current.startX + dx));
      const nextY = Math.max(60, Math.min(maxY, dragStartRef.current.startY + dy));

      onMove({ x: nextX, y: nextY });
    },
    [isDragging, onMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const getAppIcon = () => {
    switch (windowState.id) {
      case 'mission-control':
        return <Compass className="w-3.5 h-3.5 text-cyan-400" />;
      case 'knowledge-matrix':
        return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case 'achievement-vault':
        return <Shield className="w-3.5 h-3.5 text-amber-400" />;
      case 'engineering-log':
        return <GitBranch className="w-3.5 h-3.5 text-blue-400" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-zinc-300" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  // Mobile layout: full screen sheet
  if (isMobile) {
    return (
      <div
        ref={windowRef}
        style={{ zIndex: windowState.zIndex }}
        onClick={onFocus}
        className="fixed inset-0 bg-[#070a12] flex flex-col z-50 overflow-hidden"
      >
        {/* Mobile Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c1220] border-b border-zinc-800">
          <div className="flex items-center gap-2.5 min-w-0">
            {getAppIcon()}
            <span className="text-xs font-mono-tech font-semibold tracking-wider text-zinc-200 truncate">
              {windowState.shortTitle}
            </span>
            <span className="text-[10px] font-mono-tech text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              {windowState.badge}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onMinimize}
              aria-label="Minimize"
              className="p-2 text-zinc-400 hover:text-zinc-200 active:bg-zinc-800 rounded-lg cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 text-zinc-400 hover:text-red-400 active:bg-zinc-800 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Window Content Body */}
        <div className="flex-1 overflow-y-auto p-4 pb-20 overscroll-contain">
          {children}
        </div>
      </div>
    );
  }

  // Desktop layout: draggable, resizable / maximizable window
  const windowStyles: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        left: 16,
        top: 64,
        width: 'calc(100vw - 32px)',
        height: 'calc(100vh - 132px)',
        zIndex: windowState.zIndex
      }
    : {
        position: 'absolute',
        left: `${windowState.position.x}px`,
        top: `${windowState.position.y}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        zIndex: windowState.zIndex
      };

  return (
    <div
      ref={windowRef}
      style={windowStyles}
      onClick={onFocus}
      className={`flex flex-col rounded-xl border backdrop-blur-xl transition-shadow select-text ${
        isActive
          ? 'bg-[#090d16]/95 border-cyan-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.12)]'
          : 'bg-[#080b13]/90 border-zinc-800 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Window Header / Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`flex items-center justify-between px-3.5 py-2.5 rounded-t-xl border-b cursor-grab active:cursor-grabbing select-none transition-colors ${
          isActive
            ? 'bg-[#0d1424] border-zinc-800/80 text-zinc-100'
            : 'bg-[#0a0f1b] border-zinc-800/60 text-zinc-400'
        }`}
      >
        {/* Title & Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1 rounded bg-zinc-900 border border-zinc-800">
            {getAppIcon()}
          </div>
          <span className="text-xs font-mono-tech font-medium tracking-wider truncate">
            {windowState.title}
          </span>
          <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-cyan-400/90 hidden sm:inline">
            {windowState.badge}
          </span>
        </div>

        {/* Window Actions */}
        <div className="flex items-center gap-1">
          {/* Minimize */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize Window"
            title="Minimize"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 rounded transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label={windowState.isMaximized ? 'Restore Size' : 'Maximize Window'}
            title={windowState.isMaximized ? 'Restore' : 'Maximize'}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 rounded transition-colors cursor-pointer"
          >
            {windowState.isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Square className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close Window"
            title="Close"
            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-8 overscroll-contain text-zinc-200">
        {children}
      </div>
    </div>
  );
}
