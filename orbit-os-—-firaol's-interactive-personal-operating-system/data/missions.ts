export interface Mission {
  id: string;
  name: string;
  codename: string;
  category: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'DEVELOPMENT';
  role: string;
  summary: string;
  coreConcept: string;
  architecture: string[];
  techStack: string[];
  keyCapabilities: string[];
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
    keyCapabilities: [
      'Local-first record creation and retrieval without active internet connection',
      'Automated clinical intake parsing and structured symptom categorization',
      'Standardized patient health histories formatted for clinic-to-clinic exchange',
      'Resilient database migrations optimized for intermittent network environments'
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
    keyCapabilities: [
      'Streamlined clinic intake flow for instant patient financing registration',
      'Automated installment scheduling with transparent repayment visibility',
      'Direct clinic settlement portal for clinic administrators and finance officers',
      'Clean audit ledger for payment tracking and disbursement accounting'
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
    keyCapabilities: [
      'Coherent multi-window multitasking with z-index stacking and focus handoff',
      'Five-node orbital network mapped symmetrically around a central interactive Core',
      'Functional terminal shell with command execution, history navigation, and window hooks',
      'Complete responsiveness across desktop, tablet, and mobile with zero layout jitter'
    ],
    githubUrl: 'https://github.com/firaol-dev/orbit-os'
  }
];
