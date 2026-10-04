import React, { useState } from 'react';
import { missions } from '@/data/missions';
import { soundFx } from '@/lib/utils';
import { ExternalLink, Github, Layers, CheckCircle2, ChevronRight, Activity, Terminal } from 'lucide-react';

export function MissionControl() {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(missions[0].id);

  const activeMission = missions.find((m) => m.id === selectedMissionId) || missions[0];

  const handleSelect = (id: string) => {
    soundFx.playClick();
    setSelectedMissionId(id);
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>OPERATIONAL SYSTEMS DIRECTORY</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{missions.length} REGISTERED MISSIONS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Mission Control
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
          <span className="text-zinc-500">DISPATCH:</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
            {activeMission.codename}
          </span>
        </div>
      </div>

      {/* Main Mission Planner Layout: Split Index & Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Project Index Rail (lg: 4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono-tech text-zinc-500 uppercase tracking-wider">
            <span>Project Index</span>
            <span>Select to inspect</span>
          </div>

          <div className="space-y-2">
            {missions.map((mission) => {
              const isSelected = mission.id === selectedMissionId;
              return (
                <button
                  key={mission.id}
                  onClick={() => handleSelect(mission.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-[#0e172a] border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                      : 'bg-[#0a0f1d]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#0f172a]/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono-tech text-cyan-400/90 font-medium">
                      {mission.codename}
                    </span>
                    <span className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                      {mission.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-display font-bold text-zinc-100 mt-1 group-hover:text-cyan-200 transition-colors">
                    {mission.name}
                  </h3>

                  <div className="text-[11px] font-mono-tech text-zinc-400 mt-0.5">
                    {mission.category}
                  </div>

                  <p className="text-xs text-zinc-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {mission.summary}
                  </p>

                  {/* Active selection accent line */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Mission Planning Module (lg: 8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Mission Overview Panel */}
          <div className="p-5 bg-[#0b101d]/85 rounded-xl border border-zinc-800/90 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
                  <span>{activeMission.codename}</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400">{activeMission.category}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  {activeMission.name}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono-tech text-zinc-500 uppercase block">Role</span>
                <span className="text-xs font-mono-tech text-zinc-300 font-medium">
                  {activeMission.role}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {activeMission.summary}
            </p>

            {/* Core Operational Concept Box */}
            <div className="p-3.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400/90 tracking-wider uppercase block">
                Operational Problem &amp; Core Concept
              </span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {activeMission.coreConcept}
              </p>
            </div>
          </div>

          {/* Technical Architecture Specifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Architectural Specifications</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {activeMission.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-[#0a0e1a]/80 border border-zinc-800/70 rounded-lg text-xs text-zinc-300"
                >
                  <span className="font-mono-tech text-cyan-400 font-semibold mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed font-light">{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Key System Capabilities</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeMission.keyCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0a0e1a]/80 border border-zinc-800/70 rounded-lg text-xs text-zinc-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span className="leading-relaxed font-light">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Applied & Action Link */}
          <div className="p-4 bg-[#0a0e1a]/90 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider block">
                Applied Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeMission.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 border border-zinc-800 rounded text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {activeMission.githubUrl && (
              <a
                href={activeMission.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-mono-tech text-zinc-200 hover:text-cyan-300 transition-colors whitespace-nowrap self-start sm:self-center cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-zinc-400" />
                <span>Source Repository</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
