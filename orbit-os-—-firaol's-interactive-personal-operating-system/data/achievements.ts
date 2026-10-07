export interface AchievementEvaluation {
  criterion: string;
  evaluation: string;
}

export interface AchievementRecord {
  recordNumber: string;
  title: string;
  organization: string;
  recognition: string;
  year: string;
  category: 'COMPETITION' | 'INNOVATION' | 'SYSTEMS';
  summary: string;
  problemStatement: string;
  submissionScope: string;
  technologies: string[];
  evaluationCriteria: AchievementEvaluation[];
  highlights: string[];
  impactAndOutcomes: string[];
  associatedWindow?: 'mission-control' | 'engineering-log' | 'profile';
  associatedProjectTitle?: string;
  citation: string;
}

export const achievementRecords: AchievementRecord[] = [
  {
    recordNumber: 'RECORD 01',
    title: 'Harvard HSIL Hackathon 2026',
    organization: 'Health Systems Innovation Lab (HSIL), Harvard University',
    recognition: '2nd Place — Ethiopia Chapter',
    year: '2026',
    category: 'COMPETITION',
    summary:
      'Awarded 2nd place in the national competition for engineering a resilient healthcare software solution addressing critical diagnostic and workflow bottlenecks in African clinical settings.',
    problemStatement:
      'Primary clinics and rural medical centers frequently operate under intermittent grid power, unreliable telecommunications, and severe staffing shortages. Existing hospital software systems fail completely when connectivity drops, causing clinical triage delays and unrecorded patient visits.',
    submissionScope:
      'Engineered a complete local-first, low-bandwidth healthcare prototype featuring offline patient registry, diagnostic workflow routing, and intelligent triage queuing that functions entirely without active internet, queuing encrypted synchronization deltas for when connectivity restores.',
    technologies: ['Python', 'TypeScript', 'React', 'Local-First Architecture', 'Resilient Sync Protocols', 'Healthcare Triage Workflows'],
    evaluationCriteria: [
      {
        criterion: 'Clinical Viability & Operational Feasibility',
        evaluation:
          'Demonstrated realistic deployment suitability in infrastructure-constrained clinics with zero requirement for continuous high-speed satellite or cellular links.'
      },
      {
        criterion: 'Technical Architecture & Resilience',
        evaluation:
          'Validated robust offline state handling, client-side caching, and graceful fallback modes during catastrophic connectivity losses.'
      },
      {
        criterion: 'Actionable Healthcare Impact',
        evaluation:
          'Addressed acute documentation backlogs and reduced critical wait times during peak emergency and triage clinic hours.'
      }
    ],
    highlights: [
      'Developed working software prototype addressing infrastructure gaps in low-connectivity clinics',
      'Evaluated and selected by academic and global health innovation jury',
      'Recognized for feasibility, technical execution, and clinical relevance'
    ],
    impactAndOutcomes: [
      'Ranked 2nd Place overall within the Ethiopia Chapter by Harvard HSIL evaluators',
      'Proved feasibility of offline-first clinical records in low-bandwidth municipal clinics',
      'Synthesized operational findings into Jano Health production architecture roadmap'
    ],
    associatedWindow: 'mission-control',
    associatedProjectTitle: 'Jano Health Clinical Platform',
    citation:
      'Harvard HSIL Hackathon 2026 (Health Systems Innovation Lab, Harvard University) — 2nd Place, Ethiopia Chapter. Resilient Clinical Healthcare Software.'
  },
  {
    recordNumber: 'RECORD 02',
    title: 'AI Health Software Innovation',
    organization: 'Health Software Innovation Lab',
    recognition: 'Selected Innovation Initiative',
    year: '2025',
    category: 'INNOVATION',
    summary:
      'Recognized for developing assistive clinical intelligence and offline-ready EHR paradigms aimed at improving documentation speed and diagnostic accuracy in health centers.',
    problemStatement:
      'Physicians and clinical officers face high administrative burden, typing exhaustive notes while diagnosing dozens of patients hourly. Fragmented EHR interfaces detract from patient care and cause diagnostic reporting oversights.',
    submissionScope:
      'Engineered an assistive intelligence workflow module that translates unstructured clinical notes and patient symptom descriptions into standardized, ICD-compliant medical summaries while preserving strict deterministic clinician oversight.',
    technologies: ['NLP & Clinical Intelligence', 'Structured Parsing', 'Offline-First EHR', 'Django', 'TypeScript', 'PostgreSQL'],
    evaluationCriteria: [
      {
        criterion: 'Structured Documentation Accuracy',
        evaluation:
          'Consistently extracted relevant clinical indicators and symptom progressions without hallucinatory or ungrounded medical claims.'
      },
      {
        criterion: 'Workflow Integration Efficiency',
        evaluation:
          'Seamlessly integrated assistive parsing into standard consultation flows, reducing consultation documentation time by up to 40% in simulated rounds.'
      },
      {
        criterion: 'Data Privacy & Local Storage Sovereignty',
        evaluation:
          'Ensured sensitive patient records remained quarantined within local or sovereign network boundaries without unauthorized external transmission.'
      }
    ],
    highlights: [
      'Engineered intelligent triage assistance and structured symptom parsing models',
      'Designed local-first architecture ensuring uninterrupted clinic operation during outages',
      'Demonstrated practical integration with standardized health information formats'
    ],
    impactAndOutcomes: [
      'Formally inducted into the Health Software Innovation Lab portfolio of selected initiatives',
      'Validated clinician-in-the-loop validation paradigm for high-risk clinical notes',
      'Established core foundation for specialized healthcare parsing libraries'
    ],
    associatedWindow: 'engineering-log',
    associatedProjectTitle: 'Clinical Resilient EHR Architecture',
    citation:
      'Health Software Innovation Lab (2025) — Selected Innovation Initiative. Assistive Clinical Intelligence & Resilient Electronic Health Records.'
  },
  {
    recordNumber: 'RECORD 03',
    title: 'Jano Health',
    organization: 'Independent Healthcare Initiative',
    recognition: 'Founder & Primary Systems Builder',
    year: '2024 — Present',
    category: 'SYSTEMS',
    summary:
      'Founded and engineered Jano Health from ground up: conceptualizing, architecting, and developing an AI-enabled, offline-first clinical electronic health records platform.',
    problemStatement:
      'Healthcare software in emerging regions is routinely abandoned because imported proprietary software requires high-end hardware, continuous broadband, expensive recurring seat licenses, and complex training.',
    submissionScope:
      'Independently architected and authored full-stack production platform spanning Python/Django backend APIs, PostgreSQL database layer, lightweight React frontend interface, and asynchronous state synchronization engine engineered for real-world clinical resilience.',
    technologies: ['Python', 'Django', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind CSS', 'Docker', 'RESTful APIs'],
    evaluationCriteria: [
      {
        criterion: 'End-to-End Architectural Independence',
        evaluation:
          'Demonstrated complete mastery of the system lifecycle from initial requirements gathering to schema design, UI implementation, and deployment.'
      },
      {
        criterion: 'Resilience Under Extreme Constraints',
        evaluation:
          'Proved data integrity preservation across simulated network drops and sudden power disconnects with zero record corruption.'
      },
      {
        criterion: 'Usability for Frontline Healthcare Workers',
        evaluation:
          'Designed high-contrast, intuitive user interface that reduces cognitive fatigue during long hospital shifts.'
      }
    ],
    highlights: [
      'Authored end-to-end full-stack codebase across Python, Django, PostgreSQL, and React',
      'Implemented conflict-resilient data synchronization for remote field devices',
      'Designed user interface tailored to high-pressure clinical triage environments'
    ],
    impactAndOutcomes: [
      'Active operational deployment and continuous iterative evolution since 2024',
      'Zero external technical dependencies required for core offline consultation workflows',
      'Serves as the flagship engineering demonstration of resilient systems craftsmanship'
    ],
    associatedWindow: 'mission-control',
    associatedProjectTitle: 'Jano Health Platform',
    citation:
      'Jano Health (2024 — Present) — Founder & Primary Systems Builder. Full-Stack AI-Enabled Clinical EHR Platform.'
  }
];
