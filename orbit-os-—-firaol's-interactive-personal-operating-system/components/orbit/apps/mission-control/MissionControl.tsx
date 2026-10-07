import React, { useState, useEffect } from 'react';
import { missions, Mission, MissionVisual } from '@/data/missions';
import { useWindowContext } from '@/providers/WindowProvider';
import { soundFx } from '@/lib/utils';
import { ProjectVisualSchematic } from './ProjectVisualSchematic';
import {
  ExternalLink,
  Github,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Cpu,
  ShieldAlert,
  Sparkles,
  Workflow,
  Info,
  ChevronLeft,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Mail
} from 'lucide-react';

type CaseStudyTab =
  | 'all'
  | 'overview'
  | 'problem'
  | 'approach'
  | 'architecture'
  | 'visuals'
  | 'tech'
  | 'state';

export function MissionControl() {
  const { openWindow } = useWindowContext();
  const [selectedMissionId, setSelectedMissionId] = useState<string>(missions[0].id);
  const [activeTab, setActiveTab] = useState<CaseStudyTab>('all');
  const [activeVisualIndex, setActiveVisualIndex] = useState<number>(0);

  useEffect(() => {
    const handleSelectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && missions.some((m) => m.id === customEvent.detail)) {
        setSelectedMissionId(customEvent.detail);
        setActiveVisualIndex(0);
      }
    };
    window.addEventListener('orbit:select-mission', handleSelectEvent);
    return () => window.removeEventListener('orbit:select-mission', handleSelectEvent);
  }, []);

  const activeMission = missions.find((m) => m.id === selectedMissionId) || missions[0];
  const activeVisual =
    activeMission.visuals[activeVisualIndex] || activeMission.visuals[0];

  const handleSelectMission = (id: string) => {
    soundFx.playClick();
    setSelectedMissionId(id);
    setActiveVisualIndex(0); // Reset visual index when switching missions
  };

  const handleTabChange = (tab: CaseStudyTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  const handlePrevVisual = () => {
    soundFx.playClick();
    setActiveVisualIndex((prev) =>
      prev > 0 ? prev - 1 : activeMission.visuals.length - 1
    );
  };

  const handleNextVisual = () => {
    soundFx.playClick();
    setActiveVisualIndex((prev) =>
      prev < activeMission.visuals.length - 1 ? prev + 1 : 0
    );
  };

  const handleSelectVisual = (index: number) => {
    soundFx.playClick();
    setActiveVisualIndex(index);
  };

  return (
    <div className="space-y-6 select-text">
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>TECHNICAL PROJECT DOSSIER</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{missions.length} REGISTERED CASE STUDIES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Mission Control
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
          <span className="text-zinc-500">INSPECTING:</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
            {activeMission.codename}
          </span>
        </div>
      </div>

      {/* Main Split Layout: Project Index + Detailed Dossier */}
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
                  onClick={() => handleSelectMission(mission.id)}
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
                    <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                      {mission.currentState.badge}
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

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-800/60 text-[10px] font-mono-tech text-cyan-400/80">
                    <Eye className="w-3 h-3" />
                    <span>{mission.visuals.length} Visual Schematics</span>
                  </div>

                  {/* Active indicator bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Index Help Box */}
          <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/70 text-[11px] font-mono-tech text-zinc-400 space-y-1">
            <div className="text-zinc-300 font-semibold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>CASE STUDY &amp; GALLERY</span>
            </div>
            <p className="text-zinc-400 font-light leading-relaxed">
              Examines problem definition, system approach, conceptual architecture flow, and interactive visual schematics.
            </p>
          </div>
        </div>

        {/* Right Column: Case Study Dossier (lg: 8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Project Master Dossier Header */}
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

              <div className="flex flex-col items-end gap-1">
                <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/60 text-cyan-300 text-xs font-mono-tech">
                  {activeMission.currentState.stage}
                </span>
                <span className="text-[10px] font-mono-tech text-zinc-400">
                  ROLE: {activeMission.role}
                </span>
              </div>
            </div>

            {/* Dossier Filter Navigation Tabs */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-800/80 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'FULL DOSSIER' },
                { id: 'overview', label: '01 · OVERVIEW' },
                { id: 'problem', label: '02 · PROBLEM' },
                { id: 'approach', label: '03 · APPROACH' },
                { id: 'architecture', label: '04 · ARCHITECTURE' },
                { id: 'visuals', label: `05 · VISUALS (${activeMission.visuals.length})` },
                { id: 'tech', label: '06 · TECH' },
                { id: 'state', label: '07 · STATE' }
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as CaseStudyTab)}
                    className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-medium'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 01 — OVERVIEW */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div className="p-5 bg-[#0a0f1d]/80 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>01 — OVERVIEW</span>
                </span>
                <span className="text-zinc-500 uppercase">{activeMission.name}</span>
              </div>

              <p className="text-sm text-zinc-200 font-light leading-relaxed">
                {activeMission.summary}
              </p>

              <div className="p-3.5 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
                <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Core Purpose &amp; Rationale
                </span>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {activeMission.coreConcept}
                </p>
              </div>
            </div>
          )}

          {/* 02 — PROBLEM */}
          {(activeTab === 'all' || activeTab === 'problem') && (
            <div className="p-5 bg-[#0a0f1d]/80 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-rose-400 flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>02 — THE PROBLEM</span>
                </span>
                <span className="text-zinc-500">CHALLENGE ANALYSIS</span>
              </div>

              <h4 className="text-sm font-display font-bold text-white">
                {activeMission.problem.title}
              </h4>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {activeMission.problem.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {activeMission.problem.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#070b14] border border-zinc-800/80 rounded-lg text-xs text-zinc-300 flex items-start gap-2.5"
                  >
                    <span className="text-rose-400/90 font-mono-tech font-bold shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="font-light leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 03 — APPROACH */}
          {(activeTab === 'all' || activeTab === 'approach') && (
            <div className="p-5 bg-[#0a0f1d]/80 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03 — SYSTEM APPROACH</span>
                </span>
                <span className="text-zinc-500">CONCEPTUAL PILLARS</span>
              </div>

              <h4 className="text-sm font-display font-bold text-white">
                {activeMission.approach.title}
              </h4>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {activeMission.approach.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {activeMission.approach.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#070b14] border border-zinc-800/80 rounded-lg space-y-1"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                      <span className="text-[10px] font-mono-tech text-emerald-400/80">0{idx + 1}.</span>
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 04 — ARCHITECTURE & WORKFLOW */}
          {(activeTab === 'all' || activeTab === 'architecture') && (
            <div className="p-5 bg-[#0a0f1d]/80 rounded-xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <Workflow className="w-3.5 h-3.5" />
                  <span>04 — ARCHITECTURE &amp; DATA FLOW</span>
                </span>
                <span className="text-zinc-500">CONCEPTUAL DIAGRAM</span>
              </div>

              {/* Lightweight Conceptual Architecture Diagram */}
              <div className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/90 space-y-3">
                <span className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider block">
                  Conceptual Workflow Pipeline
                </span>

                {/* Flow Stepper visualization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {activeMission.flowSteps.map((step, idx) => (
                    <div
                      key={step.step}
                      className="p-3 bg-[#0a0e1a] rounded-lg border border-cyan-900/30 relative flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-mono-tech text-cyan-400 font-bold">
                          STEP {step.step}
                        </span>
                        {idx < activeMission.flowSteps.length - 1 && (
                          <span className="text-zinc-600 font-mono-tech text-[10px] hidden md:inline">
                            →
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-zinc-100">
                        {step.label}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-light mt-0.5 leading-snug">
                        {step.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Specifications List */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider block">
                  Core Architectural Specifications
                </span>
                <div className="space-y-2">
                  {activeMission.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#070b14] border border-zinc-800/70 rounded-lg text-xs text-zinc-300"
                    >
                      <span className="font-mono-tech text-cyan-400 font-semibold mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed font-light">{arch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 05 — VISUAL EVIDENCE & ARCHITECTURE GALLERY */}
          {(activeTab === 'all' || activeTab === 'visuals') && (
            <div className="p-5 bg-[#0a0f1d]/90 rounded-xl border border-cyan-900/40 space-y-4">
              {/* Gallery Header Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono-tech">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">
                    05 — VISUAL EVIDENCE &amp; SYSTEM MAPS
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">
                    {activeMission.visuals.length} SCHEMATICS
                  </span>
                </div>

                {/* Prev / Next Controls */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={handlePrevVisual}
                    aria-label="Previous visual schematic"
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono-tech px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-cyan-400 font-bold">
                    0{activeVisualIndex + 1} / 0{activeMission.visuals.length}
                  </span>

                  <button
                    onClick={handleNextVisual}
                    aria-label="Next visual schematic"
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mini Visual Index Selector Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                {activeMission.visuals.map((vis, idx) => {
                  const isCurrent = idx === activeVisualIndex;
                  return (
                    <button
                      key={vis.id}
                      onClick={() => handleSelectVisual(idx)}
                      className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono-tech ${
                        isCurrent
                          ? 'bg-cyan-950/80 border-cyan-500/70 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'bg-[#060a14] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="text-[9px] text-zinc-500 uppercase">
                        {vis.category}
                      </div>
                      <div className="font-semibold text-zinc-200 truncate max-w-[180px]">
                        {vis.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Visual Detail Card */}
              {activeVisual && (
                <div className="p-4 sm:p-5 bg-[#060a14] rounded-xl border border-zinc-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                    <div>
                      <span className="text-[10px] font-mono-tech text-zinc-500 uppercase block">
                        {activeVisual.category}
                      </span>
                      <h4 className="text-base font-display font-bold text-white mt-0.5">
                        {activeVisual.title}
                      </h4>
                    </div>

                    <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 text-[10px] font-mono-tech self-start sm:self-center font-bold tracking-wider">
                      {activeVisual.type}
                    </span>
                  </div>

                  {/* Technical Schematic Viewport */}
                  <ProjectVisualSchematic diagramKey={activeVisual.diagramKey} />

                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {activeVisual.description}
                  </p>

                  {/* Specific Architectural Insights */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800/70">
                    <span className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider block">
                      Architectural Evidence &amp; Invariants:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeVisual.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-2.5 bg-[#090d18] rounded-lg border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="font-light leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 06 — TECHNOLOGY & CAPABILITIES */}
          {(activeTab === 'all' || activeTab === 'tech') && (
            <div className="p-5 bg-[#0a0f1d]/80 rounded-xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>06 — TECHNOLOGIES &amp; TOOLING</span>
                </span>
                <span className="text-zinc-500">APPLIED STACK</span>
              </div>

              {/* Tech Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeMission.techCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#070b14] border border-zinc-800/80 rounded-lg space-y-1.5"
                  >
                    <span className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider block">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 text-xs font-mono-tech bg-zinc-900 border border-zinc-800 rounded text-zinc-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Capabilities */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <span className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider block">
                  Key System Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeMission.keyCapabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#070b14] border border-zinc-800/70 rounded-lg text-xs text-zinc-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-light leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 07 — CURRENT STATE & STAGE CLARITY */}
          {(activeTab === 'all' || activeTab === 'state') && (
            <div className="p-5 bg-[#0a0f1d]/80 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>07 — CURRENT PROJECT STATE</span>
                </span>
                <span className="text-zinc-500">STAGE DISCLOSURE</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-amber-950/40 border border-amber-800/50 text-amber-300 font-mono-tech text-xs font-bold">
                  {activeMission.currentState.stage}
                </span>
              </div>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {activeMission.currentState.details}
              </p>

              {/* Explicit non-commercial / build-stage disclosure */}
              <div className="p-3 bg-zinc-950/70 border border-zinc-800 rounded-lg flex items-start gap-2.5">
                <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 font-mono-tech leading-relaxed">
                  {activeMission.currentState.note}
                </p>
              </div>
            </div>
          )}

          {/* VERIFIED ACTIONS & REPOSITORY LINK */}
          <div className="p-4 bg-[#0a0e1a]/90 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-mono-tech text-zinc-400">
              <span className="text-zinc-500">STATUS:</span> {activeMission.currentState.stage}
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  openWindow('profile');
                }}
                className="inline-flex items-center gap-2 px-3 py-2 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg text-xs font-mono-tech text-cyan-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inquire / Discuss Architecture</span>
              </button>

              {activeMission.githubUrl && (
                <a
                  href={activeMission.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-mono-tech text-zinc-200 hover:text-cyan-300 transition-colors whitespace-nowrap cursor-pointer"
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
    </div>
  );
}
