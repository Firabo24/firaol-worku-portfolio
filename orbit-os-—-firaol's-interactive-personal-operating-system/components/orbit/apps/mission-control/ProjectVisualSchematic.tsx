import React from 'react';

interface ProjectVisualSchematicProps {
  diagramKey: string;
}

export function ProjectVisualSchematic({ diagramKey }: ProjectVisualSchematicProps) {
  switch (diagramKey) {
    case 'jano-edge-topology':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>SCHEMATIC // OFFLINE-FIRST DISTRIBUTED TOPOLOGY</span>
            <span className="text-cyan-400">EDGE AUTONOMY ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            {/* Field Clinic Edge Node */}
            <div className="p-3.5 bg-[#0a0f1e] rounded-lg border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-cyan-300">
                <span>LOCAL CLINIC TERMINAL</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <div className="text-[11px] text-zinc-400 font-light space-y-1">
                <div>• SQLite / IndexedDB Local Storage</div>
                <div>• Read/Write during power blackouts</div>
                <div>• Local Patient Intake &amp; Triage</div>
              </div>
              <div className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                STATE: ZERO NETWORK DEPENDENCY
              </div>
            </div>

            {/* Sync Bridge */}
            <div className="flex flex-col items-center justify-center p-3 bg-zinc-950/60 rounded-lg border border-zinc-800 text-center space-y-1.5">
              <span className="text-[10px] font-mono-tech text-amber-400 font-semibold uppercase">
                BIDIRECTIONAL SYNC DAEMON
              </span>
              <div className="flex items-center gap-2 text-cyan-400 font-mono-tech text-xs">
                <span>←</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                  Vector Clocks
                </span>
                <span>→</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Resolves clinical record conflicts when intermittent connection restores.
              </p>
            </div>

            {/* Central Node */}
            <div className="p-3.5 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-zinc-200">
                <span>CENTRAL HEALTH REPOSITORY</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] text-zinc-400 font-light space-y-1">
                <div>• FHIR R4 Master Record Store</div>
                <div>• Inter-clinic referral exchange</div>
                <div>• Longitudinal health analytics</div>
              </div>
              <div className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                UPSTREAM: INTERMITTENT CONNECT
              </div>
            </div>
          </div>
        </div>
      );

    case 'jano-triage-pipeline':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>PIPELINE // CLINICAL ENCOUNTER DATAFLOW</span>
            <span className="text-emerald-400">STAGE 01 - 04</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[9px] font-mono-tech text-cyan-400 font-bold">01 · INTAKE</span>
              <div className="text-xs font-semibold text-zinc-100">Patient Registration</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Biometric resolution &amp; offline ID indexing on edge device.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[9px] font-mono-tech text-cyan-400 font-bold">02 · ENCOUNTER</span>
              <div className="text-xs font-semibold text-zinc-100">Vitals &amp; Symptoms</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Structured vital signs recording and chief complaint dictation.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-cyan-500/50 space-y-1 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="text-[9px] font-mono-tech text-emerald-400 font-bold">03 · AI PARSING</span>
              <div className="text-xs font-semibold text-zinc-100">Clinical NLP Triage</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Automated triage level categorization &amp; structured symptom extraction.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[9px] font-mono-tech text-cyan-400 font-bold">04 · FHIR SERIALIZE</span>
              <div className="text-xs font-semibold text-zinc-100">Standardized Record</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Encounters converted to HL7/FHIR JSON resources with tamper-evident log.
              </p>
            </div>
          </div>
        </div>
      );

    case 'jano-fhir-schema':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>SCHEMA ARCHITECTURE // FHIR R4 COMPLIANT HIERARCHY</span>
            <span className="text-cyan-400">DATA SPECIFICATION</span>
          </div>

          <div className="space-y-3">
            {/* Master Patient Object */}
            <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-600/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono-tech font-bold text-cyan-200">
                  Resource: Patient (UUID, Demographics, Local Identifier)
                </span>
              </div>
              <span className="text-[9px] font-mono-tech text-zinc-400">ROOT ENTITY</span>
            </div>

            {/* Child Linked Resources */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pl-3 sm:pl-6 border-l-2 border-cyan-500/30">
              <div className="p-2.5 bg-[#090e1c] rounded-lg border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono-tech text-cyan-400 font-semibold">
                  Resource: Encounter
                </span>
                <p className="text-[10px] text-zinc-400 font-light">
                  Visit type, timestamp, attending clinician role, location.
                </p>
              </div>

              <div className="p-2.5 bg-[#090e1c] rounded-lg border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono-tech text-emerald-400 font-semibold">
                  Resource: Observation
                </span>
                <p className="text-[10px] text-zinc-400 font-light">
                  Vitals, temperature, blood pressure, SpO2, triage score.
                </p>
              </div>

              <div className="p-2.5 bg-[#090e1c] rounded-lg border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono-tech text-amber-400 font-semibold">
                  Resource: Condition
                </span>
                <p className="text-[10px] text-zinc-400 font-light">
                  ICD-10 clinical diagnoses, onset timing, severity classification.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'jano-cds-flow':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>INFERENCE ENGINE // DECISION SUPPORT LOGIC</span>
            <span className="text-cyan-400">EDGE INFERENCE</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 flex-1 w-full space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-semibold">
                RAW CLINICAL INPUT
              </span>
              <p className="text-[11px] text-zinc-300 font-light">
                High fever, tachypnea, low oxygen saturation (&lt;90%).
              </p>
            </div>

            <span className="text-zinc-600 font-mono-tech text-xs hidden sm:inline">→</span>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-amber-600/40 flex-1 w-full space-y-1 shadow-[0_0_15px_rgba(245,158,11,0.08)]">
              <span className="text-[10px] font-mono-tech text-amber-400 font-semibold">
                ANOMALY DETECTOR
              </span>
              <p className="text-[11px] text-zinc-300 font-light">
                Identifies acute respiratory distress pattern via rules &amp; ML.
              </p>
            </div>

            <span className="text-zinc-600 font-mono-tech text-xs hidden sm:inline">→</span>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-emerald-600/40 flex-1 w-full space-y-1">
              <span className="text-[10px] font-mono-tech text-emerald-400 font-semibold">
                CLINICIAN ADVISORY
              </span>
              <p className="text-[11px] text-zinc-300 font-light">
                Flags priority queue placement &amp; alerts attending officer.
              </p>
            </div>
          </div>
        </div>
      );

    case 'anchor-lifecycle':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>FINANCING PROTOCOL // "GET TREATED NOW, PAY LATER"</span>
            <span className="text-cyan-400">WORKFLOW LIFECYCLE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">PHASE 1</span>
              <div className="text-xs font-semibold text-zinc-100">Intake &amp; Clearance</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Patient arrives with urgent procedure need. Immediate treatment clearance authorization issued without delay.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-cyan-500/40 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">PHASE 2</span>
              <div className="text-xs font-semibold text-zinc-100">Installment Amortization</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Flexible repayment curves structured based on treatment invoice and patient capacity.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">PHASE 3</span>
              <div className="text-xs font-semibold text-zinc-100">Provider Settlement</div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">
                Clinic billing administrators receive scheduled settlement reimbursements with full audit ledger tracking.
              </p>
            </div>
          </div>
        </div>
      );

    case 'anchor-ledger-map':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>LEDGER ARCHITECTURE // BILATERAL RECONCILIATION</span>
            <span className="text-emerald-400">DOUBLE ENTRY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-2">
              <span className="text-xs font-mono-tech font-bold text-cyan-300">
                PATIENT REPAYMENT JOURNAL
              </span>
              <div className="text-[11px] text-zinc-400 font-light space-y-1">
                <div>• Scheduled installment receipts</div>
                <div>• Timestamped payment verification hashes</div>
                <div>• Automated notification triggers</div>
              </div>
            </div>

            <div className="p-3.5 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-2">
              <span className="text-xs font-mono-tech font-bold text-emerald-300">
                CLINIC DISBURSEMENT JOURNAL
              </span>
              <div className="text-[11px] text-zinc-400 font-light space-y-1">
                <div>• Authorized procedure claim allocations</div>
                <div>• Direct clinic fee disbursements</div>
                <div>• Month-end reconciliation reporting</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'orbit-polar-engine':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>MATHEMATICAL MAPPING // POLAR COORDINATE ENGINE</span>
            <span className="text-cyan-400">PENTAGONAL SYMMETRY</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-zinc-950/70 rounded-lg border border-zinc-800 font-mono-tech text-xs text-cyan-300">
              x = centerX + R · cos(θ) &nbsp;|&nbsp; y = centerY + R · sin(θ)
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono-tech text-zinc-300">
              <div className="p-2 bg-[#090e1c] rounded border border-cyan-500/30 text-center">
                <span className="text-cyan-400 block font-bold">MISSIONS</span>
                <span>θ = -90°</span>
              </div>
              <div className="p-2 bg-[#090e1c] rounded border border-emerald-500/30 text-center">
                <span className="text-emerald-400 block font-bold">KNOWLEDGE</span>
                <span>θ = -18°</span>
              </div>
              <div className="p-2 bg-[#090e1c] rounded border border-amber-500/30 text-center">
                <span className="text-amber-400 block font-bold">VAULT</span>
                <span>θ = 54°</span>
              </div>
              <div className="p-2 bg-[#090e1c] rounded border border-blue-500/30 text-center">
                <span className="text-blue-400 block font-bold">LOG</span>
                <span>θ = 126°</span>
              </div>
              <div className="p-2 bg-[#090e1c] rounded border border-zinc-500/30 text-center col-span-2 sm:col-span-1">
                <span className="text-zinc-200 block font-bold">TERMINAL</span>
                <span>θ = 198°</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'orbit-window-arch':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>STATE ORCHESTRATOR // MULTI-WINDOW STATE MACHINE</span>
            <span className="text-cyan-400">UNIFIED CONTROLLER</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">INPUT TRIGGERS</span>
              <p className="text-[11px] text-zinc-400 font-light leading-snug">
                Keyboard shortcuts [1-5], Core click, terminal open commands, dock clicks.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-cyan-500/50 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">WINDOW STATE STORE</span>
              <p className="text-[11px] text-zinc-400 font-light leading-snug">
                Layering (Z-Index), clamped drag boundary coordinates, minimize &amp; maximize states.
              </p>
            </div>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">TASKBAR SYNC</span>
              <p className="text-[11px] text-zinc-400 font-light leading-snug">
                Active indicators, minimized tags, one-click close all window dispatch.
              </p>
            </div>
          </div>
        </div>
      );

    case 'orbit-audio-graph':
      return (
        <div className="w-full bg-[#050811] rounded-xl border border-cyan-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-zinc-500 uppercase pb-2 border-b border-zinc-800/80">
            <span>SYNTHESIS GRAPH // WEB AUDIO TELEMETRY ENGINE</span>
            <span className="text-cyan-400">ZERO MEDIA ASSETS</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-zinc-800 flex-1 w-full space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-400 font-semibold">
                SINE OSCILLATOR
              </span>
              <p className="text-[11px] text-zinc-400 font-light">
                Generates carrier tones (300Hz - 880Hz) on interaction events.
              </p>
            </div>

            <span className="text-zinc-600 font-mono-tech text-xs hidden sm:inline">→</span>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-cyan-500/40 flex-1 w-full space-y-1">
              <span className="text-[10px] font-mono-tech text-cyan-300 font-semibold">
                EXPONENTIAL GAIN NODE
              </span>
              <p className="text-[11px] text-zinc-400 font-light">
                Shapes tactile decay envelope (40ms - 900ms) with zero distortion.
              </p>
            </div>

            <span className="text-zinc-600 font-mono-tech text-xs hidden sm:inline">→</span>

            <div className="p-3 bg-[#0a0f1e] rounded-lg border border-emerald-500/40 flex-1 w-full space-y-1">
              <span className="text-[10px] font-mono-tech text-emerald-400 font-semibold">
                AUDIO DESTINATION
              </span>
              <p className="text-[11px] text-zinc-400 font-light">
                Hardware output delivering instant procedural acoustic feedback.
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-6 bg-zinc-950/60 rounded-xl border border-zinc-800 text-center text-xs font-mono-tech text-zinc-500">
          SYSTEM SCHEMATIC DATA READY
        </div>
      );
  }
}
