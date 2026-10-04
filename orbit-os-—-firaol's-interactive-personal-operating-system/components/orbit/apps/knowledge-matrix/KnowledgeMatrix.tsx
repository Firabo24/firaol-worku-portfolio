import React, { useState } from 'react';
import { skillDomains } from '@/data/skills';
import { soundFx } from '@/lib/utils';
import { Cpu, BrainCircuit, HeartPulse, Palette, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

export function KnowledgeMatrix() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(skillDomains[0].id);

  const activeDomain =
    skillDomains.find((d) => d.id === selectedDomainId) || skillDomains[0];

  const handleSelect = (id: string) => {
    soundFx.playClick();
    setSelectedDomainId(id);
  };

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'software-engineering':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'artificial-intelligence':
        return <BrainCircuit className="w-4 h-4 text-emerald-400" />;
      case 'health-technology':
        return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'product-uiux':
        return <Palette className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>TECHNICAL KNOWLEDGE REPOSITORY</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">4 CORE COMPETENCY DOMAINS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Knowledge Matrix
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
          <span className="text-zinc-500">ACTIVE DOMAIN:</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
            {activeDomain.name}
          </span>
        </div>
      </div>

      {/* Domain Selection Tabs Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {skillDomains.map((domain) => {
          const isSelected = domain.id === selectedDomainId;
          return (
            <button
              key={domain.id}
              onClick={() => handleSelect(domain.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-[#0c1524] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                  : 'bg-[#0a0f1d]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#0f172a]/80'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {getDomainIcon(domain.id)}
                <span className="text-[10px] font-mono-tech text-zinc-500">
                  {domain.codename}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-display font-bold text-zinc-100 truncate">
                {domain.name}
              </h3>
              <div className="text-[10px] font-mono-tech text-zinc-400 mt-1">
                {domain.technologies.length} Technologies
              </div>
              {isSelected && (
                <div className="absolute inset-x-3 bottom-0 h-0.5 bg-emerald-400 rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Hierarchical Presentation: DOMAIN -> CAPABILITIES -> TECHNOLOGIES -> PRACTICES */}
      <div className="space-y-6">
        {/* Domain Overview */}
        <div className="p-5 bg-[#0a111a]/80 rounded-xl border border-zinc-800/90 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-tech">
            <span className="text-emerald-400 font-medium">DOMAIN BRIEF</span>
            <span className="text-zinc-500">{activeDomain.codename}</span>
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            {activeDomain.name}
          </h3>
          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {activeDomain.summary}
          </p>
        </div>

        {/* Section 1: CAPABILITIES */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>01. Core Capabilities &amp; Architecture Focus</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {activeDomain.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-xl space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-tech text-emerald-400/90 font-semibold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-zinc-100">
                    {cap.title}
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: TECHNOLOGIES */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>02. Technologies &amp; Tooling</span>
          </div>
          <div className="p-4 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-xl">
            <div className="flex flex-wrap gap-2">
              {activeDomain.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono-tech text-zinc-200"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: PRACTICES */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>03. Engineering Principles &amp; Practices</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeDomain.practices.map((practice, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#0a0e1a]/80 border border-zinc-800/70 rounded-lg text-xs text-zinc-300 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                <span className="font-light leading-relaxed">{practice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
