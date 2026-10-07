import React, { useState } from 'react';
import { achievementRecords, AchievementRecord } from '@/data/achievements';
import { useWindowContext } from '@/providers/WindowProvider';
import { soundFx } from '@/lib/utils';
import {
  Award,
  CheckCircle2,
  Archive,
  Calendar,
  Bookmark,
  Building2,
  Copy,
  Check,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Target,
  FileText
} from 'lucide-react';

type RecordCategoryFilter = 'ALL' | 'COMPETITION' | 'INNOVATION' | 'SYSTEMS';
type DossierViewTab = 'overview' | 'evaluation' | 'artifacts';

export function AchievementVault() {
  const { openWindow } = useWindowContext();
  const [selectedRecordNumber, setSelectedRecordNumber] = useState<string>(achievementRecords[0].recordNumber);
  const [categoryFilter, setCategoryFilter] = useState<RecordCategoryFilter>('ALL');
  const [activeTab, setActiveTab] = useState<DossierViewTab>('overview');
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  const filteredRecords = achievementRecords.filter((rec) => {
    if (categoryFilter === 'ALL') return true;
    return rec.category === categoryFilter;
  });

  const activeRecord: AchievementRecord =
    achievementRecords.find((r) => r.recordNumber === selectedRecordNumber) || achievementRecords[0];

  const handleSelect = (recNum: string) => {
    soundFx.playClick();
    setSelectedRecordNumber(recNum);
    setCopiedCitation(false);
  };

  const handleFilterChange = (filter: RecordCategoryFilter) => {
    soundFx.playClick();
    setCategoryFilter(filter);
    const matching = achievementRecords.filter((r) => filter === 'ALL' || r.category === filter);
    if (matching.length > 0 && !matching.some((m) => m.recordNumber === selectedRecordNumber)) {
      setSelectedRecordNumber(matching[0].recordNumber);
    }
  };

  const handleTabChange = (tab: DossierViewTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  const handleCopyCitation = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(activeRecord.citation);
        soundFx.playSuccess();
        setCopiedCitation(true);
        setTimeout(() => setCopiedCitation(false), 2500);
      }
    } catch {
      // Fallback
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2500);
    }
  };

  const handleOpenAssociatedWindow = () => {
    if (activeRecord.associatedWindow) {
      soundFx.playClick();
      openWindow(activeRecord.associatedWindow);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>ARCHIVAL RECOGNITION REGISTRY</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{achievementRecords.length} VERIFIED ENTRIES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Achievement Vault
          </h2>
          <p className="text-xs font-mono-tech text-zinc-400 mt-0.5">
            Documented competition awards, technical recognitions, and systems initiative provenance
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
          <Archive className="w-3.5 h-3.5 text-amber-400/80" />
          <span>VAULT ARCHIVE // SUBSTANTIATED EVIDENCE</span>
        </div>
      </div>

      {/* Main Archival Vault Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Records Index & Category Filters (lg: 4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono-tech text-zinc-500 uppercase tracking-wider">
            <span>Archival Directory</span>
            <span>{filteredRecords.length} Displayed</span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#090d18] rounded-lg border border-zinc-800/80 text-[10px] font-mono-tech">
            {(['ALL', 'COMPETITION', 'INNOVATION', 'SYSTEMS'] as RecordCategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Record Selector Cards */}
          <div className="space-y-2">
            {filteredRecords.map((record) => {
              const isSelected = record.recordNumber === selectedRecordNumber;
              return (
                <button
                  key={record.recordNumber}
                  onClick={() => handleSelect(record.recordNumber)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-[#181308] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                      : 'bg-[#0a0f1d]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#0f172a]/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono-tech text-amber-400 font-semibold tracking-wider">
                      {record.recordNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech uppercase bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {record.category}
                      </span>
                      <span className="text-[10px] font-mono-tech text-zinc-500">
                        {record.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-display font-bold text-zinc-100 mt-1.5 group-hover:text-amber-200 transition-colors">
                    {record.title}
                  </h3>

                  <div className="text-[11px] font-mono-tech text-amber-400/90 mt-0.5 font-medium truncate">
                    {record.recognition}
                  </div>

                  <div className="text-[10px] font-mono-tech text-zinc-500 mt-1 truncate">
                    {record.organization}
                  </div>

                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Archival Authenticity Guarantee Notice */}
          <div className="p-3 bg-[#080d19] rounded-xl border border-zinc-800/70 text-[11px] font-mono-tech text-zinc-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ARCHIVAL EVIDENCE STANDARD</span>
            </div>
            <p className="text-zinc-500 text-[10px] leading-relaxed">
              Every registry item corresponds to tangible software repositories, academic hackathons, or operating software systems.
            </p>
          </div>
        </div>

        {/* Right Column: Selected Record Detailed Archival Dossier (lg: 8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Main Record Header & Overview Card */}
          <div className="p-5 sm:p-6 bg-[#0e121d]/90 rounded-xl border border-zinc-800/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{activeRecord.recordNumber}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">{activeRecord.year}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                    {activeRecord.category}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mt-1.5">
                  {activeRecord.title}
                </h3>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-mono-tech flex items-center gap-2 shrink-0">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{activeRecord.recognition}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono-tech text-zinc-400 pt-1 border-t border-zinc-800/70">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-zinc-500">ORGANIZATION:</span>
                <span className="text-zinc-200 font-medium">{activeRecord.organization}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-zinc-500">TIMEFRAME:</span>
                <span className="text-zinc-200">{activeRecord.year}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed pt-2 border-t border-zinc-800/60">
              {activeRecord.summary}
            </p>

            {/* Quick Action Bar: Copy Citation & Cross-link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/60">
              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-mono-tech text-zinc-200 hover:text-white transition-colors cursor-pointer"
                title="Copy verified citation to clipboard"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Citation Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Official Citation</span>
                  </>
                )}
              </button>

              {activeRecord.associatedWindow && (
                <button
                  onClick={handleOpenAssociatedWindow}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-600/50 text-xs font-mono-tech text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Inspect in{' '}
                    {activeRecord.associatedWindow === 'mission-control'
                      ? 'Mission Control'
                      : activeRecord.associatedWindow === 'engineering-log'
                      ? 'Engineering Log'
                      : 'System Profile'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Dossier Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#090e1a] rounded-xl border border-zinc-800/80 text-xs font-mono-tech">
            <button
              onClick={() => handleTabChange('overview')}
              className={`flex-1 py-2 px-3 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Scope &amp; Context</span>
            </button>

            <button
              onClick={() => handleTabChange('evaluation')}
              className={`flex-1 py-2 px-3 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'evaluation'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Evaluation Criteria</span>
            </button>

            <button
              onClick={() => handleTabChange('artifacts')}
              className={`flex-1 py-2 px-3 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'artifacts'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Impact &amp; Highlights</span>
            </button>
          </div>

          {/* Tab 1: Scope & Context */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Problem Addressed */}
              <div className="p-4 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Problem Addressed &amp; Environmental Reality</span>
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {activeRecord.problemStatement}
                </p>
              </div>

              {/* Technical Scope Submitted */}
              <div className="p-4 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>Engineering Scope &amp; Deliverables</span>
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {activeRecord.submissionScope}
                </p>
              </div>

              {/* Technologies Applied */}
              <div className="p-4 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-xl space-y-2">
                <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
                  Evaluated Technical Stack &amp; Concepts
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeRecord.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#0f172a] border border-zinc-800 text-[11px] font-mono-tech text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Evaluation Criteria */}
          {activeTab === 'evaluation' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-400 px-1">
                <span>FORMAL EVALUATION DIMENSIONS</span>
                <span>JURY &amp; ARCHIVAL REVIEW</span>
              </div>

              <div className="space-y-3">
                {activeRecord.evaluationCriteria.map((evalItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs font-display font-bold text-amber-200">
                        {evalItem.criterion}
                      </div>
                      <span className="text-[10px] font-mono-tech text-zinc-500 uppercase">
                        Criterion 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed">
                      {evalItem.evaluation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Impact & Highlights */}
          {activeTab === 'artifacts' && (
            <div className="space-y-4">
              {/* Documented Evidence Highlights */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider px-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Documented Record Substance &amp; Milestones</span>
                </div>

                <div className="space-y-2">
                  {activeRecord.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#0a0e1a]/85 border border-zinc-800/80 rounded-lg text-xs text-zinc-300 flex items-start gap-3"
                    >
                      <span className="font-mono-tech text-amber-400 font-semibold mt-0.5 text-[11px]">
                        0{idx + 1}.
                      </span>
                      <span className="font-light leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Substantiated Outcomes */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider px-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Substantiated Real-World Outcomes</span>
                </div>

                <div className="space-y-2">
                  {activeRecord.impactAndOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#070b16] border border-amber-950/40 rounded-lg text-xs text-zinc-300 flex items-start gap-3"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-light leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permanent Citation Record */}
              <div className="p-3.5 bg-[#070b16] rounded-xl border border-zinc-800/80 space-y-1.5 font-mono-tech">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  Permanent Record Reference Citation
                </div>
                <div className="text-xs text-amber-300/90 font-light select-all">
                  &ldquo;{activeRecord.citation}&rdquo;
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
