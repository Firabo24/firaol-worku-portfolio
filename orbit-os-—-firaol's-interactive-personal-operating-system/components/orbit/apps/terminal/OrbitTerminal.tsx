import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { useOrbitContext } from '@/providers/OrbitProvider';
import { missions } from '@/data/missions';
import { skillDomains } from '@/data/skills';
import { achievementRecords } from '@/data/achievements';
import { engineeringPhases } from '@/data/timeline';
import { profileData } from '@/data/profile';
import { soundFx } from '@/lib/utils';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success' | 'info';
  text: string | React.ReactNode;
}

const KNOWN_COMMANDS = [
  'help',
  'whoami',
  'about',
  'projects',
  'missions',
  'inspect',
  'case',
  'focus',
  'now',
  'knowledge',
  'skills',
  'timeline',
  'engineering',
  'achievements',
  'vault',
  'source',
  'orbit',
  'status',
  'contact',
  'email',
  'mail',
  'cv',
  'resume',
  'palette',
  'pulse',
  'reboot',
  'open',
  'history',
  'clear',
  'matrix',
  'voyager',
  'deepspace',
  'sudo',
  'konami',
  'coffee',
  'tea',
  'ping',
  'sound',
  'audio',
  'secrets',
  'eastereggs'
];

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

export function OrbitTerminal() {
  const { openWindow, windows, activeWindowId } = useWindowContext();
  const { triggerCorePulse, reboot, systemTime, uptimeSeconds, isMuted } = useOrbitContext();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'ORBIT OS Shell [v3.2 Technical Access Layer]'
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Connected to Firaol\'s System Core. Type "help" to view categorized commands.'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Suggestions for autocomplete based on first token
  const suggestions = useMemo(() => {
    const trimmed = inputVal.trimStart().toLowerCase();
    if (!trimmed || !showSuggestions) return [];
    const tokens = trimmed.split(' ');
    const firstToken = tokens[0];

    // If user has only typed command prefix
    if (tokens.length === 1) {
      return KNOWN_COMMANDS.filter((cmd) => cmd.startsWith(firstToken) && cmd !== firstToken).slice(0, 5);
    }

    // If typing "inspect " or "case " or "open ", suggest targets
    if ((firstToken === 'inspect' || firstToken === 'case') && tokens.length === 2) {
      const projPrefix = tokens[1];
      return ['jano', 'anchor', 'orbit'].filter((p) => p.startsWith(projPrefix));
    }

    if (firstToken === 'open' && tokens.length === 2) {
      const openPrefix = tokens[1];
      return ['missions', 'knowledge', 'achievements', 'engineering', 'terminal', 'profile', 'cv'].filter((p) =>
        p.startsWith(openPrefix)
      );
    }

    return [];
  }, [inputVal, showSuggestions]);

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleApplySuggestion = (suggestion: string) => {
    soundFx.playClick();
    const tokens = inputVal.trimStart().split(' ');
    if (tokens.length <= 1) {
      setInputVal(suggestion + ' ');
    } else {
      tokens[tokens.length - 1] = suggestion;
      setInputVal(tokens.join(' ') + ' ');
    }
    inputRef.current?.focus();
  };

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    soundFx.playClick();

    // Add to history (deduplicated against immediate last)
    setHistory((prev) => (prev[0] === cmd ? prev : [cmd, ...prev]));
    setHistoryIndex(-1);
    setShowSuggestions(true);

    // Echo input line
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
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-3 my-2 text-zinc-300">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider border-b border-zinc-800 pb-1 flex items-center justify-between">
                  <span>ORBIT OS COMMAND DIRECTORY</span>
                  <span className="text-zinc-500 font-mono text-[10px]">Type &lt;cmd&gt; or TAB to complete</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  {/* System Commands */}
                  <div className="space-y-1">
                    <div className="text-cyan-300 font-semibold text-[11px] uppercase tracking-wider">SYSTEM</div>
                    <div className="text-zinc-400 pl-2 space-y-0.5">
                      <div><span className="text-emerald-400 font-medium">status</span> — System diagnostic &amp; active windows</div>
                      <div><span className="text-emerald-400 font-medium">orbit</span> — Runtime architecture &amp; coordinate map</div>
                      <div><span className="text-emerald-400 font-medium">pulse</span> — Trigger central Core resonance wave</div>
                      <div><span className="text-emerald-400 font-medium">reboot</span> — Restart environment &amp; boot protocol</div>
                      <div><span className="text-emerald-400 font-medium">clear</span> — Flush terminal output buffer</div>
                    </div>
                  </div>

                  {/* Identity Commands */}
                  <div className="space-y-1">
                    <div className="text-cyan-300 font-semibold text-[11px] uppercase tracking-wider">IDENTITY</div>
                    <div className="text-zinc-400 pl-2 space-y-0.5">
                      <div><span className="text-emerald-400 font-medium">whoami</span> — Identity statement &amp; domains</div>
                      <div><span className="text-emerald-400 font-medium">about</span> — Bio narrative &amp; active systems</div>
                      <div><span className="text-emerald-400 font-medium">focus / now</span> — Current technical exploration</div>
                      <div><span className="text-emerald-400 font-medium">contact / email</span> — Verified channels &amp; email details</div>
                      <div><span className="text-emerald-400 font-medium">cv / resume</span> — Open printable CV document window</div>
                    </div>
                  </div>

                  {/* Projects Commands */}
                  <div className="space-y-1">
                    <div className="text-cyan-300 font-semibold text-[11px] uppercase tracking-wider">PROJECTS</div>
                    <div className="text-zinc-400 pl-2 space-y-0.5">
                      <div><span className="text-emerald-400 font-medium">projects / missions</span> — List all active projects</div>
                      <div><span className="text-emerald-400 font-medium">inspect &lt;name&gt;</span> — Technical summary of project</div>
                      <div><span className="text-emerald-400 font-medium">case &lt;name&gt;</span> — Open full dossier in Mission Control</div>
                      <div><span className="text-emerald-400 font-medium">source</span> — Authentic repository source links</div>
                    </div>
                  </div>

                  {/* Knowledge & Navigation */}
                  <div className="space-y-1">
                    <div className="text-cyan-300 font-semibold text-[11px] uppercase tracking-wider">KNOWLEDGE &amp; NAVIGATION</div>
                    <div className="text-zinc-400 pl-2 space-y-0.5">
                      <div><span className="text-emerald-400 font-medium">skills / knowledge</span> — Technical competency matrix</div>
                      <div><span className="text-emerald-400 font-medium">timeline / engineering</span> — 5 Development phases</div>
                      <div><span className="text-emerald-400 font-medium">achievements / vault</span> — Archival recognized records</div>
                      <div><span className="text-emerald-400 font-medium">palette</span> — Open system command palette [Ctrl+K]</div>
                      <div><span className="text-emerald-400 font-medium">open &lt;module&gt;</span> — Launch window (e.g. open cv)</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'whoami':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 text-zinc-300">
                <div className="text-cyan-400 font-semibold text-xs tracking-wider">
                  IDENTITY // {profileData.name.toUpperCase()} [{profileData.origin.toUpperCase()}]
                </div>
                <div className="text-xs font-mono text-zinc-300 font-medium">
                  {profileData.title}
                </div>
                <div className="text-[11px] font-mono text-cyan-300">
                  {profileData.tagline}
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {profileData.shortBio}
                </p>
                <div className="text-xs border-l-2 border-cyan-500/40 pl-2.5 py-1 space-y-1">
                  <div className="text-cyan-400 font-mono text-[11px] font-semibold">CORE DOMAINS:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono text-zinc-400">
                    {profileData.domains.map((d) => (
                      <div key={d.name}>• <span className="text-zinc-200">{d.name}</span></div>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 pt-1">
                  Type <span className="text-cyan-400">about</span> for complete narrative, <span className="text-cyan-400">focus</span> for active exploration, or <span className="text-cyan-400">cv</span> to open verified resume.
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
              <div className="space-y-2 my-2 text-zinc-300">
                <div className="text-cyan-400 font-semibold text-xs tracking-wider">
                  SYSTEM IDENTITY // {profileData.name.toUpperCase()} [{profileData.origin.toUpperCase()}]
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">
                  {profileData.tagline}
                </div>
                <p className="text-xs text-zinc-200 font-light leading-relaxed">
                  {profileData.identityBio}
                </p>
                <div className="text-xs border-l-2 border-emerald-500/40 pl-2.5 py-1 space-y-1">
                  <div className="text-emerald-400 font-mono text-[11px] font-semibold">ACTIVE SYSTEMS:</div>
                  {profileData.activeSystems.map((s) => (
                    <div key={s.id} className="text-zinc-300 text-xs">
                      <span className="font-semibold text-zinc-100">{s.name}</span> — <span className="text-zinc-400">{s.summary}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs border-l-2 border-cyan-500/40 pl-2.5 py-1 space-y-1">
                  <div className="text-cyan-300 font-mono text-[11px] font-semibold">ENGINEERING MINDSET:</div>
                  <p className="text-zinc-300 text-xs font-light leading-relaxed">
                    {profileData.mindset.description}
                  </p>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono pt-1">
                  Type <span className="text-cyan-400">open profile</span> to launch the full graphical identity dossier.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'focus':
      case 'now':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 text-zinc-300">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                  CURRENT TECHNICAL EXPLORATION &amp; DIRECTION
                </div>
                <p className="text-xs text-zinc-400 font-light">
                  Active engineering thrusts based on established systems development:
                </p>
                <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/40 py-1">
                  {profileData.currentFocus.map((foc, idx) => (
                    <div key={idx} className="text-xs font-mono text-zinc-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">0{idx + 1}.</span>
                      <span className="font-light leading-relaxed">{foc}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 pt-1">
                  Type <span className="text-cyan-400">projects</span> to view active systems or <span className="text-cyan-400">timeline</span> to view phase progression.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'projects':
      case 'missions':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2.5 my-2">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>OPERATIONAL SYSTEMS DIRECTORY ({missions.length} REGISTERED)</span>
                  <span className="text-zinc-500 text-[10px] font-mono">Use "inspect &lt;name&gt;" or "case &lt;name&gt;"</span>
                </div>

                <div className="space-y-2">
                  {missions.map((m) => (
                    <div key={m.id} className="text-xs border-l-2 border-cyan-500/40 pl-3 py-1 space-y-1 bg-[#060a14]/60 rounded-r">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-zinc-100 font-bold font-display">{m.name}</span>{' '}
                          <span className="text-zinc-500 font-mono">({m.codename})</span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                          {m.currentState.stage}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300">{m.category}</div>
                      <div className="text-zinc-400 font-light leading-relaxed">{m.summary}</div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-zinc-500 pt-1">
                  Type <span className="text-cyan-400">inspect jano</span>, <span className="text-cyan-400">inspect anchor</span>, or <span className="text-cyan-400">inspect orbit</span> for technical summaries.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'inspect': {
        if (!subCmd) {
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'error',
              text: 'Usage: inspect <project>. Available targets: jano, anchor, orbit'
            }
          ];
          break;
        }

        const targetMission = missions.find(
          (m) =>
            m.id === subCmd ||
            m.id.replace('-health', '').replace('-os', '') === subCmd ||
            m.name.toLowerCase().includes(subCmd) ||
            m.codename.toLowerCase().includes(subCmd)
        );

        if (!targetMission) {
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'error',
              text: (
                <div className="space-y-1">
                  <div>PROJECT NOT FOUND: "{subCmd}"</div>
                  <div className="text-zinc-400 text-xs">AVAILABLE TARGETS: jano, anchor, orbit</div>
                </div>
              )
            }
          ];
          break;
        }

        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2.5 my-2 text-zinc-300">
                <div className="flex items-baseline justify-between border-b border-zinc-800 pb-1">
                  <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    {targetMission.name.toUpperCase()} // TECHNICAL INSPECTION
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {targetMission.currentState.stage}
                  </span>
                </div>

                <div className="text-xs font-mono text-zinc-400">
                  CATEGORY: <span className="text-zinc-200">{targetMission.category}</span> · ROLE: <span className="text-zinc-200">{targetMission.role}</span>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-rose-400 font-mono font-semibold text-[11px] block">PROBLEM STATEMENT:</span>
                  <p className="text-zinc-300 font-light pl-2.5 border-l border-zinc-800 leading-relaxed">
                    {targetMission.problem.summary}
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-emerald-400 font-mono font-semibold text-[11px] block">SYSTEM APPROACH:</span>
                  <p className="text-zinc-300 font-light pl-2.5 border-l border-zinc-800 leading-relaxed">
                    {targetMission.approach.summary}
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-cyan-300 font-mono font-semibold text-[11px] block">ARCHITECTURAL SPECIFICATIONS:</span>
                  <div className="space-y-0.5 pl-2.5 border-l border-cyan-500/40 text-[11px] font-mono text-zinc-400">
                    {targetMission.architecture.map((arch, i) => (
                      <div key={i}>• {arch}</div>
                    ))}
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-400">
                  APPLIED STACK: <span className="text-zinc-200">{targetMission.techStack.join(' · ')}</span>
                </div>

                <div className="text-[10px] font-mono text-zinc-400 bg-zinc-950/70 p-2 rounded border border-zinc-800/80 flex items-center justify-between">
                  <span>{targetMission.visuals.length} interactive visual schematics registered.</span>
                  <span className="text-cyan-400 font-bold">
                    Type "case {targetMission.id.replace('-health', '').replace('-os', '')}" to view full dossier
                  </span>
                </div>
              </div>
            )
          }
        ];
        break;
      }

      case 'case': {
        if (!subCmd) {
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'error',
              text: 'Usage: case <project>. Available targets: jano, anchor, orbit'
            }
          ];
          break;
        }

        const targetMission = missions.find(
          (m) =>
            m.id === subCmd ||
            m.id.replace('-health', '').replace('-os', '') === subCmd ||
            m.name.toLowerCase().includes(subCmd) ||
            m.codename.toLowerCase().includes(subCmd)
        );

        if (!targetMission) {
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'error',
              text: `PROJECT NOT FOUND: "${subCmd}". Available targets: jano, anchor, orbit`
            }
          ];
          break;
        }

        window.dispatchEvent(
          new CustomEvent('orbit:select-mission', { detail: targetMission.id })
        );
        openWindow('mission-control');

        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'success',
            text: `Dispatched Mission Control case study focus: [${targetMission.codename}]. Dossier and schematics mounted.`
          }
        ];
        break;
      }

      case 'source':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 text-zinc-300">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                  AUTHENTIC SOURCE REPOSITORIES
                </div>
                <div className="space-y-1.5 font-mono text-xs pl-2.5 border-l-2 border-cyan-500/40">
                  {missions.map((m) => (
                    <div key={m.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                      <span className="text-zinc-100 font-semibold">{m.name}:</span>
                      {m.githubUrl ? (
                        <a href={m.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                          {m.githubUrl}
                        </a>
                      ) : (
                        <span className="text-zinc-500">Internal Prototype</span>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 pt-1">
                    <span className="text-zinc-100 font-semibold">GitHub Profile:</span>
                    <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                      {profileData.contact.github}
                    </a>
                  </div>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'orbit':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 text-zinc-300 font-mono text-xs">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider border-b border-zinc-800 pb-1">
                  ORBIT OS // SYSTEM RUNTIME SPECIFICATION
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                  <div>ENVIRONMENT: <span className="text-zinc-200">ORBIT OS v3.2 Client SPA</span></div>
                  <div>STATUS: <span className="text-emerald-400">NOMINAL</span></div>
                  <div>GEOMETRY: <span className="text-zinc-200">5 Symmetrical Pentagonal Nodes (72° Offset)</span></div>
                  <div>CANVAS MATH: <span className="text-cyan-300">Polar [x=cx+R*cos(θ), y=cy+R*sin(θ)]</span></div>
                  <div>REGISTERED MISSIONS: <span className="text-zinc-200">{missions.length} Operations</span></div>
                  <div>AUDIO TELEMETRY: <span className={isMuted ? 'text-zinc-500' : 'text-emerald-400'}>{isMuted ? 'Muted' : 'Procedural Web Audio Active'}</span></div>
                </div>
                <div className="pt-1 text-[11px] text-zinc-400 border-t border-zinc-800">
                  MODULES: Mission Control · Knowledge Matrix · Achievement Vault · Engineering Log · Terminal · System Identity · Curriculum Vitae
                </div>
              </div>
            )
          }
        ];
        break;

      case 'status': {
        const openList = Object.values(windows).filter((w) => w.isOpen);
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 font-mono text-xs">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider border-b border-zinc-800 pb-1">
                  SYSTEM TELEMETRY DIAGNOSTIC
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                  <div>SYSTEM: <span className="text-zinc-200">ORBIT OS</span></div>
                  <div>HEALTH: <span className="text-emerald-400">SYS_NOMINAL</span></div>
                  <div>UPTIME: <span className="text-zinc-200">{formatUptime(uptimeSeconds)}</span></div>
                  <div>UTC CLOCK: <span className="text-zinc-200">{systemTime || '12:00:00'}</span></div>
                  <div>ORBITAL NODES: <span className="text-zinc-200">5 Mapped</span></div>
                  <div>OPEN WINDOWS: <span className="text-cyan-300">{openList.length}</span></div>
                  <div>ACTIVE WINDOW: <span className="text-zinc-200">{activeWindowId ? windows[activeWindowId]?.shortTitle : 'Desktop Core'}</span></div>
                  <div>SOUND: <span className={isMuted ? 'text-zinc-500' : 'text-emerald-400'}>{isMuted ? 'Muted' : 'Enabled'}</span></div>
                </div>
                {openList.length > 0 && (
                  <div className="text-[11px] text-zinc-500 pt-1">
                    ACTIVE SESSIONS: {openList.map((w) => w.shortTitle).join(', ')}
                  </div>
                )}
              </div>
            )
          }
        ];
        break;
      }

      case 'skills':
      case 'knowledge':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2">
                <div className="text-cyan-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>TECHNICAL KNOWLEDGE MATRIX ({skillDomains.length} DOMAINS)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {skillDomains.map((dom) => (
                    <div key={dom.id} className="p-2.5 bg-[#060a14] rounded border border-zinc-800 space-y-1">
                      <div className="text-emerald-400 font-bold font-mono text-[11px]">{dom.name}</div>
                      <p className="text-[11px] text-zinc-400 font-light leading-snug">{dom.summary}</p>
                      <div className="text-[10px] font-mono text-zinc-300 pt-1 truncate">
                        {dom.technologies.join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Type <span className="text-cyan-400">open knowledge</span> to launch full interactive matrix.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'achievements':
      case 'vault':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2">
                <div className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  ACHIEVEMENT VAULT // ARCHIVAL RECORDS
                </div>
                <div className="space-y-1.5 font-mono text-xs pl-2.5 border-l-2 border-amber-500/40">
                  {achievementRecords.map((ach) => (
                    <div key={ach.recordNumber} className="space-y-0.5">
                      <div>
                        <span className="text-zinc-100 font-semibold">{ach.title}</span> —{' '}
                        <span className="text-amber-400 font-medium">[{ach.recognition} ({ach.year})]</span>
                      </div>
                      <div className="text-zinc-400 text-[11px] font-light">{ach.summary}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Type <span className="text-cyan-400">open achievements</span> to view full record archive.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'timeline':
      case 'engineering':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2">
                <div className="text-blue-400 font-semibold text-xs uppercase tracking-wider">
                  ENGINEERING LOG // CHRONOLOGICAL PHASES
                </div>
                <div className="space-y-1.5 font-mono text-xs pl-2.5 border-l-2 border-blue-500/40">
                  {engineeringPhases.map((phase) => (
                    <div key={phase.id} className="space-y-0.5">
                      <div>
                        <span className="text-cyan-400 font-bold">{phase.phaseNumber}:</span>{' '}
                        <span className="text-zinc-100 font-semibold">{phase.name}</span> —{' '}
                        <span className="text-zinc-500 text-[11px]">{phase.tagline}</span>
                      </div>
                      <div className="text-zinc-400 text-[11px] font-light">{phase.description}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Type <span className="text-cyan-400">open engineering</span> to view full chronological log.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'contact':
      case 'email':
      case 'mail':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between text-cyan-400 font-semibold text-xs uppercase tracking-wider border-b border-cyan-500/30 pb-1">
                  <span>VERIFIED CHANNELS // DIRECT COMMUNICATION</span>
                  <span className="text-[10px] text-emerald-400 font-mono">STATUS: ACTIVE</span>
                </div>
                <div className="pl-2.5 border-l-2 border-cyan-500/40 space-y-1.5">
                  <div>
                    <span className="text-zinc-500 font-medium">EMAIL: </span>
                    <a href={`mailto:${profileData.contact.email}`} className="text-cyan-400 hover:underline font-semibold">
                      {profileData.contact.email}
                    </a>
                    <span className="text-zinc-500 text-[11px] ml-2">(Primary direct channel)</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">GITHUB: </span>
                    <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                      github.com/{profileData.contact.githubHandle}
                    </a>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">LOCATION: </span>
                    <span className="text-zinc-300">{profileData.origin}</span>
                    <span className="text-zinc-500 ml-2">[{profileData.contact.timezone}]</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">RESPONSE: </span>
                    <span className="text-zinc-300">24–48 hours for engineering &amp; technical inquiries</span>
                  </div>
                  <div className="pt-1 text-[11px] text-zinc-400">
                    <span className="text-cyan-400 font-medium">Tip: </span>
                    Type <code className="text-emerald-400">open profile</code> to access pre-formatted email templates &amp; interactive dispatch.
                  </div>
                </div>
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
            text: 'Resonance pulse triggered across central Core geometry.'
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

      case 'cv':
      case 'resume':
        openWindow('cv');
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'success',
            text: 'Dispatched Curriculum Vitae / Resume document window [cv].'
          }
        ];
        break;

      case 'palette':
      case 'command':
        window.dispatchEvent(new CustomEvent('orbit:open-command-palette'));
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'success',
            text: 'Triggered System Command Palette overlay [Ctrl+K].'
          }
        ];
        break;

      case 'history':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1 my-1 font-mono text-xs text-zinc-400">
                <div className="text-cyan-400 font-semibold text-xs uppercase">SESSION COMMAND HISTORY:</div>
                {history.length === 0 ? (
                  <div className="text-zinc-600">No previous commands executed.</div>
                ) : (
                  history.slice(0, 10).map((h, i) => (
                    <div key={i} className="text-zinc-300">
                      <span className="text-zinc-600 mr-2">{i + 1}.</span> {h}
                    </div>
                  ))
                )}
              </div>
            )
          }
        ];
        break;

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

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
          terminal: 'terminal',
          profile: 'profile',
          about: 'profile',
          identity: 'profile',
          cv: 'cv',
          resume: 'cv'
        };

        // Also support open jano, open anchor, open orbit
        if (subCmd === 'jano' || subCmd === 'anchor' || subCmd === 'orbit') {
          const matched = missions.find((m) => m.id.includes(subCmd));
          if (matched) {
            window.dispatchEvent(
              new CustomEvent('orbit:select-mission', { detail: matched.id })
            );
          }
          openWindow('mission-control');
          outputLines = [
            {
              id: `out-${Date.now()}`,
              type: 'success',
              text: `Dispatched Mission Control dossier focus: [${subCmd}].`
            }
          ];
          break;
        }

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
              text: `Unknown application: "${subCmd}". Valid targets: missions, knowledge, achievements, engineering, terminal, profile, cv`
            }
          ];
        }
        break;
      }

      case 'sound':
      case 'audio':
        soundFx.playSuccess();
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between text-cyan-400 font-semibold text-xs uppercase tracking-wider border-b border-cyan-500/30 pb-1">
                  <span>ORBIT AUDIO ENGINE // SYNTHESIZED SOUND SIGNATURES</span>
                  <span className="text-[10px] text-emerald-400 font-mono">STATUS: {isMuted ? 'MUTED' : 'ONLINE'}</span>
                </div>
                <div className="text-zinc-400 text-[11px] font-light">
                  Calibrated Web Audio API oscillators and gain envelopes. Click any signature below to audition:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                  <button
                    onClick={() => soundFx.playClick()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Click <span className="text-[9px] text-zinc-500 block">800-1400Hz</span>
                  </button>
                  <button
                    onClick={() => soundFx.playHover()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Hover <span className="text-[9px] text-zinc-500 block">1600-2200Hz</span>
                  </button>
                  <button
                    onClick={() => soundFx.playFocus()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Focus <span className="text-[9px] text-zinc-500 block">360-480Hz</span>
                  </button>
                  <button
                    onClick={() => soundFx.playOpen()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Open <span className="text-[9px] text-zinc-500 block">440-880Hz</span>
                  </button>
                  <button
                    onClick={() => soundFx.playClose()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Close <span className="text-[9px] text-zinc-500 block">660-330Hz</span>
                  </button>
                  <button
                    onClick={() => soundFx.playPulse()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Pulse <span className="text-[9px] text-zinc-500 block">220-110Hz</span>
                  </button>
                  <button
                    onClick={() => soundFx.playBoot()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Boot Chime <span className="text-[9px] text-zinc-500 block">C-Maj Triad</span>
                  </button>
                  <button
                    onClick={() => soundFx.playEasterEgg()}
                    className="px-2.5 py-1.5 rounded bg-zinc-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 text-left text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    • Celestial <span className="text-[9px] text-emerald-500 block">Pentatonic</span>
                  </button>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'matrix':
        soundFx.playMatrix();
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1.5 my-2 font-mono text-xs">
                <div className="text-emerald-400 font-semibold tracking-wider">
                  [VISUAL EASTER EGG // TERMINAL MATRIX RAIN SIMULATION]
                </div>
                <div className="p-2.5 rounded bg-[#031508]/80 border border-emerald-500/40 font-mono text-[11px] text-emerald-400 space-y-0.5 overflow-x-auto select-none">
                  <div className="opacity-90">01001111 01010010 01000010 01001001 01010100 // ORBIT_SYS</div>
                  <div className="opacity-75">78 61 6e 6f 20 63 61 72 65 20 6f 73 // JANO_HEALTH_SYNC</div>
                  <div className="opacity-60">a8:f4:12:c0:99:ee:b1 // NODE_LATENCY_SIMULATED</div>
                  <div className="opacity-80">RUST_ACTIX_WASM_CRATE // HIGH_PRECISION_AUDIO</div>
                  <div className="text-emerald-300 font-bold">"There is no spoon... only distributed architecture."</div>
                </div>
                <div className="text-zinc-500 text-[10px]">
                  Visual Easter egg simulation — no actual system access or network connection.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'voyager':
      case 'deepspace':
        soundFx.playEasterEgg();
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 font-mono text-xs text-zinc-300">
                <div className="text-cyan-400 font-semibold uppercase tracking-wider border-b border-cyan-500/30 pb-1">
                  VOYAGER REFERENCE // HISTORICAL ARCHIVE
                </div>
                <div className="pl-2 border-l-2 border-cyan-500/50 space-y-1 text-[11px]">
                  <div><span className="text-zinc-500 font-medium">VOYAGER FACT:</span> ~163.4 AU from Sol (~24.4B km) [NASA JPL Ephemeris Archive Reference]</div>
                  <div><span className="text-zinc-500 font-medium">CARRIER (HISTORICAL):</span> 8.4 GHz (Deep Space Network)</div>
                  <div><span className="text-zinc-500 font-medium">ROUNDTRIP DELAY:</span> ~45h 16m (Calculated reference)</div>
                  <blockquote className="text-cyan-300 italic pt-1">
                    "To the makers of music — all worlds, all times." — Voyager Golden Record
                  </blockquote>
                  <p className="text-zinc-400 pt-0.5">
                    Engineering Inspiration: A static reference celebrating autonomous systems designed to operate across decades. Not a live query to active spacecraft telemetry.
                  </p>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'sudo':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'error',
            text: (
              <div className="space-y-1 font-mono text-xs">
                <div className="text-amber-400 font-semibold">[PORTFOLIO EASTER EGG // PRIVILEGE CHECK]</div>
                <div className="text-zinc-300">
                  Nice try! This is a client-side portfolio interface, so sudo privilege elevation does not apply.
                </div>
                <div className="text-zinc-400 text-[11px]">
                  Root supervisor clearance belongs to <span className="text-cyan-400 font-bold">Firaol Worku</span>. You already possess full guest authorization to explore all architecture dossiers, source repositories, and technical case studies.
                </div>
              </div>
            )
          }
        ];
        break;

      case 'konami':
        soundFx.playEasterEgg();
        triggerCorePulse({ silent: true });
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1 font-mono text-xs text-zinc-200">
                <div className="text-emerald-400 font-semibold">
                  [CELESTIAL EASTER EGG: UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A]
                </div>
                <div className="text-zinc-300">
                  ⚡ Celestial resonance activated across all 5 orbital nodes! Synthesized pentatonic harmonic tone.
                </div>
                <div className="text-cyan-400 text-[11px]">
                  Tip: You can also enter the Konami code sequence directly on your keyboard anywhere on the desktop!
                </div>
              </div>
            )
          }
        ];
        break;

      case 'coffee':
      case 'tea':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1.5 my-2 font-mono text-xs text-zinc-300">
                <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <span>☕ ORBIT CULTURAL EASTER EGG // PLAYFUL SYSTEM ANOMALY</span>
                </div>
                <div className="pl-2 border-l-2 border-amber-500/50 space-y-0.5 text-[11px]">
                  <div><span className="text-zinc-500 font-medium">ORIGIN:</span> Yirgacheffe, Gedeo Zone, Ethiopia (~2,150m Altitude)</div>
                  <div><span className="text-zinc-500 font-medium">PROCESS:</span> Anaerobic Natural // Heirloom Cultivar</div>
                  <div><span className="text-zinc-500 font-medium">CUP PROFILE:</span> Jasmine blossom, bergamot, candied peach, floral citrus</div>
                  <div><span className="text-zinc-500 font-medium">CULTURAL NOTE:</span> An Ethiopian coffee heritage tribute powering software engineering and distributed systems. (Not operational telemetry).</div>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'ping':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-1 my-2 font-mono text-xs text-zinc-300">
                <div className="text-cyan-400 font-semibold">
                  SIMULATED TELEMETRY // ORBIT INTERACTION TEST
                </div>
                <div className="text-zinc-400 pl-2 space-y-0.5 text-[11px]">
                  <div className="text-zinc-500">[PORTFOLIO SYSTEM SIMULATION — Client-side synthetic latency benchmark]</div>
                  <div>SIMULATED PACKET #1: seq=1 size=64B time=1.2ms [SIMULATED]</div>
                  <div>SIMULATED PACKET #2: seq=2 size=64B time=0.9ms [SIMULATED]</div>
                  <div>SIMULATED PACKET #3: seq=3 size=64B time=1.1ms [SIMULATED]</div>
                  <div className="text-emerald-400 pt-0.5">
                    --- 3 simulated test packets evaluated, 0% packet loss [LOCAL TEST OK] ---
                  </div>
                </div>
              </div>
            )
          }
        ];
        break;

      case 'secrets':
      case 'eastereggs':
        outputLines = [
          {
            id: `out-${Date.now()}`,
            type: 'output',
            text: (
              <div className="space-y-2 my-2 font-mono text-xs text-zinc-300">
                <div className="text-cyan-400 font-semibold uppercase tracking-wider border-b border-cyan-500/30 pb-1">
                  DISCOVERED EASTER EGGS &amp; SYSTEM SHORTCUTS
                </div>
                <div className="space-y-1 text-[11px] pl-2 border-l-2 border-cyan-500/40">
                  <div><span className="text-emerald-400 font-medium">matrix</span> — Visual terminal digital rain stream</div>
                  <div><span className="text-emerald-400 font-medium">voyager</span> — Voyager 1 historical fact &amp; Golden Record quote</div>
                  <div><span className="text-emerald-400 font-medium">sudo</span> — Playful portfolio permission check</div>
                  <div><span className="text-emerald-400 font-medium">konami</span> — Trigger celestial harmonic resonance tone</div>
                  <div><span className="text-emerald-400 font-medium">coffee</span> — Ethiopian Yirgacheffe cultural easter egg</div>
                  <div><span className="text-emerald-400 font-medium">sound</span> — Interactive Web Audio sound vocabulary preview</div>
                  <div><span className="text-emerald-400 font-medium">ping</span> — Portfolio interaction test &amp; simulated telemetry</div>
                  <div><span className="text-emerald-400 font-medium">Core 4x Click</span> — Rapidly click the Orbit Core 4 times for celestial aura</div>
                  <div><span className="text-emerald-400 font-medium">Keyboard Konami</span> — ↑ ↑ ↓ ↓ ← → ← → B A anywhere on desktop</div>
                </div>
                <div className="text-zinc-500 text-[10px] pt-1">
                  Note: All Easter eggs are client-side portfolio interactions. No private credentials or live telemetry involved.
                </div>
              </div>
            )
          }
        ];
        break;

      default: {
        // Did you mean calculation
        let closestCommand: string | null = null;
        let minDistance = Infinity;

        for (const candidate of KNOWN_COMMANDS) {
          const dist = levenshteinDistance(mainCmd, candidate);
          if (dist < minDistance && dist <= 3) {
            minDistance = dist;
            closestCommand = candidate;
          }
        }

        outputLines = [
          {
            id: `err-${Date.now()}`,
            type: 'error',
            text: (
              <div className="space-y-1 font-mono text-xs">
                <div>COMMAND NOT FOUND: "{mainCmd}"</div>
                {closestCommand ? (
                  <div className="text-cyan-300">
                    Did you mean: <span className="font-bold underline">{closestCommand}</span>?
                  </div>
                ) : (
                  <div className="text-zinc-500">Type "help" to view the complete directory of available commands.</div>
                )}
              </div>
            )
          }
        ];
        break;
      }
    }

    const hasError = outputLines.some((l) => l.type === 'error');
    if (hasError) {
      soundFx.playError();
    } else if (
      mainCmd !== 'matrix' &&
      mainCmd !== 'voyager' &&
      mainCmd !== 'deepspace' &&
      mainCmd !== 'konami' &&
      mainCmd !== 'pulse' &&
      mainCmd !== 'reboot' &&
      mainCmd !== 'clear'
    ) {
      soundFx.playSuccess();
    }

    setLines((prev) => [...prev, inputLine, ...outputLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Autocomplete with Tab
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleApplySuggestion(suggestions[0]);
      }
      return;
    }

    // Dismiss suggestions with Escape
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      return;
    }

    // Command History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-[#080c14] text-zinc-200 font-mono text-xs select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Titlebar Status Readout */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-[#060911] text-[10px] text-zinc-500 font-mono-tech select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-zinc-300">ORBIT SHELL // TTY-01</span>
          <span className="text-zinc-600">·</span>
          <span className="text-emerald-400">ACTIVE SESSION</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-500">
          <span>{missions.length} MISSIONS</span>
          <span>·</span>
          <span>TAB AUTOCOMPLETE</span>
        </div>
      </div>

      {/* Terminal Scrollback Output Buffer */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-2">
        {lines.map((line) => {
          if (line.type === 'input') {
            return (
              <div key={line.id} className="text-cyan-400 font-semibold font-mono">
                {line.text}
              </div>
            );
          }
          if (line.type === 'system') {
            return (
              <div key={line.id} className="text-zinc-500 font-light text-[11px]">
                {line.text}
              </div>
            );
          }
          if (line.type === 'error') {
            return (
              <div key={line.id} className="text-rose-400 bg-rose-950/20 p-2 rounded border border-rose-900/30">
                {line.text}
              </div>
            );
          }
          if (line.type === 'success') {
            return (
              <div key={line.id} className="text-emerald-400 bg-emerald-950/20 p-1.5 rounded border border-emerald-900/30">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="text-zinc-300 leading-relaxed">
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Autocomplete Suggestions Bar */}
      {suggestions.length > 0 && (
        <div className="px-3.5 py-1.5 bg-[#060a12] border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto text-[10px] font-mono select-none">
          <span className="text-zinc-500 uppercase shrink-0">SUGGEST:</span>
          {suggestions.map((sug, i) => (
            <button
              key={sug}
              onClick={(e) => {
                e.stopPropagation();
                handleApplySuggestion(sug);
              }}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer shrink-0 ${
                i === 0
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {sug} {i === 0 && <span className="text-[9px] text-zinc-500">[TAB]</span>}
            </button>
          ))}
        </div>
      )}

      {/* Terminal Input Bar */}
      <div className="p-2 sm:p-2.5 bg-[#060911] border-t border-zinc-800 flex items-center gap-2">
        <span className="text-cyan-400 font-bold shrink-0 select-none">
          firaol@orbit-os:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Orbit Terminal Command Input"
          placeholder='Type a command (e.g. "whoami", "projects", "inspect jano", "help")...'
          className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none font-mono text-xs caret-cyan-400"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          aria-label="Execute Command"
          className="p-1 text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer sm:hidden"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
