import React, { useState, useRef, useEffect } from 'react';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { missions } from '@/data/missions';
import { skillDomains } from '@/data/skills';
import { achievementRecords } from '@/data/achievements';
import { engineeringPhases } from '@/data/timeline';
import { soundFx } from '@/lib/utils';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string | React.ReactNode;
}

export function OrbitTerminal() {
  const { openWindow } = useWindowContext();
  const { triggerCorePulse, reboot, systemTime } = useOrbitContext();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'ORBIT OS Shell [v3.2 Portfolio Environment]'
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Connected to Firaol\'s System Core. Type "help" to view available commands.'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    soundFx.playClick();

    // Add to history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Echo input
    const inputLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: 'input',
      text: `firaol@orbit-os:~$ ${cmd}`
    };

    const lower = cmd.toLowerCase();
    const parts = lower.split(' ').filter(Boolean);
    const mainCmd = parts[0];
    const subCmd = parts.slice(1).join(' ');

    let outputLines: TerminalLine[] = [];

    switch (mainCmd) {
      case 'help':
        outputLines = [
          {
            id: `out-${Date.now()}-1`,
            type: 'output',
            text: (
              <div className="space-y-1.5 my-1 text-zinc-300">
                <div className="text-cyan-400 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                  Available Portfolio Commands:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">about</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Profile &amp; engineering overview</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">missions</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Active systems &amp; projects</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">skills</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Technical competency matrix</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">achievements</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Archival recognition records</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">timeline</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Chronological engineering phases</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">contact</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Communication &amp; social links</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">status</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">System telemetry &amp; node health</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">pulse</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Trigger central Core resonance</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">open &lt;app&gt;</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Launch window (e.g. open missions)</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono font-medium">clear</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-300">Flush terminal output buffer</span>
                  </div>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'about':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1.5 my-1.5 text-zinc-300">
                <div className="text-cyan-400 font-semibold">FIRAOL — SOFTWARE &amp; HEALTH ARCHITECT</div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  Software engineer focused on AI-enabled clinical systems, full-stack web platforms, and spatial user interfaces. Builder of Jano Health, Anchor Health, and ORBIT OS.
                </p>
                <div className="text-[11px] text-zinc-400 font-mono">
                  Competencies: React · Next.js · Python · Django · PostgreSQL · FHIR · AI Systems
                </div>
              </div>
            )
          }
        ];
        break;

      case 'missions':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-1.5">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                  Operational Projects:
                </div>
                {missions.map((m) => (
                  <div key={m.id} className="text-xs border-l-2 border-cyan-500/40 pl-2.5 py-0.5 space-y-0.5">
                    <div>
                      <span className="text-zinc-100 font-semibold">{m.name}</span>{' '}
                      <span className="text-zinc-500">({m.codename})</span> —{' '}
                      <span className="text-emerald-400">[{m.category}]</span>
                    </div>
                    <div className="text-zinc-400 font-light">{m.summary}</div>
                  </div>
                ))}
              </div>
            )
          }
        ];
        break;

      case 'skills':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-1.5">
                <div className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                  Knowledge Matrix Competencies:
                </div>
                {skillDomains.map((d) => (
                  <div key={d.id} className="text-xs">
                    <span className="text-zinc-200 font-medium">{d.name}:</span>{' '}
                    <span className="text-zinc-400">
                      {d.technologies.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            )
          }
        ];
        break;

      case 'achievements':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-1.5">
                <div className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  Archival Records:
                </div>
                {achievementRecords.map((a) => (
                  <div key={a.recordNumber} className="text-xs border-l-2 border-amber-500/40 pl-2.5 py-0.5">
                    <span className="text-amber-300 font-mono font-medium">{a.recordNumber}</span> —{' '}
                    <span className="text-zinc-100 font-semibold">{a.title}</span> ({a.year})
                    <div className="text-zinc-400 font-light">{a.recognition} · {a.organization}</div>
                  </div>
                ))}
              </div>
            )
          }
        ];
        break;

      case 'timeline':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-1.5">
                <div className="text-blue-400 font-semibold text-xs uppercase tracking-wider">
                  Engineering Chronology:
                </div>
                {engineeringPhases.map((p) => (
                  <div key={p.id} className="text-xs">
                    <span className="text-blue-300 font-mono font-medium">{p.phaseNumber}</span>{' '}
                    <span className="text-zinc-200 font-semibold">{p.name}:</span>{' '}
                    <span className="text-zinc-400 font-light">{p.tagline}</span>
                  </div>
                ))}
              </div>
            )
          }
        ];
        break;

      case 'contact':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1.5 my-1.5 text-xs text-zinc-300">
                <div className="text-cyan-400 font-semibold text-[11px] uppercase tracking-wider">
                  Communication Channels:
                </div>
                <div>
                  <span className="text-zinc-500">Email:</span>{' '}
                  <a href="mailto:tioboss34@gmail.com" className="text-cyan-400 hover:underline">
                    tioboss34@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500">GitHub:</span>{' '}
                  <a href="https://github.com/firaol-dev" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                    github.com/firaol-dev
                  </a>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'status':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1 my-1.5 text-xs text-zinc-300 font-mono">
                <div className="text-cyan-400 font-semibold text-[11px] uppercase tracking-wider">
                  System Telemetry:
                </div>
                <div>CORE_STATE: NOMINAL // ALL_NODES_SYNCHRONIZED</div>
                <div>LOCAL_TIME: {systemTime || '12:00:00'}</div>
                <div>NODES_ONLINE: 5/5</div>
                <div>ACTIVE_MISSIONS: 3</div>
                <div>OS_VERSION: ORBIT OS v3.2</div>
              </div>
            )
          }
        ];
        break;

      case 'pulse':
        triggerCorePulse();
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'success',
            text: 'Resonance pulse discharged through orbital perimeter traces.'
          }
        ];
        break;

      case 'reboot':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'system',
            text: 'Rebooting ORBIT OS environment...'
          }
        ];
        setTimeout(() => {
          reboot();
        }, 600);
        break;

      case 'open': {
        const targetMap: Record<string, WindowId> = {
          missions: 'mission-control',
          mission: 'mission-control',
          'mission-control': 'mission-control',
          knowledge: 'knowledge-matrix',
          skills: 'knowledge-matrix',
          'knowledge-matrix': 'knowledge-matrix',
          achievements: 'achievement-vault',
          vault: 'achievement-vault',
          'achievement-vault': 'achievement-vault',
          engineering: 'engineering-log',
          log: 'engineering-log',
          timeline: 'engineering-log',
          'engineering-log': 'engineering-log',
          terminal: 'terminal'
        };

        const targetId = targetMap[subCmd];
        if (targetId) {
          openWindow(targetId);
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'success',
              text: `Dispatched window open signal: [${targetId}]`
            }
          ];
        } else {
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'error',
              text: `Unknown application: "${subCmd}". Valid targets: missions, knowledge, achievements, engineering, terminal`
            }
          ];
        }
        break;
      }

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

      default:
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'error',
            text: `command not recognized: "${mainCmd}". Type "help" for available commands.`
          }
        ];
        break;
    }

    setLines((prev) => [...prev, inputLine, ...outputLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full flex flex-col font-mono-tech text-xs bg-[#060910] text-zinc-300 p-2 sm:p-4 rounded-xl select-text min-h-[340px]"
    >
      {/* Terminal History Display */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`leading-relaxed ${
              line.type === 'input'
                ? 'text-cyan-300 font-semibold'
                : line.type === 'error'
                ? 'text-rose-400'
                : line.type === 'success'
                ? 'text-emerald-400'
                : line.type === 'system'
                ? 'text-zinc-500 italic'
                : 'text-zinc-200'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-zinc-800/80">
        <span className="text-cyan-400 select-none font-semibold">firaol@orbit-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command prompt"
          className="flex-1 bg-transparent border-none outline-none text-zinc-100 font-mono-tech text-xs focus:ring-0 p-0"
        />
      </div>
    </div>
  );
}
