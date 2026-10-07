import React, { useState } from 'react';
import {
  engineeringPhases,
  EngineeringPhase,
  PhaseArtifact,
  PhaseDecision,
  PhaseLesson
} from '@/data/timeline';
import { soundFx } from '@/lib/utils';
import {
  GitBranch,
  CheckCircle2,
  Copy,
  Check,
  FileCode,
  Workflow,
  Scale,
  Lightbulb,
  Layers,
  ChevronRight
} from 'lucide-react';

export function EngineeringLog() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(engineeringPhases[4].id);
  const [selectedArtifactIndex, setSelectedArtifactIndex] = useState<number>(0);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const activePhase =
    engineeringPhases.find((p) => p.id === selectedPhaseId) || engineeringPhases[4];

  const activeArtifact: PhaseArtifact | undefined =
    activePhase.artifacts[selectedArtifactIndex] || activePhase.artifacts[0];

  const handleSelectPhase = (id: string) => {
    soundFx.playClick();
    setSelectedPhaseId(id);
    setSelectedArtifactIndex(0); // Reset artifact index on phase change
  };

  const handleSelectArtifact = (idx: number) => {
    soundFx.playClick();
    setSelectedArtifactIndex(idx);
  };

  const handleCopyCode = (code: string, id: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        soundFx.playSuccess();
        setCopiedSnippetId(id);
        setTimeout(() => setCopiedSnippetId(null), 2000);
      });
    }
  };

  return (
    <div className="space-y-6 select-text">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>TECHNICAL ENGINEERING RECORD &amp; ARTIFACTS</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">5 PHASES CHRONOLOGY</span>
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
        {engineeringPhases.map((phase) => {
          const isSelected = phase.id === selectedPhaseId;
          return (
            <button
              key={phase.id}
              onClick={() => handleSelectPhase(phase.id)}
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

      {/* Selected Phase Detailed Dossier */}
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

          {/* Applied Technologies Pill Strip */}
          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-zinc-800/70">
            {activePhase.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs font-mono-tech bg-zinc-900 border border-zinc-800 rounded text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 01 // Technical Evidence & Artifacts */}
        {activePhase.artifacts.length > 0 && (
          <div className="p-5 bg-[#0a0e1a]/90 rounded-xl border border-blue-950/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-tech">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-bold uppercase tracking-wider">
                  01 // TECHNICAL ARTIFACTS &amp; EVIDENCE
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{activePhase.artifacts.length} ARTIFACTS</span>
              </div>

              {/* Artifact Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {activePhase.artifacts.map((art, idx) => {
                  const isCurrent = idx === selectedArtifactIndex;
                  return (
                    <button
                      key={art.id}
                      onClick={() => handleSelectArtifact(idx)}
                      className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-950 text-blue-300 border border-blue-700/60 font-semibold'
                          : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      {art.type === 'CODE PATTERN' ? 'CODE SNIPPET' : 'WORKFLOW MAP'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Artifact Display */}
            {activeArtifact && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-mono-tech text-blue-400/90 uppercase block">
                      {activeArtifact.type}
                    </span>
                    <h4 className="text-sm font-display font-bold text-white mt-0.5">
                      {activeArtifact.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 font-light max-w-md">
                    {activeArtifact.description}
                  </p>
                </div>

                {/* Stepper Pipeline if Artifact has diagramSteps */}
                {activeArtifact.diagramSteps && (
                  <div className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 space-y-2">
                    <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider block">
                      Execution Flow Sequence
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {activeArtifact.diagramSteps.map((step, sIdx) => (
                        <div
                          key={step.step}
                          className="p-3 bg-[#060a14] rounded-lg border border-blue-900/30 relative flex flex-col justify-between space-y-1"
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono-tech text-blue-400 font-bold">
                            <span>STEP {step.step}</span>
                            {sIdx < (activeArtifact?.diagramSteps?.length ?? 0) - 1 && (
                              <span className="text-zinc-600 hidden lg:inline">→</span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-zinc-100">
                            {step.label}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-light leading-snug">
                            {step.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Snippet Box if Artifact has codeSnippet */}
                {activeArtifact.codeSnippet && (
                  <div className="rounded-xl border border-zinc-800 bg-[#060a14] overflow-hidden space-y-0">
                    <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-[#04060d] text-[11px] font-mono-tech text-zinc-400">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-zinc-200 font-semibold">
                          {activeArtifact.codeSnippet.filename}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCode(
                            activeArtifact?.codeSnippet?.code || '',
                            activeArtifact?.id || ''
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedSnippetId === activeArtifact.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-zinc-400" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed bg-[#050812]">
                      <code>{activeArtifact.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 02 // Engineering Decision Records */}
        {activePhase.decisions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>02 // Architecture Decision Records (ADR)</span>
            </div>

            <div className="space-y-3">
              {activePhase.decisions.map((dec, idx) => (
                <div
                  key={dec.id}
                  className="p-4 bg-[#0a0f1d]/85 rounded-xl border border-zinc-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-amber-400 font-bold">DECISION RECORD 0{idx + 1}</span>
                    <span className="text-zinc-500 uppercase">{activePhase.phaseNumber}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono-tech text-rose-400 uppercase font-semibold block">
                        Problem / Architectural Bottleneck:
                      </span>
                      <p className="text-zinc-300 font-light mt-0.5 leading-relaxed pl-2 border-l border-rose-900/40">
                        {dec.problem}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono-tech text-blue-400 uppercase font-semibold block">
                        Engineering Decision:
                      </span>
                      <p className="text-zinc-200 font-medium mt-0.5 leading-relaxed pl-2 border-l border-blue-900/40">
                        {dec.decision}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono-tech text-zinc-500 uppercase font-semibold block">
                        Underlying Rationale (Why):
                      </span>
                      <p className="text-zinc-400 font-light mt-0.5 leading-relaxed pl-2 border-l border-zinc-800">
                        {dec.why}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono-tech text-emerald-400 uppercase font-semibold block">
                        System Result:
                      </span>
                      <p className="text-zinc-300 font-light mt-0.5 leading-relaxed pl-2 border-l border-emerald-900/40">
                        {dec.result}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 03 // Engineering Lessons Learned */}
        {activePhase.lessons.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
              <span>03 // Architectural Lessons Learned</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePhase.lessons.map((les, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#070b14] rounded-lg border border-zinc-800 space-y-1.5"
                >
                  <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 font-display">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{les.principle}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {les.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 04 // Key Focus Areas & Implementations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>04 // Key Focus Areas &amp; Implementations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activePhase.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#0a0e1a]/80 border border-zinc-800/70 rounded-lg text-xs text-zinc-300 flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <span className="font-light leading-relaxed">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
