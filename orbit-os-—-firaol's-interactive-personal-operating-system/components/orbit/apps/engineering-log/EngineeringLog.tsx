import React, { useState } from 'react';
import { engineeringPhases, EngineeringPhase } from '@/data/timeline';
import { soundFx } from '@/lib/utils';
import { GitBranch, CheckCircle2, ChevronRight, Binary, Code2, Layers } from 'lucide-react';

export function EngineeringLog() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(engineeringPhases[4].id);

  const activePhase =
    engineeringPhases.find((p) => p.id === selectedPhaseId) || engineeringPhases[4];

  const handleSelect = (id: string) => {
    soundFx.playClick();
    setSelectedPhaseId(id);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>SYSTEMS EVOLUTION CHRONOLOGY</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">5 ENGINEERING PHASES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Engineering Log
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
          <GitBranch className="w-3.5 h-3.5 text-blue-400" />
          <span>EPOCH: {activePhase.phaseNumber}</span>
        </div>
      </div>

      {/* Interactive Phase Progression Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {engineeringPhases.map((phase, idx) => {
          const isSelected = phase.id === selectedPhaseId;
          return (
            <button
              key={phase.id}
              onClick={() => handleSelect(phase.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-[#0e1629] border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                  : 'bg-[#0a0f1d]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#0f172a]/80'
              }`}
            >
              <div className="text-[10px] font-mono-tech text-blue-400/90 font-medium">
                {phase.phaseNumber}
              </div>
              <h3 className="text-xs sm:text-sm font-display font-bold text-zinc-100 truncate mt-0.5">
                {phase.name}
              </h3>
              {isSelected && (
                <div className="absolute inset-x-3 bottom-0 h-0.5 bg-blue-400 rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Phase Detailed View */}
      <div className="space-y-6">
        {/* Phase Header Card */}
        <div className="p-5 bg-[#0a1120]/85 rounded-xl border border-zinc-800/90 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-tech">
            <span className="text-blue-400 font-medium">{activePhase.phaseNumber}</span>
            <span className="text-zinc-500 uppercase">{activePhase.name}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            {activePhase.tagline}
          </h3>

          <p className="text-sm text-zinc-300 font-light leading-relaxed pt-1">
            {activePhase.description}
          </p>
        </div>

        {/* Focus Areas & Milestones */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Key Focus Areas &amp; Implementations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activePhase.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#0a0e1a]/80 border border-zinc-800/70 rounded-lg text-xs text-zinc-300 flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <span className="font-light leading-relaxed">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Applied in Phase */}
        <div className="p-4 bg-[#0a0e1a]/90 rounded-xl border border-zinc-800 space-y-2">
          <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider block">
            Core Technologies &amp; Concepts
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activePhase.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 border border-zinc-800 rounded text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
