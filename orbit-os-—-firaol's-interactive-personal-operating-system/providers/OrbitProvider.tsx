import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { soundFx } from '@/lib/utils';

export type BootStage =
  | 'INITIALIZING'
  | 'LOADING_CORE'
  | 'CALIBRATING'
  | 'CONNECTING'
  | 'READY'
  | 'COMPLETE';

interface OrbitContextType {
  bootStage: BootStage;
  isBooting: boolean;
  isResonating: boolean;
  isMuted: boolean;
  hoveredNodeId: string | null;
  activeNodeId: string | null;
  showHelp: boolean;
  systemTime: string;
  uptimeSeconds: number;
  skipBoot: () => void;
  reboot: () => void;
  triggerCorePulse: () => void;
  toggleMute: () => void;
  setHoveredNodeId: (id: string | null) => void;
  setActiveNodeId: (id: string | null) => void;
  setShowHelp: (show: boolean) => void;
}

const OrbitContext = createContext<OrbitContextType | null>(null);

export function OrbitProvider({ children }: { children: React.ReactNode }) {
  // Check if user has booted previously in this session
  const [bootStage, setBootStage] = useState<BootStage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const hasBooted = sessionStorage.getItem('orbit_has_booted');
        if (hasBooted === 'true') {
          return 'COMPLETE';
        }
      } catch {
        // Fallback for restricted storage
      }
    }
    return 'INITIALIZING';
  });

  const [isResonating, setIsResonating] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [systemTime, setSystemTime] = useState<string>('');
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);

  // Live system clock and uptime counter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setSystemTime(`${hours}:${mins}:${secs}`);
    };
    updateTime();
    const timer = setInterval(() => {
      updateTime();
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Boot sequence lifecycle progression
  useEffect(() => {
    if (bootStage === 'COMPLETE') return;

    let timeout: NodeJS.Timeout;
    if (bootStage === 'INITIALIZING') {
      timeout = setTimeout(() => setBootStage('LOADING_CORE'), 650);
    } else if (bootStage === 'LOADING_CORE') {
      timeout = setTimeout(() => setBootStage('CALIBRATING'), 650);
    } else if (bootStage === 'CALIBRATING') {
      timeout = setTimeout(() => setBootStage('CONNECTING'), 600);
    } else if (bootStage === 'CONNECTING') {
      timeout = setTimeout(() => setBootStage('READY'), 550);
    } else if (bootStage === 'READY') {
      timeout = setTimeout(() => {
        setBootStage('COMPLETE');
        try {
          sessionStorage.setItem('orbit_has_booted', 'true');
        } catch {
          // ignore storage error
        }
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [bootStage]);

  const skipBoot = useCallback(() => {
    soundFx.playClick();
    setBootStage('COMPLETE');
    try {
      sessionStorage.setItem('orbit_has_booted', 'true');
    } catch {
      // ignore
    }
  }, []);

  const reboot = useCallback(() => {
    soundFx.playClose();
    setBootStage('INITIALIZING');
    try {
      sessionStorage.removeItem('orbit_has_booted');
    } catch {
      // ignore
    }
  }, []);

  const triggerCorePulse = useCallback(() => {
    soundFx.playPulse();
    setIsResonating(true);
    setTimeout(() => {
      setIsResonating(false);
    }, 1200);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundFx.setMuted(next);
      if (!next) {
        soundFx.playClick();
      }
      return next;
    });
  }, []);

  const isBooting = bootStage !== 'COMPLETE';

  const value = useMemo(
    () => ({
      bootStage,
      isBooting,
      isResonating,
      isMuted,
      hoveredNodeId,
      activeNodeId,
      showHelp,
      systemTime,
      uptimeSeconds,
      skipBoot,
      reboot,
      triggerCorePulse,
      toggleMute,
      setHoveredNodeId,
      setActiveNodeId,
      setShowHelp
    }),
    [
      bootStage,
      isBooting,
      isResonating,
      isMuted,
      hoveredNodeId,
      activeNodeId,
      showHelp,
      systemTime,
      uptimeSeconds,
      skipBoot,
      reboot,
      triggerCorePulse,
      toggleMute,
      setHoveredNodeId,
      setActiveNodeId,
      setShowHelp
    ]
  );

  return <OrbitContext.Provider value={value}>{children}</OrbitContext.Provider>;
}

export function useOrbitContext() {
  const ctx = useContext(OrbitContext);
  if (!ctx) {
    throw new Error('useOrbitContext must be used within an OrbitProvider');
  }
  return ctx;
}
