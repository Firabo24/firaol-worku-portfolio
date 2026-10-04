export interface EngineeringPhase {
  id: string;
  phaseNumber: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  focusAreas: string[];
}

export const engineeringPhases: EngineeringPhase[] = [
  {
    id: 'phase-01',
    phaseNumber: 'PHASE 01',
    name: 'Foundation',
    tagline: 'Self-Taught Development & Programming Fundamentals',
    description:
      'Began the engineering journey through rigorous self-directed study, mastering core programming concepts, computational logic, object-oriented paradigms, and web standards from first principles.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'C++'],
    focusAreas: [
      'Core algorithmic thinking and data structure implementations',
      'Fundamental web document object models and responsive layouts',
      'Scripting automation and CLI utilities in Python',
      'Internalizing software engineering design patterns through hands-on building'
    ]
  },
  {
    id: 'phase-02',
    phaseNumber: 'PHASE 02',
    name: 'Systems / Full-Stack Engineering',
    tagline: 'Modern Web Architectures & Relational Data',
    description:
      'Scaled up to architecting full-stack web applications, integrating declarative React and Next.js frontends with robust Python/Django backends and relational PostgreSQL storage.',
    technologies: ['React', 'Next.js', 'Django', 'REST APIs', 'PostgreSQL'],
    focusAreas: [
      'Designing clean, authenticated RESTful API endpoints and serializers',
      'Relational database modeling, migrations, and query indexing in PostgreSQL',
      'State management, component lifecycles, and client rendering optimization',
      'Deploying integrated full-stack web services'
    ]
  },
  {
    id: 'phase-03',
    phaseNumber: 'PHASE 03',
    name: 'Intelligence',
    tagline: 'Applied Artificial Intelligence & Machine Learning',
    description:
      'Expanded into machine learning and neural architectures, developing deep models, automated classification pipelines, and structured language model systems.',
    technologies: ['Python', 'Machine Learning', 'Deep Learning', 'AI Systems', 'LLMs'],
    focusAreas: [
      'Implementing supervised and unsupervised ML models in Python',
      'Neural network architectures and deep learning foundations',
      'Deterministic prompting, structured output enforcement, and tool execution in LLMs',
      'Evaluating models against ground-truth validation metrics'
    ]
  },
  {
    id: 'phase-04',
    phaseNumber: 'PHASE 04',
    name: 'HealthTech',
    tagline: 'Clinical Systems & Offline EHR Architecture',
    description:
      'Synthesized full-stack systems and clinical intelligence to build Jano Health: an AI-enabled, offline-first electronic health records platform designed for resource-constrained clinics.',
    technologies: ['Jano Health', 'EHR', 'FHIR', 'Clinical AI', 'Django', 'PostgreSQL'],
    focusAreas: [
      'Engineering conflict-resilient offline data replication for intermittent clinic connectivity',
      'Structuring healthcare data using HL7 / FHIR standard representations',
      'Integrating clinical AI to assist with patient intake summarization and triage',
      'Validating system viability in simulated low-infrastructure clinic environments'
    ]
  },
  {
    id: 'phase-05',
    phaseNumber: 'PHASE 05',
    name: 'Orbit OS',
    tagline: 'Spatial Personal Operating System & UI Systems',
    description:
      'Conceived and engineered ORBIT OS as an interactive digital operating system that unifies personal projects, technical competencies, verified archives, and terminal shell into an immersive spatial interface.',
    technologies: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'UI/UX'],
    focusAreas: [
      'Designing a multi-window manager with z-index focus, minimization, and maximization',
      'Implementing an orbital coordinate plane with responsive radial viewport math',
      'Synthesizing tactile Web Audio feedback and keyboard navigation',
      'Refining an anti-slop visual identity using obsidian space and restrained cyan accents'
    ]
  }
];
