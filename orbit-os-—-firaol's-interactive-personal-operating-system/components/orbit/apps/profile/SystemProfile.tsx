import React, { useState } from 'react';
import { profileData, ContactTemplate } from '@/data/profile';
import { useWindowContext, WindowId } from '@/providers/WindowProvider';
import { soundFx } from '@/lib/utils';
import {
  Compass,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Github,
  Mail,
  Shield,
  GitBranch,
  Terminal,
  MapPin,
  Sparkles,
  CheckCircle2,
  Code2,
  FileText,
  Copy,
  Check,
  Send,
  Clock,
  Globe,
  Radio,
  MessageSquare,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export function SystemProfile() {
  const { openWindow } = useWindowContext();

  const [copiedType, setCopiedType] = useState<'email' | 'github' | 'template' | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(profileData.contact.templates[0].id);

  const activeTemplate =
    profileData.contact.templates.find((t) => t.id === selectedTemplateId) ||
    profileData.contact.templates[0];

  const handleNavigate = (id: WindowId) => {
    soundFx.playClick();
    openWindow(id);
  };

  const copyToClipboard = (text: string, type: 'email' | 'github' | 'template') => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        soundFx.playSuccess();
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2200);
      });
    }
  };

  const getMailtoLink = (template: ContactTemplate) => {
    const subject = encodeURIComponent(template.subject);
    const body = encodeURIComponent(template.body);
    return `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 select-text">
      {/* Top Identity Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SYSTEM IDENTITY // ORBIT CORE</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400/80" />
              {profileData.origin}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            {profileData.name}
          </h2>

          <p className="text-xs sm:text-sm font-mono-tech text-cyan-300/90 tracking-wide mt-1">
            {profileData.tagline}
          </p>
        </div>

        {/* Status Callout & CV Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start">
          <button
            onClick={() => handleNavigate('cv')}
            aria-label="Open Curriculum Vitae / Resume"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/60 text-xs font-mono-tech text-cyan-300 font-medium transition-colors cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>VIEW CV / RESUME</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono-tech text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>BUILDER &amp; PRACTITIONER</span>
          </div>
        </div>
      </div>

      {/* Primary Narrative & Biography */}
      <div className="p-5 bg-[#0a0f1d]/85 rounded-xl border border-zinc-800/90 space-y-3">
        <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider block">
          01 // Identity Statement
        </span>
        <p className="text-sm text-zinc-200 font-light leading-relaxed">
          {profileData.identityBio}
        </p>
      </div>

      {/* Major Systems Being Built */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-tech text-cyan-400 flex items-center gap-1.5 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>02 // ACTIVE SYSTEMS &amp; ARCHITECTURES</span>
          </span>
          <button
            onClick={() => handleNavigate('mission-control')}
            className="text-[11px] font-mono-tech text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Inspect All in Missions</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {profileData.activeSystems.map((sys) => (
            <div
              key={sys.id}
              className="p-4 bg-[#0a0e1a]/85 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 mb-1">
                  <span>{sys.status}</span>
                  <span className="text-cyan-400/80">{sys.role}</span>
                </div>
                <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {sys.name}
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                  {sys.summary}
                </p>
              </div>

              <button
                onClick={() => handleNavigate('mission-control')}
                className="mt-3.5 pt-2.5 border-t border-zinc-800/80 text-[11px] font-mono-tech text-cyan-400 hover:text-cyan-200 transition-colors flex items-center justify-between w-full cursor-pointer"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Mindset & Approach */}
      <div className="p-5 bg-[#0a0f1d]/85 rounded-xl border border-zinc-800/90 space-y-3.5">
        <div className="flex items-center justify-between text-xs font-mono-tech">
          <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>03 // ENGINEERING MINDSET</span>
          </span>
          <span className="text-zinc-500 uppercase">FIRST-PRINCIPLES</span>
        </div>

        <h4 className="text-sm font-display font-bold text-white">
          {profileData.mindset.heading}
        </h4>

        <p className="text-xs text-zinc-300 font-light leading-relaxed">
          {profileData.mindset.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {profileData.mindset.principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#070b14] border border-zinc-800/80 rounded-lg text-xs text-zinc-300 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="font-light leading-relaxed">{pr}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Matrix Domains */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-tech text-cyan-400 flex items-center gap-1.5 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>04 // TECHNICAL EXPERTISE DOMAINS</span>
          </span>
          <button
            onClick={() => handleNavigate('knowledge-matrix')}
            className="text-[11px] font-mono-tech text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Full Matrix</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profileData.domains.map((dom) => (
            <div
              key={dom.name}
              className="p-4 bg-[#0a0e1a]/80 rounded-xl border border-zinc-800 space-y-2"
            >
              <h4 className="text-sm font-display font-bold text-zinc-100">
                {dom.name}
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {dom.focus}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dom.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-mono-tech bg-zinc-900 border border-zinc-800 rounded text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Exploration Focus */}
      <div className="p-4 bg-[#090d18] rounded-xl border border-zinc-800/90 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono-tech">
          <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
            <GitBranch className="w-3.5 h-3.5" />
            <span>05 // CURRENT EXPLORATION FOCUS</span>
          </span>
          <button
            onClick={() => handleNavigate('engineering-log')}
            className="text-[11px] font-mono-tech text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View Phases</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {profileData.currentFocus.map((focus, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-[#050811] rounded-lg border border-zinc-800/60 text-xs text-zinc-300 flex items-start gap-2.5"
            >
              <span className="text-cyan-400 font-mono-tech font-semibold mt-0.5">
                0{idx + 1}.
              </span>
              <span className="font-light leading-relaxed">{focus}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 06 // VERIFIED CONTACT & DIRECT COMMUNICATION SYSTEM */}
      <div id="contact-layer" className="p-5 bg-[#090e1c] rounded-xl border border-cyan-500/30 shadow-xl space-y-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/90">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400 font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>06 // VERIFIED CONTACT &amp; COMMUNICATION CHANNELS</span>
            </div>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Direct, asynchronous engineering channels with transparent availability and dispatch templates.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-[11px] font-mono-tech px-2.5 py-1 rounded bg-cyan-950/50 border border-cyan-800/50 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CHANNEL STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Primary Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Channel 1: Verified Direct Email */}
          <div className="p-4 bg-[#050812] rounded-xl border border-zinc-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold uppercase tracking-wider">PRIMARY DIRECT EMAIL</span>
              </div>
              <span className="text-[10px] font-mono-tech text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50">
                VERIFIED
              </span>
            </div>

            <div>
              <div className="text-sm font-mono-tech font-bold text-white tracking-wide break-all">
                {profileData.contact.email}
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1">
                Primary point of contact for engineering, technical discussions, and collaborations.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/60 text-xs font-mono-tech text-cyan-200 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open Mail Client</span>
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(profileData.contact.email, 'email')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono-tech text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Channel 2: GitHub Engineering Profile */}
          <div className="p-4 bg-[#050812] rounded-xl border border-zinc-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-300">
                <Github className="w-4 h-4 text-zinc-300" />
                <span className="font-semibold uppercase tracking-wider">SOURCE &amp; CODE REPOSITORIES</span>
              </div>
              <span className="text-[10px] font-mono-tech text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/50">
                ACTIVE REPOS
              </span>
            </div>

            <div>
              <div className="text-sm font-mono-tech font-bold text-white tracking-wide">
                github.com/{profileData.contact.githubHandle}
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1">
                Public code, open-source architectures, system prototypes, and commits.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono-tech text-zinc-200 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                <span>Visit GitHub Profile</span>
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(profileData.contact.github, 'github')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono-tech text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedType === 'github' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Operating Hours, Timezone & Response Telemetry */}
        <div className="p-4 bg-[#050811] rounded-xl border border-zinc-800/70 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono-tech">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-400" />
              LOCATION &amp; BASE
            </span>
            <div className="text-zinc-200 font-medium">{profileData.origin}</div>
            <div className="text-[11px] text-zinc-400 font-light">Global remote collaborator</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              TIMEZONE (BASE)
            </span>
            <div className="text-zinc-200 font-medium">{profileData.contact.timezone}</div>
            <div className="text-[11px] text-zinc-400 font-light">East Africa Timezone</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-cyan-400" />
              EXPECTED LATENCY
            </span>
            <div className="text-zinc-200 font-medium">24–48 Hours</div>
            <div className="text-[11px] text-zinc-400 font-light">Direct engineering response</div>
          </div>
        </div>

        {/* Realistic Availability & Collaboration Focus */}
        <div className="p-4 bg-[#050811] rounded-xl border border-zinc-800/70 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono-tech">
            <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>AREAS OF INQUIRY &amp; COLLABORATION</span>
            </span>
            <span className="text-[10px] text-zinc-500 uppercase">AUTHENTIC SCOPE</span>
          </div>

          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            {profileData.contact.availability}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {profileData.contact.collaborationScope.map((scope, idx) => (
              <div
                key={idx}
                className="p-2 bg-[#080d1a] border border-zinc-800/80 rounded-lg text-xs text-zinc-300 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-mono-tech text-zinc-300">{scope}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Message Dispatch Helper / Communication Starters */}
        <div className="p-4 bg-[#050811] rounded-xl border border-zinc-800/70 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono-tech text-cyan-400 font-semibold flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>PRE-FORMATTED MESSAGE STARTERS</span>
              </span>
              <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                Generate an instant draft to launch directly into your native email client.
              </p>
            </div>

            {/* Template Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {profileData.contact.templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedTemplateId(tpl.id);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-lg transition-colors cursor-pointer ${
                    selectedTemplateId === tpl.id
                      ? 'bg-cyan-950/80 border border-cyan-600/70 text-cyan-200 font-medium'
                      : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Template Preview & Actions */}
          <div className="p-3 bg-[#080c17] rounded-lg border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono-tech text-zinc-400 border-b border-zinc-800/60 pb-2">
              <div>
                <span className="text-zinc-500">SUBJECT: </span>
                <span className="text-zinc-200 font-medium">{activeTemplate.subject}</span>
              </div>
              <span className="text-zinc-500 hidden sm:inline">DRAFT PREVIEW</span>
            </div>

            <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed py-1">
              {activeTemplate.body}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
              <span className="text-[10px] font-mono-tech text-zinc-500">
                Launches your native mail client with populated subject and body
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `Subject: ${activeTemplate.subject}\n\n${activeTemplate.body}`,
                      'template'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono-tech rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 cursor-pointer transition-colors"
                >
                  {copiedType === 'template' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied Template!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>

                <a
                  href={getMailtoLink(activeTemplate)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono-tech rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-200 cursor-pointer transition-colors font-medium"
                >
                  <Send className="w-3 h-3 text-cyan-400" />
                  <span>Launch Email Draft</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Quick Launch Bar */}
      <div className="p-4 bg-[#070b14] rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Quick Launch Buttons */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider block">
            System Window Shortcuts
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleNavigate('mission-control')}
              className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-200 transition-colors cursor-pointer"
            >
              Missions [1]
            </button>
            <button
              onClick={() => handleNavigate('knowledge-matrix')}
              className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-200 transition-colors cursor-pointer"
            >
              Knowledge [2]
            </button>
            <button
              onClick={() => handleNavigate('achievement-vault')}
              className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-200 transition-colors cursor-pointer"
            >
              Vault [3]
            </button>
            <button
              onClick={() => handleNavigate('engineering-log')}
              className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-200 transition-colors cursor-pointer"
            >
              Log [4]
            </button>
            <button
              onClick={() => handleNavigate('terminal')}
              className="px-2.5 py-1 text-xs font-mono-tech bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-200 transition-colors cursor-pointer"
            >
              Terminal [5]
            </button>
            <button
              onClick={() => handleNavigate('cv')}
              className="px-2.5 py-1 text-xs font-mono-tech bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 rounded text-cyan-300 transition-colors cursor-pointer font-medium"
            >
              CV / Resume
            </button>
          </div>
        </div>

        {/* Verified Channels quick links */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          <a
            href={`mailto:${profileData.contact.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono-tech text-zinc-200 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Email</span>
          </a>

          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono-tech text-zinc-200 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5 text-zinc-400" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </div>
  );
}
