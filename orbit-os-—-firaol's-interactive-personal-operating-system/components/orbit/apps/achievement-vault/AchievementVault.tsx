import React, { useState } from 'react';
import { achievementRecords, AchievementRecord } from '@/data/achievements';
import { soundFx } from '@/lib/utils';
import { Award, CheckCircle2, Archive, Calendar, Bookmark, Building2 } from 'lucide-react';

export function AchievementVault() {
  const [selectedRecordNumber, setSelectedRecordNumber] = useState<string>(achievementRecords[0].recordNumber);

  const activeRecord =
    achievementRecords.find((r) => r.recordNumber === selectedRecordNumber) || achievementRecords[0];

  const handleSelect = (recNum: string) => {
    soundFx.playClick();
    setSelectedRecordNumber(recNum);
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
            <span className="text-zinc-400">{achievementRecords.length} INDEXED ENTRIES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Achievement Vault
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
          <Archive className="w-3.5 h-3.5 text-amber-400/80" />
          <span>VAULT ARCHIVE // RESTRICTED ACCESS</span>
        </div>
      </div>

      {/* Main Archival Vault Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Records Index (lg: 4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono-tech text-zinc-500 uppercase tracking-wider">
            <span>Archival Records</span>
            <span>Index Directory</span>
          </div>

          <div className="space-y-2">
            {achievementRecords.map((record) => {
              const isSelected = record.recordNumber === selectedRecordNumber;
              return (
                <button
                  key={record.recordNumber}
                  onClick={() => handleSelect(record.recordNumber)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-[#181308] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                      : 'bg-[#0a0f1d]/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#0f172a]/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono-tech text-amber-400 font-semibold tracking-wider">
                      {record.recordNumber}
                    </span>
                    <span className="text-[10px] font-mono-tech text-zinc-500">
                      {record.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-display font-bold text-zinc-100 mt-1 group-hover:text-amber-200 transition-colors">
                    {record.title}
                  </h3>

                  <div className="text-[11px] font-mono-tech text-zinc-400 mt-0.5 truncate">
                    {record.recognition}
                  </div>

                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Record Detailed Archival Dossier (lg: 8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Main Dossier Card */}
          <div className="p-5 bg-[#0e121d]/85 rounded-xl border border-zinc-800/90 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{activeRecord.recordNumber}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">{activeRecord.year}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  {activeRecord.title}
                </h3>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-mono-tech flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeRecord.recognition}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 pt-1">
              <Building2 className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-500">ISSUED BY:</span>
              <span className="text-zinc-300">{activeRecord.organization}</span>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed pt-2 border-t border-zinc-800/80">
              {activeRecord.summary}
            </p>
          </div>

          {/* Documented Evidence & Milestones */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Record Substance &amp; Key Highlights</span>
            </div>

            <div className="space-y-2.5">
              {activeRecord.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#0a0e1a]/80 border border-zinc-800/70 rounded-lg text-xs text-zinc-300 flex items-start gap-3"
                >
                  <span className="font-mono-tech text-amber-400/90 font-semibold mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="font-light leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
