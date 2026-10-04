export interface AchievementRecord {
  recordNumber: string;
  title: string;
  organization: string;
  recognition: string;
  year: string;
  summary: string;
  highlights: string[];
}

export const achievementRecords: AchievementRecord[] = [
  {
    recordNumber: 'RECORD 01',
    title: 'Harvard HSIL Hackathon 2026',
    organization: 'Health Systems Innovation Lab (HSIL), Harvard University',
    recognition: '2nd Place — Ethiopia Chapter',
    year: '2026',
    summary:
      'Awarded 2nd place in the national competition for engineering a resilient healthcare software solution addressing critical diagnostic and workflow bottlenecks in African clinical settings.',
    highlights: [
      'Developed prototype addressing infrastructure gaps in low-connectivity clinics',
      'Evaluated and selected by academic and global health innovation jury',
      'Recognized for feasibility, technical execution, and clinical relevance'
    ]
  },
  {
    recordNumber: 'RECORD 02',
    title: 'AI Health Software Innovation',
    organization: 'Health Software Innovation Lab',
    recognition: 'Selected Innovation Initiative',
    year: '2025',
    summary:
      'Recognized for developing assistive clinical intelligence and offline-ready EHR paradigms aimed at improving documentation speed and diagnostic accuracy in health centers.',
    highlights: [
      'Engineered intelligent triage assistance and structured symptom parsing models',
      'Designed local-first architecture ensuring uninterrupted clinic operation during outages',
      'Demonstrated practical integration with standardized health information formats'
    ]
  },
  {
    recordNumber: 'RECORD 03',
    title: 'Jano Health',
    organization: 'Independent Healthcare Initiative',
    recognition: 'Founder & Primary Systems Builder',
    year: '2024 — Present',
    summary:
      'Founded and engineered Jano Health from ground up: conceptualizing, architecting, and developing an AI-enabled, offline-first clinical electronic health records platform.',
    highlights: [
      'Authored end-to-end full-stack codebase across Python, Django, PostgreSQL, and React',
      'Implemented conflict-resilient data synchronization for remote field devices',
      'Designed user interface tailored to high-pressure clinical triage environments'
    ]
  }
];
