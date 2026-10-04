import React from 'react';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { OrbitWindow } from './OrbitWindow';
import { MissionControl } from '../apps/mission-control/MissionControl';
import { KnowledgeMatrix } from '../apps/knowledge-matrix/KnowledgeMatrix';
import { AchievementVault } from '../apps/achievement-vault/AchievementVault';
import { EngineeringLog } from '../apps/engineering-log/EngineeringLog';
import { OrbitTerminal } from '../apps/terminal/OrbitTerminal';

export function WindowManager() {
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition
  } = useWindowContext();

  const renderAppContent = (id: WindowId) => {
    switch (id) {
      case 'mission-control':
        return <MissionControl />;
      case 'knowledge-matrix':
        return <KnowledgeMatrix />;
      case 'achievement-vault':
        return <AchievementVault />;
      case 'engineering-log':
        return <EngineeringLog />;
      case 'terminal':
        return <OrbitTerminal />;
      default:
        return null;
    }
  };

  const windowKeys = Object.keys(windows) as WindowId[];

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {windowKeys.map((id) => {
        const win = windows[id];
        if (!win.isOpen || win.isMinimized) return null;

        return (
          <div key={id} className="pointer-events-auto">
            <OrbitWindow
              windowState={win}
              isActive={activeWindowId === id}
              onFocus={() => focusWindow(id)}
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => maximizeWindow(id)}
              onMove={(pos) => updatePosition(id, pos)}
            >
              {renderAppContent(id)}
            </OrbitWindow>
          </div>
        );
      })}
    </div>
  );
}
