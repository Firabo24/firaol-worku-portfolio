export interface ProfileDomain {
  name: string;
  focus: string;
  tech: string[];
}

export interface ProfileActiveSystem {
  id: string;
  name: string;
  role: string;
  status: string;
  summary: string;
}

export interface ContactTemplate {
  id: string;
  label: string;
  subject: string;
  body: string;
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  origin: string;
  shortBio: string;
  identityBio: string;
  mindset: {
    heading: string;
    description: string;
    principles: string[];
  };
  currentFocus: string[];
  domains: ProfileDomain[];
  activeSystems: ProfileActiveSystem[];
  contact: {
    email: string;
    github: string;
    githubHandle: string;
    telegram?: string;
    location: string;
    timezone: string;
    availability: string;
    responseExpectation: string;
    collaborationScope: string[];
    templates: ContactTemplate[];
  };
}

export const profileData: UserProfile = {
  name: 'Firaol Worku',
  title: 'Systems Builder & Software Engineer',
  tagline: 'AI • SOFTWARE • HEALTH TECHNOLOGY',
  origin: 'Ethiopia',
  shortBio:
    'Self-taught software engineer and systems builder focused on AI-enabled clinical systems, full-stack web platforms, and spatial user interfaces.',
  identityBio:
    'Firaol Worku is a self-taught programmer, software engineering practitioner, and health technology builder based in Ethiopia. Driven by curiosity and first-principles learning, he designs resilient distributed architectures, local-first healthcare systems, and spatial interfaces that bridge practical clinical needs with modern computing.',
  mindset: {
    heading: 'First-Principles Systems Engineering',
    description:
      'Technology creates genuine leverage when engineered for real-world constraints rather than ideal environments. My approach emphasizes full-stack ownership—from data model integrity and edge resilience to the tactile nuances of user interface design.',
    principles: [
      'Resilience over assumptions: Build software that survives intermittent connectivity and edge failures.',
      'Deep stack ownership: Master foundational languages, data structures, and runtime mechanics before abstractions.',
      'Clinical & human utility: Prioritize software that solves critical operational bottlenecks in underserved spaces.',
      'Tactile craftsmanship: Software should feel responsive, disciplined, and cohesive at every layer.'
    ]
  },
  currentFocus: [
    'Building offline-first electronic health record (EHR) systems with FHIR interoperability for resource-limited clinics (Jano Health)',
    'Developing provider-reconciled healthcare installment financing workflows (Anchor Health)',
    'Exploring spatial computing paradigms, reactive window managers, and in-browser operating system environments (Orbit OS)'
  ],
  domains: [
    {
      name: 'Software Engineering',
      focus: 'Distributed web platforms, robust REST APIs, relational schemas, and type-safe frontends.',
      tech: ['React', 'Next.js', 'Python', 'Django', 'PostgreSQL', 'TypeScript', 'REST APIs', 'C++']
    },
    {
      name: 'Artificial Intelligence',
      focus: 'Applied machine learning, deep learning models, clinical triage NLP, and LLM orchestration.',
      tech: ['Python', 'Machine Learning', 'Deep Learning', 'Clinical NLP', 'LLM Systems']
    },
    {
      name: 'Health Technology',
      focus: 'Offline-first electronic health records, FHIR standards, clinical workflows, and data security.',
      tech: ['EHR Architecture', 'HL7 / FHIR', 'Clinical AI', 'Data Security', 'Edge Persistence']
    },
    {
      name: 'Product & UI/UX',
      focus: 'Spatial interface design, design systems, ergonomic component architecture, and tactile feedback.',
      tech: ['UI/UX Design', 'Figma', 'Design Systems', 'Motion', 'Web Audio Telemetry']
    }
  ],
  activeSystems: [
    {
      id: 'jano-health',
      name: 'Jano Health',
      role: 'Founder & Systems Architect',
      status: 'MVP / Active Build',
      summary:
        'AI-enabled, offline-first electronic health record (EHR) engineered for resource-constrained clinical environments.'
    },
    {
      id: 'anchor-health',
      name: 'Anchor Health',
      role: 'Full-Stack & Fintech Engineer',
      status: 'Concept & Architecture',
      summary:
        'Healthcare financing platform operating on a "Get Treated Now, Pay Later" model for acute clinic care.'
    },
    {
      id: 'orbit-os',
      name: 'Orbit OS',
      role: 'Creator & UI/UX Architect',
      status: 'Active System / Prototype',
      summary:
        'Interactive personal operating system and spatial portfolio environment running client-side in the browser.'
    }
  ],
  contact: {
    email: 'tioboss34@gmail.com',
    github: 'https://github.com/firaol-dev',
    githubHandle: 'firaol-dev',
    location: 'Ethiopia',
    timezone: 'East Africa Time (EAT // UTC+3)',
    availability: 'Open to high-impact health technology engineering, systems architecture, and distributed systems collaborations.',
    responseExpectation: 'Direct asynchronous review — typical response within 24 to 48 hours for engineering inquiries and technical discussions.',
    collaborationScope: [
      'Offline-First & Local-First Clinical Architectures',
      'Full-Stack Systems & Distributed Application Engineering',
      'Clinical NLP & Healthcare AI Infrastructure',
      'Ergonomic Spatial Interfaces & Interactive Web Paradigms'
    ],
    templates: [
      {
        id: 'engineering',
        label: 'Engineering / Architecture Discussion',
        subject: 'Engineering & Systems Inquiry // Firaol Worku',
        body: 'Hi Firaol,\n\nI reviewed your work on ORBIT OS / Jano Health and would like to discuss engineering opportunities and architectural collaboration regarding [Topic/Project].\n\nBest regards,\n[Your Name]\n[Organization / Link]'
      },
      {
        id: 'healthtech',
        label: 'HealthTech / Clinical Collaboration',
        subject: 'Healthcare Technology & Clinical Systems Discussion',
        body: 'Hi Firaol,\n\nI came across your work in offline-first EHR systems and clinical workflow automation. I would like to connect regarding [Initiative/Clinic Problem/Research].\n\nBest regards,\n[Your Name]\n[Organization / Location]'
      },
      {
        id: 'general',
        label: 'General Technical Inquiry',
        subject: 'Technical Inquiry / Connection // ORBIT OS',
        body: 'Hi Firaol,\n\nReaching out directly via ORBIT OS regarding [Inquiry / Code Review / Opportunity].\n\nBest regards,\n[Your Name]'
      }
    ]
  }
};
