import React from 'react';
import { profileData } from '@/data/profile';
import { missions } from '@/data/missions';
import { skillDomains } from '@/data/skills';
import { achievementRecords } from '@/data/achievements';
import { engineeringPhases } from '@/data/timeline';
import { useWindowContext } from '@/providers/WindowProvider';
import { soundFx } from '@/lib/utils';
import {
  Printer,
  Download,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  CheckCircle2,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';

export function SystemCV() {
  const { openWindow } = useWindowContext();

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleOpenProfile = () => {
    soundFx.playClick();
    openWindow('profile');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto cv-document select-text">
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#0b101d] rounded-xl border border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>CURRICULUM VITAE // VERIFIED DOCUMENT</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">PRINT-OPTIMIZED</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenProfile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono-tech text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-zinc-400" />
            <span>System Profile</span>
          </button>

          <button
            onClick={handlePrint}
            aria-label="Print or Save CV as PDF"
            title="Open browser print dialog (Save as PDF)"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/60 text-xs font-mono-tech text-cyan-300 font-medium transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main CV Sheet Container */}
      <div className="p-6 sm:p-8 bg-[#090d18] rounded-xl border border-zinc-800 space-y-6 shadow-xl">
        {/* Document Header */}
        <header className="border-b border-zinc-800 pb-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {profileData.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono-tech text-cyan-300 mt-1 font-medium">
                {profileData.title}
              </p>
              <p className="text-xs font-mono-tech text-zinc-400 tracking-wider mt-0.5">
                {profileData.tagline}
              </p>
            </div>

            {/* Quick Contact Box */}
            <div className="text-xs font-mono-tech text-zinc-300 space-y-1 sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profileData.origin}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[11px] text-zinc-500">UTC+3</span>
              </div>
              <div>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="text-cyan-400 hover:underline inline-flex items-center sm:justify-end gap-1"
                >
                  <Mail className="w-3 h-3 text-zinc-500 no-print" />
                  <span>{profileData.contact.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline inline-flex items-center sm:justify-end gap-1"
                >
                  <Github className="w-3 h-3 text-zinc-500 no-print" />
                  <span>github.com/{profileData.contact.githubHandle}</span>
                </a>
              </div>
              <div className="pt-0.5 no-print">
                <button
                  type="button"
                  onClick={handleOpenProfile}
                  className="text-[11px] font-mono-tech text-cyan-400/90 hover:text-cyan-200 transition-colors inline-flex items-center sm:justify-end gap-1 cursor-pointer"
                >
                  <span>Interactive Contact Layer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 01 // Professional Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
            Self-directed software engineer and systems builder focused on AI-enabled clinical systems,
            offline-first architectures, and full-stack web platforms. Experienced in architecting
            resilient distributed systems from relational data modeling to tactile client interfaces.
            Recognized for healthcare software innovation addressing clinical workflow bottlenecks
            in infrastructure-constrained environments.
          </p>
        </section>

        {/* 02 // Core Competency Domains */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Core Areas of Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {profileData.domains.map((dom) => (
              <div
                key={dom.name}
                className="p-3 bg-[#060a14] rounded-lg border border-zinc-800/80 space-y-1"
              >
                <div className="text-xs font-semibold text-zinc-100 font-display">
                  {dom.name}
                </div>
                <div className="text-[11px] text-zinc-400 font-light leading-snug">
                  {dom.focus}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 // Selected Projects & Architectures */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Selected Systems &amp; Projects
          </h2>

          <div className="space-y-4">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className="p-3.5 bg-[#060a14] rounded-lg border border-zinc-800/80 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold font-display text-white">
                      {mission.name}
                    </h3>
                    <div className="text-[11px] font-mono-tech text-cyan-300">
                      {mission.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono-tech">
                    <span className="text-zinc-400">{mission.role}</span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 cv-badge">
                      {mission.currentState.stage}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {mission.summary}
                </p>

                {/* Architecture Highlights */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono-tech text-zinc-400 uppercase">
                    Architectural Specifications:
                  </div>
                  <ul className="text-xs text-zinc-400 font-light space-y-1 list-disc list-inside">
                    {mission.architecture.slice(0, 3).map((arch, i) => (
                      <li key={i}>{arch}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono-tech text-zinc-500 uppercase mr-1">
                    Tech Stack:
                  </span>
                  {mission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono-tech text-zinc-300 cv-badge"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 // Technical Skills Inventory */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Technical Skills by Domain
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {skillDomains.map((dom) => (
              <div
                key={dom.id}
                className="p-3 bg-[#060a14] rounded-lg border border-zinc-800/80 space-y-1.5"
              >
                <div className="text-xs font-semibold text-zinc-200 font-display">
                  {dom.name}
                </div>
                <div className="flex flex-wrap gap-1">
                  {dom.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono-tech text-zinc-300 cv-badge"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 // Engineering Progression */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Engineering Progression &amp; Milestones
          </h2>

          <div className="space-y-2 pt-1">
            {engineeringPhases.map((phase) => (
              <div
                key={phase.id}
                className="p-2.5 bg-[#060a14] rounded-lg border border-zinc-800/70 text-xs text-zinc-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-cyan-400 font-semibold text-[11px]">
                      {phase.phaseNumber}
                    </span>
                    <span className="font-bold text-zinc-100 font-display">
                      {phase.name}
                    </span>
                    <span className="text-zinc-500 text-[11px]">— {phase.tagline}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 // Recognized Honors & Archival Achievements */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Honors &amp; Recognized Milestones
          </h2>

          <div className="space-y-2 pt-1">
            {achievementRecords.map((ach) => (
              <div
                key={ach.recordNumber}
                className="p-3 bg-[#060a14] rounded-lg border border-zinc-800/80 space-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-zinc-100 font-display">
                    {ach.title}
                  </div>
                  <div className="text-[10px] font-mono-tech text-amber-400 font-medium">
                    {ach.recognition} ({ach.year})
                  </div>
                </div>
                <div className="text-[11px] font-mono-tech text-zinc-400">
                  {ach.organization}
                </div>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  {ach.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 // Current Focus Thrusts */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono-tech font-bold text-cyan-400 uppercase tracking-widest border-b border-zinc-800/80 pb-1">
            Current Technical Direction
          </h2>
          <div className="space-y-1.5 pt-1">
            {profileData.currentFocus.map((foc, i) => (
              <div
                key={i}
                className="p-2.5 bg-[#060a14] rounded-lg border border-zinc-800/70 text-xs text-zinc-300 flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-light leading-snug">{foc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Document Footer */}
        <footer className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono-tech text-zinc-500">
          <div>
            DOCUMENT REF: CV-FIRAOL-WORKU // ORBIT OS VERIFIED
          </div>
          <div>
            LOCATION: ETHIOPIA · CONTACT: TIOBOSS34@GMAIL.COM
          </div>
        </footer>
      </div>
    </div>
  );
}
