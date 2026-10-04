import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { soundFx } from '@/lib/utils';

export type WindowId =
  | 'mission-control'
  | 'knowledge-matrix'
  | 'achievement-vault'
  | 'engineering-log'
  | 'terminal';

export interface WindowState {
  id: WindowId;
  title: string;
  shortTitle: string;
  badge: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowContextType {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  toggleWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, pos: { x: number; y: number }) => void;
  updateSize: (id: WindowId, size: { width: number; height: number }) => void;
  closeAll: () => void;
}

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  'mission-control': {
    id: 'mission-control',
    title: 'MISSION CONTROL // ACTIVE OPERATIONS',
    shortTitle: 'Missions',
    badge: '3 ACTIVE',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 70 },
    size: { width: 880, height: 580 }
  },
  'knowledge-matrix': {
    id: 'knowledge-matrix',
    title: 'KNOWLEDGE MATRIX // TECHNICAL DOMAINS',
    shortTitle: 'Knowledge',
    badge: '4 DOMAINS',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 120, y: 80 },
    size: { width: 900, height: 600 }
  },
  'achievement-vault': {
    id: 'achievement-vault',
    title: 'ACHIEVEMENT VAULT // ARCHIVAL RECORDS',
    shortTitle: 'Vault',
    badge: '3 RECORDS',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 150, y: 90 },
    size: { width: 860, height: 560 }
  },
  'engineering-log': {
    id: 'engineering-log',
    title: 'ENGINEERING LOG // CHRONOLOGICAL PHASES',
    shortTitle: 'Log',
    badge: '5 PHASES',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 100 },
    size: { width: 880, height: 620 }
  },
  'terminal': {
    id: 'terminal',
    title: 'ORBIT SHELL // INTERACTIVE TERMINAL',
    shortTitle: 'Terminal',
    badge: 'v3.2 SH',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 180, y: 110 },
    size: { width: 760, height: 480 }
  }
};

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [highestZIndex, setHighestZIndex] = useState(20);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);

  // Recalculate default positions based on window dimensions once mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw > 768) {
        setWindows((prev) => {
          const updated = { ...prev };
          const baseW = Math.min(880, vw - 80);
          const baseH = Math.min(580, vh - 120);
          const centerX = Math.max(20, Math.floor((vw - baseW) / 2));
          const centerY = Math.max(50, Math.floor((vh - baseH) / 2) - 20);

          (Object.keys(updated) as WindowId[]).forEach((key, index) => {
            const offset = (index - 2) * 24;
            updated[key] = {
              ...updated[key],
              size: {
                width: key === 'terminal' ? Math.min(760, vw - 40) : baseW,
                height: key === 'terminal' ? Math.min(480, vh - 100) : baseH
              },
              position: {
                x: Math.max(20, centerX + offset),
                y: Math.max(45, centerY + offset)
              }
            };
          });
          return updated;
        });
      }
    }
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setHighestZIndex((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: nextZ,
          isMinimized: false
        }
      }));
      return nextZ;
    });
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      soundFx.playOpen();
      setHighestZIndex((prevZ) => {
        const nextZ = prevZ + 1;
        setWindows((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        }));
        return nextZ;
      });
      setActiveWindowId(id);
    },
    []
  );

  const closeWindow = useCallback((id: WindowId) => {
    soundFx.playClose();
    setWindows((prev) => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false
        }
      };

      // Automatically hand off focus to the next highest visible window
      const remainingOpen = (Object.keys(updated) as WindowId[])
        .filter((k) => k !== id && updated[k].isOpen && !updated[k].isMinimized)
        .sort((a, b) => updated[b].zIndex - updated[a].zIndex);

      setActiveWindowId(remainingOpen.length > 0 ? remainingOpen[0] : null);
      return updated;
    });
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    soundFx.playClick();
    setWindows((prev) => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true
        }
      };

      // Automatically hand off focus to the next highest visible window
      const remainingOpen = (Object.keys(updated) as WindowId[])
        .filter((k) => k !== id && updated[k].isOpen && !updated[k].isMinimized)
        .sort((a, b) => updated[b].zIndex - updated[a].zIndex);

      setActiveWindowId(remainingOpen.length > 0 ? remainingOpen[0] : null);
      return updated;
    });
  }, []);

  const restoreWindow = useCallback(
    (id: WindowId) => {
      soundFx.playClick();
      focusWindow(id);
    },
    [focusWindow]
  );

  const maximizeWindow = useCallback((id: WindowId) => {
    soundFx.playClick();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
  }, []);

  const toggleWindow = useCallback(
    (id: WindowId) => {
      const win = windows[id];
      if (!win.isOpen) {
        openWindow(id);
      } else if (win.isMinimized) {
        restoreWindow(id);
      } else if (activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, activeWindowId, openWindow, restoreWindow, minimizeWindow, focusWindow]
  );

  const updatePosition = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: pos
      }
    }));
  }, []);

  const updateSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size
      }
    }));
  }, []);

  const closeAll = useCallback(() => {
    soundFx.playClose();
    setWindows((prev) => {
      const next = { ...prev };
      (Object.keys(next) as WindowId[]).forEach((key) => {
        next[key] = { ...next[key], isOpen: false, isMinimized: false };
      });
      return next;
    });
    setActiveWindowId(null);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      maximizeWindow,
      focusWindow,
      toggleWindow,
      updatePosition,
      updateSize,
      closeAll
    }),
    [
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      maximizeWindow,
      focusWindow,
      toggleWindow,
      updatePosition,
      updateSize,
      closeAll
    ]
  );

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
}

export function useWindowContext() {
  const ctx = useContext(WindowContext);
  if (!ctx) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return ctx;
}
