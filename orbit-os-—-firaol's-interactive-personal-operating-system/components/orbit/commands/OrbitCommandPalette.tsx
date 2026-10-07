import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { missions } from '@/data/missions';
import { soundFx } from '@/lib/utils';
import {
  Search,
  X,
  Compass,
  Cpu,
  Shield,
  GitBranch,
  Terminal,
  User,
  FileText,
  Sparkles,
  RotateCcw,
  HelpCircle,
  Layers,
  ArrowRight,
  CornerDownLeft,
  Mail,
  Copy,
  Send
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'APPLICATIONS' | 'PROJECTS' | 'SYSTEM ACTIONS';
  description: string;
  badge?: string;
  keywords: string[];
  icon: React.ReactNode;
  action: () => void;
}

interface OrbitCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrbitCommandPalette({ isOpen, onClose }: OrbitCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const { openWindow, closeAll } = useWindowContext();
  const { triggerCorePulse, reboot, setShowHelp } = useOrbitContext();

  // Registry of commands
  const allCommands = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [
      // Core Applications
      {
        id: 'cmd-missions',
        title: 'Mission Control',
        category: 'APPLICATIONS',
        description: 'Active operations, project dossiers & architecture schematics [1]',
        badge: 'APP [1]',
        keywords: ['missions', 'open missions', 'projects', 'operations', 'dossiers', 'schematics'],
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => openWindow('mission-control')
      },
      {
        id: 'cmd-knowledge',
        title: 'Knowledge Matrix',
        category: 'APPLICATIONS',
        description: 'Technical competency domains & applied technologies [2]',
        badge: 'APP [2]',
        keywords: ['knowledge', 'open knowledge', 'matrix', 'skills', 'technologies', 'domains'],
        icon: <Cpu className="w-4 h-4 text-emerald-400" />,
        action: () => openWindow('knowledge-matrix')
      },
      {
        id: 'cmd-vault',
        title: 'Achievement Vault',
        category: 'APPLICATIONS',
        description: 'Recognized honors, hackathons & archival records [3]',
        badge: 'APP [3]',
        keywords: ['achievements', 'open achievements', 'vault', 'records', 'awards', 'hackathon'],
        icon: <Shield className="w-4 h-4 text-amber-400" />,
        action: () => openWindow('achievement-vault')
      },
      {
        id: 'cmd-log',
        title: 'Engineering Log',
        category: 'APPLICATIONS',
        description: 'Chronological self-taught development progression [4]',
        badge: 'APP [4]',
        keywords: ['engineering', 'open engineering', 'log', 'phases', 'timeline', 'progression'],
        icon: <GitBranch className="w-4 h-4 text-blue-400" />,
        action: () => openWindow('engineering-log')
      },
      {
        id: 'cmd-terminal',
        title: 'Interactive Terminal Shell',
        category: 'APPLICATIONS',
        description: 'Command line interface with window dispatch hooks [5]',
        badge: 'APP [5]',
        keywords: ['terminal', 'open terminal', 'shell', 'cli', 'console', 'bash'],
        icon: <Terminal className="w-4 h-4 text-zinc-300" />,
        action: () => openWindow('terminal')
      },
      {
        id: 'cmd-profile',
        title: 'System Identity // Firaol Worku',
        category: 'APPLICATIONS',
        description: 'Professional identity statement, builder mindset & focus',
        badge: 'PROFILE',
        keywords: ['identity', 'open identity', 'profile', 'about', 'firaol', 'bio', 'builder'],
        icon: <User className="w-4 h-4 text-cyan-300" />,
        action: () => openWindow('profile')
      },
      {
        id: 'cmd-cv',
        title: 'Curriculum Vitae / Resume',
        category: 'APPLICATIONS',
        description: 'Print-optimized professional resume document',
        badge: 'CV DOC',
        keywords: ['cv', 'open cv', 'resume', 'open resume', 'curriculum vitae', 'print', 'pdf'],
        icon: <FileText className="w-4 h-4 text-cyan-300" />,
        action: () => openWindow('cv')
      },

      // Project Dossiers
      ...missions.map((m) => ({
        id: `cmd-project-${m.id}`,
        title: `${m.name} (${m.codename})`,
        category: 'PROJECTS' as const,
        description: `${m.category} · ${m.currentState.stage}`,
        badge: 'DOSSIER',
        keywords: [
          m.name.toLowerCase(),
          m.id.toLowerCase(),
          m.category.toLowerCase(),
          'project',
          'dossier',
          'schematic'
        ],
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => {
          window.dispatchEvent(
            new CustomEvent('orbit:select-mission', { detail: m.id })
          );
          openWindow('mission-control');
        }
      })),

      // System Actions
      {
        id: 'cmd-pulse',
        title: 'Trigger Core Resonance Pulse',
        category: 'SYSTEM ACTIONS',
        description: 'Emit radial waveform across the orbital coordinate canvas',
        badge: 'ACTION',
        keywords: ['pulse', 'resonance', 'core', 'wave', 'ripple'],
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        action: () => triggerCorePulse()
      },
      {
        id: 'cmd-help',
        title: 'System Shortcuts & Navigation Guide',
        category: 'SYSTEM ACTIONS',
        description: 'Display keyboard shortcuts and system reference guide',
        badge: 'GUIDE',
        keywords: ['help', 'shortcuts', 'guide', 'keys', 'esc'],
        icon: <HelpCircle className="w-4 h-4 text-zinc-300" />,
        action: () => setShowHelp(true)
      },
      {
        id: 'cmd-close-all',
        title: 'Close All Application Windows',
        category: 'SYSTEM ACTIONS',
        description: 'Dismiss and clear all active windows from the desktop',
        badge: 'WINDOWS',
        keywords: ['close', 'close all', 'minimize all', 'clear windows', 'dismiss'],
        icon: <Layers className="w-4 h-4 text-zinc-400" />,
        action: () => closeAll()
      },
      {
        id: 'cmd-contact',
        title: 'Verified Contact Channels & Identity Layer',
        category: 'SYSTEM ACTIONS',
        description: 'Direct email (tioboss34@gmail.com), GitHub, templates, and availability',
        badge: 'CONTACT',
        keywords: ['contact', 'email', 'reach', 'message', 'collaborate', 'inquiry', 'hire'],
        icon: <Mail className="w-4 h-4 text-cyan-400" />,
        action: () => openWindow('profile')
      },
      {
        id: 'cmd-copy-email',
        title: 'Copy Verified Email Address (tioboss34@gmail.com)',
        category: 'SYSTEM ACTIONS',
        description: 'Instantly copy Firaol\'s primary direct email to clipboard',
        badge: 'CLIPBOARD',
        keywords: ['copy email', 'email address', 'clipboard', 'tioboss34', 'mail'],
        icon: <Copy className="w-4 h-4 text-emerald-400" />,
        action: () => {
          if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText('tioboss34@gmail.com').then(() => {
              soundFx.playSuccess();
            });
          }
        }
      },
      {
        id: 'cmd-mailto-draft',
        title: 'Launch Native Email Client (Direct Compose)',
        category: 'SYSTEM ACTIONS',
        description: 'Trigger mailto: compose window to tioboss34@gmail.com',
        badge: 'MAILTO',
        keywords: ['email compose', 'mailto', 'write email', 'send message'],
        icon: <Send className="w-4 h-4 text-cyan-400" />,
        action: () => {
          window.location.href = 'mailto:tioboss34@gmail.com?subject=Engineering%20Inquiry%20//%20ORBIT%20OS';
        }
      },
      {
        id: 'cmd-reboot',
        title: 'Reboot ORBIT OS Environment',
        category: 'SYSTEM ACTIONS',
        description: 'Restart system runtime and trigger boot initialization protocol',
        badge: 'REBOOT',
        keywords: ['reboot', 'restart', 'reload', 'reset'],
        icon: <RotateCcw className="w-4 h-4 text-amber-400" />,
        action: () => reboot()
      },
      {
        id: 'cmd-sound-test',
        title: 'Audition Web Audio Synthesizer Engine',
        category: 'SYSTEM ACTIONS',
        description: 'Test all 8 synthesized telemetry sound signatures',
        badge: 'AUDIO',
        keywords: ['sound', 'audio', 'test', 'synthesizer', 'chime', 'telemetry'],
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        action: () => {
          soundFx.playSuccess();
          openWindow('terminal');
        }
      },
      {
        id: 'cmd-konami',
        title: 'Celestial Harmonic Resonance Protocol',
        category: 'SYSTEM ACTIONS',
        description: 'Synchronize all 5 orbital nodes with celestial pentatonic harmonics',
        badge: 'SECRET',
        keywords: ['konami', 'celestial', 'easter egg', 'resonance', 'overload'],
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        action: () => {
          soundFx.playEasterEgg();
          triggerCorePulse();
        }
      }
    ];

    return list;
  }, [openWindow, closeAll, triggerCorePulse, reboot, setShowHelp]);

  // Filter commands based on input
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;

    return allCommands.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });
  }, [query, allCommands]);

  // Auto focus and reset selection
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      soundFx.playClick();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFx.playHover();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playHover();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          soundFx.playSuccess();
          selected.action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ORBIT System Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#090e1a] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col pointer-events-auto max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-[#060a14]">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or module..."
            aria-label="Search modules, projects, and actions"
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 font-mono-tech focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-500 hover:text-zinc-200 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-mono-tech text-zinc-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Command Results List */}
        <div
          ref={listRef}
          className="overflow-y-auto p-2 space-y-1 divide-y divide-zinc-800/40"
        >
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono-tech text-zinc-500 space-y-1">
              <div>NO MATCHING SYSTEM COMMANDS FOUND</div>
              <div className="text-[11px] text-zinc-600">
                Try searching for "missions", "jano", "skills", "cv", or "terminal"
              </div>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  data-index={idx}
                  onClick={() => {
                    soundFx.playClick();
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-cyan-950/60 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : 'border border-transparent hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg border shrink-0 ${
                        isSelected
                          ? 'bg-cyan-900/40 border-cyan-600/60'
                          : 'bg-zinc-900 border-zinc-800'
                      }`}
                    >
                      {cmd.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-display font-bold truncate ${
                            isSelected ? 'text-white' : 'text-zinc-200'
                          }`}
                        >
                          {cmd.title}
                        </span>
                        {cmd.badge && (
                          <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono-tech text-cyan-400 shrink-0">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light truncate mt-0.5">
                        {cmd.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-[11px] font-mono-tech text-zinc-500">
                    {isSelected && (
                      <span className="text-cyan-400 flex items-center gap-1 font-semibold text-[10px]">
                        <span>SELECT</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-[#050811] border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono-tech text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 mr-1">↑↓</kbd>
              Navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 mr-1">↵</kbd>
              Execute
            </span>
          </div>

          <div className="text-cyan-400/80">
            ORBIT COMMAND // ACCESS LAYER
          </div>
        </div>
      </div>
    </div>
  );
}
