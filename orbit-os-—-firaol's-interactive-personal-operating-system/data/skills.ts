export interface SkillDomain {
  id: string;
  name: string;
  codename: string;
  summary: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  practices: string[];
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    codename: 'DOMAIN // 01-SYS',
    summary:
      'Designing robust full-stack applications, resilient backend services, structured relational schemas, and interactive client runtimes.',
    capabilities: [
      {
        title: 'Full-Stack Architecture',
        description: 'Constructing performant web applications using Next.js and React on the frontend paired with Django and REST APIs on the backend.'
      },
      {
        title: 'Database & Data Modeling',
        description: 'Designing normalized relational schemas, transaction safety, and indexed queries in PostgreSQL.'
      },
      {
        title: 'Systems & Algorithmic Foundations',
        description: 'Low-level problem solving, memory awareness, and algorithmic complexity using C++ and Python.'
      }
    ],
    technologies: [
      'React',
      'Next.js',
      'Python',
      'Django',
      'PostgreSQL',
      'REST APIs',
      'HTML',
      'CSS',
      'C++'
    ],
    practices: [
      'Clean separation of business logic and presentation layers',
      'Strict API contract specification and error serialization',
      'Database migration integrity and schema versioning',
      'Modular component encapsulation and state locality'
    ]
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    codename: 'DOMAIN // 02-INT',
    summary:
      'Building practical AI workflows, machine learning models, deep learning architectures, and structured LLM integrations.',
    capabilities: [
      {
        title: 'Applied Machine Learning',
        description: 'Training and evaluating supervised and unsupervised learning algorithms for classification and predictive analysis in Python.'
      },
      {
        title: 'Deep Learning Architectures',
        description: 'Implementing neural network layers, loss functions, and optimization strategies for structured and sequential data.'
      },
      {
        title: 'LLM Systems & Integration',
        description: 'Developing deterministic prompt orchestration, structured tool execution, and context-augmented retrieval pipelines.'
      }
    ],
    technologies: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'AI Systems',
      'LLMs'
    ],
    practices: [
      'Deterministic output validation to prevent model hallucinations',
      'Systematic evaluation against ground-truth benchmarks',
      'Efficient token utilization and latency budget optimization',
      'Clear boundary between statistical inference and hard business logic'
    ]
  },
  {
    id: 'health-technology',
    name: 'Health Technology',
    codename: 'DOMAIN // 03-HLT',
    summary:
      'Engineering healthcare software architectures, clinical AI tools, standardized health data exchanges, and offline-first EHR systems.',
    capabilities: [
      {
        title: 'Electronic Health Records (EHR)',
        description: 'Architecting offline-first patient data capture, consultation documentation, and clinic workflow coordination.'
      },
      {
        title: 'Health Interoperability & Standards',
        description: 'Formatting medical telemetry and patient records according to HL7 / FHIR data specifications.'
      },
      {
        title: 'Clinical AI Workflows',
        description: 'Integrating assistive clinical intelligence for automated record summarization, medical coding, and triage assistance.'
      }
    ],
    technologies: [
      'EHR',
      'FHIR',
      'Clinical AI',
      'HealthTech'
    ],
    practices: [
      'Offline-first data resilience for resource-constrained clinic environments',
      'Tamper-evident audit logging for patient privacy and regulatory compliance',
      'Standardized schema definitions preserving diagnostic data semantics',
      'Defensive error handling in mission-critical medical workflows'
    ]
  },
  {
    id: 'product-uiux',
    name: 'Product & UI/UX',
    codename: 'DOMAIN // 04-EXP',
    summary:
      'Crafting cohesive design systems, rapid interactive prototypes, spatial interface paradigms, and human-centered digital experiences.',
    capabilities: [
      {
        title: 'Design Systems & Tokens',
        description: 'Establishing consistent typography, spacing math, color palettes, and reusable component tokens.'
      },
      {
        title: 'Prototyping & Interface Exploration',
        description: 'Translating product concepts into interactive tactile prototypes with high aesthetic intentionality in Figma.'
      },
      {
        title: 'Spatial & Operating System Paradigms',
        description: 'Designing unconventional, immersive interfaces like ORBIT OS that elevate personal technical portfolio presentation.'
      }
    ],
    technologies: [
      'UI/UX',
      'Figma',
      'Prototyping',
      'Design Systems'
    ],
    practices: [
      'Anti-slop restraint: avoiding generic neon dashboards and excessive pills',
      'Keyboard-accessible controls and clear spatial layout hierarchy',
      'WCAG AA/AAA legibility, visible focus rings, and high contrast standards',
      'Consistent design vocabulary propagated across all system modules'
    ]
  }
];
