export interface MissionFlowStep {
  step: string;
  label: string;
  desc: string;
}

export interface MissionCurrentState {
  stage: string;
  badge: 'ACTIVE BUILD' | 'CONCEPT & ARCHITECTURE' | 'ACTIVE SYSTEM';
  details: string;
  note: string;
}

export interface MissionProblem {
  title: string;
  summary: string;
  points: string[];
}

export interface MissionApproach {
  title: string;
  summary: string;
  pillars: {
    title: string;
    desc: string;
  }[];
}

export interface MissionTechCategory {
  category: string;
  items: string[];
}

export interface MissionVisual {
  id: string;
  title: string;
  category: string;
  type: 'CONCEPTUAL ARCHITECTURE' | 'SYSTEM FLOW DIAGRAM' | 'INTERFACE PROTOTYPE' | 'SYSTEM MAP';
  description: string;
  details: string[];
  diagramKey: string;
  assetPath?: string;
}

export interface Mission {
  id: string;
  name: string;
  codename: string;
  category: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'DEVELOPMENT';
  role: string;
  summary: string;
  coreConcept: string;
  currentState: MissionCurrentState;
  problem: MissionProblem;
  approach: MissionApproach;
  flowSteps: MissionFlowStep[];
  architecture: string[];
  techStack: string[];
  techCategories: MissionTechCategory[];
  keyCapabilities: string[];
  visuals: MissionVisual[];
  githubUrl?: string;
  demoUrl?: string;
}

export const missions: Mission[] = [
  {
    id: 'jano-health',
    name: 'Jano Health',
    codename: 'MISSION-01 // JANO',
    category: 'Healthcare Intelligence & EHR',
    status: 'ACTIVE',
    role: 'Founder & Systems Architect',
    summary:
      'An AI-enabled, offline-first electronic health record (EHR) and clinical intelligence system engineered specifically for resource-constrained medical environments.',
    coreConcept:
      'Clinics in regions with unstable power or intermittent connectivity require uninterrupted medical record keeping and intelligent diagnostic assistance without constant cloud dependence.',
    currentState: {
      stage: 'MVP / ACTIVE BUILD',
      badge: 'ACTIVE BUILD',
      details:
        'Core offline data structures, local persistence schemas, FHIR data mappings, and clinical intake summarization workflows are currently under active build.',
      note: 'Technical design and prototype build phase. Strictly non-commercial: no live hospital deployments, clinical outcome claims, or institutional partnerships.'
    },
    problem: {
      title: 'Infrastructure Deficits in Clinical Settings',
      summary:
        'Primary healthcare facilities in rural and infrastructure-limited areas face frequent grid failures, erratic network access, and paper-record fragmentation that compromise patient safety.',
      points: [
        'Cloud-only health record platforms become inaccessible during network dropouts, halting intake.',
        'Paper registries cause duplicated patient histories, lost diagnostic logs, and severe triage delays.',
        'High patient-to-clinician ratios produce documentation fatigue and diagnostic oversights.',
        'Absence of standardized health data schemas impedes continuity of care when patients transfer.'
      ]
    },
    approach: {
      title: 'Resilient Local-First Clinical Intelligence',
      summary:
        'Architecting an offline-first system where every clinic terminal operates autonomously with conflict-resilient local storage, supplemented by embedded AI assistance.',
      pillars: [
        {
          title: 'Local-First Data Autonomy',
          desc: 'Clinicians retain full read and write capabilities locally even during prolonged power and network blackouts.'
        },
        {
          title: 'FHIR Standard Compliance',
          desc: 'Clinical encounters and patient observations are structured following HL7/FHIR specifications for interoperability.'
        },
        {
          title: 'Assistive Clinical Intelligence',
          desc: 'Lightweight machine learning pipelines help parse unstructured symptoms and suggest preliminary triage classifications.'
        },
        {
          title: 'Tamper-Evident Auditability',
          desc: 'Every diagnostic modification and prescription record is signed with strict role-based access logs.'
        }
      ]
    },
    flowSteps: [
      { step: '01', label: 'PATIENT INTAKE', desc: 'Local demographic and biometric registration' },
      { step: '02', label: 'OFFLINE IDENTITY', desc: 'Unique identifier resolution on local device' },
      { step: '03', label: 'UNIFIED RECORD', desc: 'Historical timeline and vitals documentation' },
      { step: '04', label: 'FHIR DATA LAYER', desc: 'Standardized clinical resource serialization' },
      { step: '05', label: 'CLINICAL AI', desc: 'Intelligent triage categorization and summarization' },
      { step: '06', label: 'RESILIENT SYNC', desc: 'Conflict-free replication when connectivity restores' }
    ],
    architecture: [
      'Offline-first local data synchronization layer with conflict-free replication',
      'Clinical data structures modeled after HL7/FHIR resource specifications',
      'Embedded machine learning pipelines for automated triage summarization and medical coding',
      'Tamper-evident clinical audit trails with role-based access control'
    ],
    techStack: [
      'Python',
      'Django',
      'PostgreSQL',
      'React',
      'FHIR',
      'Clinical AI',
      'REST APIs'
    ],
    techCategories: [
      { category: 'Backend & Data', items: ['Python', 'Django', 'PostgreSQL', 'SQLite Local Edge'] },
      { category: 'Clinical Standards', items: ['HL7 / FHIR Resource Models', 'ICD-10 Mappings'] },
      { category: 'Intelligence Layer', items: ['Clinical NLP', 'Triage Classification Pipelines'] },
      { category: 'Client Application', items: ['React', 'TypeScript', 'Tailwind CSS'] }
    ],
    keyCapabilities: [
      'Local-first record creation and retrieval without active internet connection',
      'Automated clinical intake parsing and structured symptom categorization',
      'Standardized patient health histories formatted for clinic-to-clinic exchange',
      'Resilient database migrations optimized for intermittent network environments'
    ],
    visuals: [
      {
        id: 'jano-edge-topology',
        title: 'Local-First Edge Architecture & Sync Topology',
        category: '01 — SYSTEM OVERVIEW',
        type: 'CONCEPTUAL ARCHITECTURE',
        description:
          'Distributed offline-first node topology showing disconnected field clinic edge terminals operating autonomously with conflict-free replication to upstream central servers upon network availability.',
        diagramKey: 'jano-edge-topology',
        details: [
          'Autonomous SQLite/IndexedDB local edge database on every clinic device',
          'Bidirectional conflict-free change tracking via vector clocks',
          'Background HTTP/TLS synchronization daemon with resilient batching'
        ]
      },
      {
        id: 'jano-triage-pipeline',
        title: 'Clinical Encounter & AI Triage Pipeline',
        category: '02 — CLINICAL WORKFLOW',
        type: 'SYSTEM FLOW DIAGRAM',
        description:
          'End-to-end data pipeline from initial biometric/demographic registration to automated symptom summarization and clinical triage categorization.',
        diagramKey: 'jano-triage-pipeline',
        details: [
          'Patient intake and emergency biometric resolution without internet',
          'Clinical NLP pipeline extracting structured vitals and chief complaints',
          'HL7/FHIR Encounter and Observation resource compilation'
        ]
      },
      {
        id: 'jano-fhir-schema',
        title: 'Unified Patient Timeline & FHIR Schema Map',
        category: '03 — PATIENT / RECORD EXPERIENCE',
        type: 'CONCEPTUAL ARCHITECTURE',
        description:
          'Multi-layer data architecture connecting Patient Identity, Clinical Encounters, Lab Observations, Diagnostic Reports, and Prescription Ledgers.',
        diagramKey: 'jano-fhir-schema',
        details: [
          'FHIR R4 compliant resource hierarchy (Patient, Encounter, Condition, MedicationRequest)',
          'Immutable clinical audit trail with cryptographic revision hashes',
          'Standardized ICD-10 diagnostic code tagging'
        ]
      },
      {
        id: 'jano-cds-flow',
        title: 'Embedded Clinical Intelligence & Decision Support',
        category: '04 — INTELLIGENCE / CDS',
        type: 'SYSTEM FLOW DIAGRAM',
        description:
          'Lightweight clinical triage inference pipeline designed to run on edge hardware to flag acute vitals and assist clinical prioritization.',
        diagramKey: 'jano-cds-flow',
        details: [
          'Client-side rule evaluation and offline model scoring',
          'Real-time anomaly detection across temperature, heart rate, and oxygen saturation',
          'Decision support alerts formatted directly for attending clinicians'
        ]
      }
    ],
    githubUrl: 'https://github.com/firaol-dev/jano-health'
  },
  {
    id: 'anchor-health',
    name: 'Anchor Health',
    codename: 'MISSION-02 // ANCHOR',
    category: 'Healthcare Financing & Fintech',
    status: 'ACTIVE',
    role: 'Full-Stack & Fintech Systems Engineer',
    summary:
      'A dedicated healthcare financing platform operating on a "Get Treated Now, Pay Later" model, bridging patients and clinics to remove upfront financial barriers to urgent care.',
    coreConcept:
      'Patients facing sudden medical emergencies often encounter steep upfront deposit requirements. Anchor Health facilitates flexible installment disbursements directly between providers and patients.',
    currentState: {
      stage: 'CONCEPT & ARCHITECTURE',
      badge: 'CONCEPT & ARCHITECTURE',
      details:
        'Financial installment calculation algorithms, clinic reconciliation logic, and patient intake workflows are structurally designed.',
      note: 'Systems architecture & prototype phase. No active lending book, real capital disbursements, bank charters, or customer loans.'
    },
    problem: {
      title: 'Acute Out-of-Pocket Payment Bottlenecks',
      summary:
        'Unexpected emergency medical care requires upfront cash deposits at private clinics, forcing patients to delay urgent treatments or risk catastrophic out-of-pocket debt.',
      points: [
        'Private facilities frequently demand immediate cash deposits before scheduling acute procedures.',
        'Absence of structured health installment financing leaves middle- and lower-income families stranded.',
        'Clinics bear high default risk when providing informal credit without verified repayment terms.',
        'Manual bookkeeping between clinic accounting and patient payments creates administrative overhead.'
      ]
    },
    approach: {
      title: 'Provider-Reconciled Installment Infrastructure',
      summary:
        'Engineering a digital health financing protocol that verifies patient eligibility and automates deferred repayment schedules directly linked to clinic billing systems.',
      pillars: [
        {
          title: 'Get Treated Now, Pay Later',
          desc: 'Decouples medical intervention from immediate cash availability through transparent installment terms.'
        },
        {
          title: 'Clinic Settlement Portal',
          desc: 'Provides clinic administrators with automated reconciliation of scheduled patient repayments.'
        },
        {
          title: 'Configurable Amortization',
          desc: 'Calculates flexible repayment schedules adapted to procedure costs and patient repayment profiles.'
        },
        {
          title: 'Transparent Audit Ledger',
          desc: 'Maintains an immutable ledger of transactions, scheduled disbursements, and settled payments.'
        }
      ]
    },
    flowSteps: [
      { step: '01', label: 'PATIENT INTAKE', desc: 'Emergency registration and treatment estimate' },
      { step: '02', label: 'ELIGIBILITY CHECK', desc: 'Basic criteria and repayment capacity evaluation' },
      { step: '03', label: 'SCHEDULE CREATION', desc: 'Structured installment agreement generated' },
      { step: '04', label: 'CARE CLEARANCE', desc: 'Clinic receives instant procedure authorization' },
      { step: '05', label: 'DIRECT SETTLEMENT', desc: 'Scheduled disbursements to healthcare provider' },
      { step: '06', label: 'LEDGER RECONCILING', desc: 'Continuous payment audit and tracking log' }
    ],
    architecture: [
      'Modular payment schedule calculator with configurable amortization curves',
      'Provider reimbursement reconciliation engine for direct clinic settlements',
      'Secure patient eligibility verification and identity verification flows',
      'Event-driven transaction log recording payment receipts, reminders, and schedules'
    ],
    techStack: [
      'Python',
      'Django',
      'PostgreSQL',
      'React',
      'REST APIs',
      'Tailwind CSS'
    ],
    techCategories: [
      { category: 'Backend & Services', items: ['Python', 'Django REST Framework', 'PostgreSQL'] },
      { category: 'Ledger Logic', items: ['Amortization Engine', 'Audit Trail Services'] },
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] }
    ],
    keyCapabilities: [
      'Streamlined clinic intake flow for instant patient financing registration',
      'Automated installment scheduling with transparent repayment visibility',
      'Direct clinic settlement portal for clinic administrators and finance officers',
      'Clean audit ledger for payment tracking and disbursement accounting'
    ],
    visuals: [
      {
        id: 'anchor-lifecycle',
        title: 'Healthcare Installment Financing Lifecycle',
        category: '01 — FINANCING FLOW',
        type: 'SYSTEM FLOW DIAGRAM',
        description:
          'Structured "Get Treated Now, Pay Later" workflow bridging patient intake, repayment capacity verification, instant care clearance, and installment scheduling.',
        diagramKey: 'anchor-lifecycle',
        details: [
          'Instant emergency treatment clearance to prevent care refusal',
          'Dynamic installment amortizer configured for patient repayment capability',
          'Automated payment schedule generation with notification dispatch'
        ]
      },
      {
        id: 'anchor-ledger-map',
        title: 'Provider Reimbursement & Reconciliation Ledger',
        category: '02 — SYSTEM ARCHITECTURE',
        type: 'CONCEPTUAL ARCHITECTURE',
        description:
          'Bilateral accounting architecture linking patient installment repayments, direct clinic fee disbursements, and audit balance reconciliation.',
        diagramKey: 'anchor-ledger-map',
        details: [
          'Clinic settlement portal for healthcare finance administrators',
          'Immutable double-entry transaction ledger tracking all scheduled payments',
          'Automated reconciliation flags for failed or deferred installment tranches'
        ]
      }
    ],
    githubUrl: 'https://github.com/firaol-dev/anchor-health'
  },
  {
    id: 'orbit-os',
    name: 'Orbit OS',
    codename: 'MISSION-03 // ORBIT',
    category: 'Spatial UI & Systems Design',
    status: 'ACTIVE',
    role: 'Creator & UI/UX Architect',
    summary:
      'An interactive personal operating system and spatial portfolio environment designed around a central orbital core, reactive telemetry HUD, and isolated window manager.',
    coreConcept:
      'Reimagining personal portfolio representation as an autonomous technical operating system that unifies projects, competencies, archival records, and shell access into a single coherent canvas.',
    currentState: {
      stage: 'ACTIVE SYSTEM / PROTOTYPE',
      badge: 'ACTIVE SYSTEM',
      details:
        'Fully implemented client-side browser operating system with functional orbital geometry, window orchestrator, audio synthesis, and shell interface.',
      note: 'Portfolio and systems design experience running entirely in-browser. Not an enterprise operating system or native desktop platform.'
    },
    problem: {
      title: 'Flat, Generic Portfolio Archetypes',
      summary:
        'Standard developer portfolios rely on linear scroll templates and static resume cards that fail to convey systems thinking, spatial interface architecture, or technical depth.',
      points: [
        'Linear vertical feeds force passive scrolling without tactile technical engagement.',
        'Component isolation and window management principles cannot be demonstrated on static web pages.',
        'Resonance, telemetry, and shell navigation are absent from conventional portfolio designs.',
        'Visual identity in software engineering portfolios often defaults to generic prefabricated themes.'
      ]
    },
    approach: {
      title: 'Spatial Operating System as Portfolio Canvas',
      summary:
        'Constructing a zero-bloat browser operating system with an orbital coordinate system, reactive window manager, audio synthesis, and CLI shell.',
      pillars: [
        {
          title: 'Orbital Geometry Engine',
          desc: 'Dynamic polar coordinates map nodes symmetrically around a reactive central Core.'
        },
        {
          title: 'Single-Source Window Manager',
          desc: 'Autonomous orchestrator handles z-index focus stacking, drag bounds, and window states.'
        },
        {
          title: 'Synthesized Telemetry Audio',
          desc: 'Web Audio API delivers procedural auditory feedback without external audio files.'
        },
        {
          title: 'Integrated Shell Protocol',
          desc: 'Interactive CLI terminal exposes direct commands and window hooks into the OS runtime.'
        }
      ]
    },
    flowSteps: [
      { step: '01', label: 'CORE ORCHESTRATOR', desc: 'Central clock, telemetry, and resonance pulse' },
      { step: '02', label: 'ORBITAL NODES', desc: 'Polar coordinate layout with reactive connection beams' },
      { step: '03', label: 'WINDOW MANAGER', desc: 'Z-index layering, dragging, minimize/maximize controls' },
      { step: '04', label: 'APPLICATIONS', desc: 'Autonomous modules for Missions, Skills, Vault, and Log' },
      { step: '05', label: 'TERMINAL SHELL', desc: 'CLI environment executing system commands and hooks' }
    ],
    architecture: [
      'Unified reactive window state orchestrator managing focus, layering, minimization, and maximization',
      'Dynamic polar coordinate engine mapping orbital nodes with viewport boundary protection',
      'Synthesized Web Audio telemetry soundscape providing tactile feedback without media bloat',
      'Autonomous keyboard shortcut layer and interactive terminal integration'
    ],
    techStack: [
      'React',
      'Next.js / TypeScript',
      'Tailwind CSS',
      'Motion',
      'Web Audio API'
    ],
    techCategories: [
      { category: 'Core Runtime', items: ['React 19', 'TypeScript', 'Vite'] },
      { category: 'Styling & Motion', items: ['Tailwind CSS v4', 'Motion Engine'] },
      { category: 'Telemetry Audio', items: ['Web Audio API Procedural Synthesizer'] }
    ],
    keyCapabilities: [
      'Coherent multi-window multitasking with z-index stacking and focus handoff',
      'Five-node orbital network mapped symmetrically around a central interactive Core',
      'Functional terminal shell with command execution, history navigation, and window hooks',
      'Complete responsiveness across desktop, tablet, and mobile with zero layout jitter'
    ],
    visuals: [
      {
        id: 'orbit-polar-engine',
        title: 'Pentagonal Polar Coordinate Geometry Engine',
        category: '01 — SPATIAL DESKTOP',
        type: 'SYSTEM MAP',
        description:
          'Mathematical coordinate mapping engine placing 5 symmetrical nodes at 72° angular intervals around a reactive central Core with safe viewport bounds.',
        diagramKey: 'orbit-polar-engine',
        details: [
          'Trigonometric mapping: x = cx + R * cos(θ), y = cy + R * sin(θ)',
          'Dynamic viewport clearance calculating max safe radius across all screen sizes',
          'Vector connection rays and pulse packet animations on resonance'
        ]
      },
      {
        id: 'orbit-window-arch',
        title: 'Autonomous Window State Orchestrator',
        category: '02 — WINDOW SYSTEM',
        type: 'CONCEPTUAL ARCHITECTURE',
        description:
          'State machine managing z-index layering, boundary-clamped mouse dragging, minimize/restore states, and bottom taskbar synchronization.',
        diagramKey: 'orbit-window-arch',
        details: [
          'Global WindowProvider controlling lifecycle of all technical applications',
          'Isolated draggable boundary box with mobile full-sheet fallback',
          'Taskbar dock synchronization with one-click Close All dispatch'
        ]
      },
      {
        id: 'orbit-audio-graph',
        title: 'Procedural Web Audio Telemetry Architecture',
        category: '03 — TELEMETRY AUDIO',
        type: 'SYSTEM FLOW DIAGRAM',
        description:
          'Synthesized Web Audio audio graph generating real-time tactile sound effects without external audio file requests or media bloat.',
        diagramKey: 'orbit-audio-graph',
        details: [
          'Synthesized dual-tone sine oscillator frequency modulation for clicks and pulses',
          'Exponential gain decay curve creating crisp mechanical feedback',
          'Single shared AudioContext initialized lazily on first user interaction'
        ]
      }
    ],
    githubUrl: 'https://github.com/firaol-dev/orbit-os'
  }
];
