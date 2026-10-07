export interface PhaseDiagramStep {
  step: string;
  label: string;
  desc: string;
}

export interface PhaseArtifact {
  id: string;
  title: string;
  type: 'ARCHITECTURE MAP' | 'DATA FLOW' | 'CODE PATTERN';
  description: string;
  diagramSteps?: PhaseDiagramStep[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface PhaseDecision {
  id: string;
  problem: string;
  decision: string;
  why: string;
  result: string;
}

export interface PhaseLesson {
  principle: string;
  takeaway: string;
}

export interface EngineeringPhase {
  id: string;
  phaseNumber: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  focusAreas: string[];
  artifacts: PhaseArtifact[];
  decisions: PhaseDecision[];
  lessons: PhaseLesson[];
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
    ],
    artifacts: [
      {
        id: 'p1-art-1',
        title: 'Algorithmic Problem Decomposition Pipeline',
        type: 'DATA FLOW',
        description: 'First-principles mental workflow used to decompose complex tasks into deterministic data structures and primitive operations.',
        diagramSteps: [
          { step: '01', label: 'PROBLEM DEFINITION', desc: 'Identify core invariants, constraints, and edge boundary conditions' },
          { step: '02', label: 'DATA MODELING', desc: 'Select optimal primitive structures (arrays, hash tables, pointers)' },
          { step: '03', label: 'DETERMINISTIC LOGIC', desc: 'Implement core transformation loop with explicit state checks' },
          { step: '04', label: 'COMPLEXITY AUDIT', desc: 'Validate Big-O time and space bounds against target execution limits' }
        ]
      },
      {
        id: 'p1-art-2',
        title: 'Coordinate Bounds & Clamp Implementation',
        type: 'CODE PATTERN',
        description: 'Foundational primitive utility demonstrating mathematical coordinate clamping and boundary collision handling.',
        codeSnippet: {
          filename: 'geometry_bounds.cpp',
          language: 'cpp',
          code: `// Core mathematical bounds calculation
struct ViewportBounds {
    double minX, maxX;
    double minY, maxY;
};

struct Point2D {
    double x, y;
};

// Clamps a coordinate within strict viewport margins
Point2D clampToSafeMargin(Point2D pt, ViewportBounds bounds, double margin) {
    Point2D safe;
    safe.x = std::max(bounds.minX + margin, std::min(bounds.maxX - margin, pt.x));
    safe.y = std::max(bounds.minY + margin, std::min(bounds.maxY - margin, pt.y));
    return safe;
}`
        }
      }
    ],
    decisions: [
      {
        id: 'p1-dec-1',
        problem: 'Frameworks and high-level libraries abstract away underlying memory layouts, execution lifecycles, and computational complexity.',
        decision: 'Focus on foundational languages (C++ and Python) and algorithmic logic before adopting full-stack web frameworks.',
        why: 'Developing deep mechanical sympathy for memory, CPU execution, and data structures produces resilient engineering intuition that outlasts framework lifecycles.',
        result: 'Gained ability to debug low-level runtime bottlenecks, coordinate math errors, and data modeling issues without relying on external packages.'
      }
    ],
    lessons: [
      {
        principle: 'Master primitives before abstractions',
        takeaway: 'Frameworks come and go rapidly, but fundamental computational complexity, algorithmic decomposition, and memory awareness are permanent engineering skills.'
      },
      {
        principle: 'Self-directed builds breed genuine depth',
        takeaway: 'Constructing complete tools and utilities from scratch yields far deeper systems intuition than passive tutorial consumption.'
      }
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
    ],
    artifacts: [
      {
        id: 'p2-art-1',
        title: 'Full-Stack Request / Response Lifecycle',
        type: 'DATA FLOW',
        description: 'End-to-end data lifecycle from user action in the declarative client to relational persistence in PostgreSQL.',
        diagramSteps: [
          { step: '01', label: 'DECLARATIVE CLIENT', desc: 'React/Next.js UI dispatches typed API query with optimistic state update' },
          { step: '02', label: 'HTTP / TLS GATEWAY', desc: 'Authenticated REST request with Bearer JWT / CSRF token validation' },
          { step: '03', label: 'DJANGO SERIALIZER', desc: 'Strict payload validation, type coercion, and business constraint checks' },
          { step: '04', label: 'SERVICE TRANSACTION', desc: 'Atomic execution unit ensuring all entity changes succeed or rollback' },
          { step: '05', label: 'POSTGRESQL STORAGE', desc: 'Indexed table write with foreign key constraints and ACID guarantees' }
        ]
      },
      {
        id: 'p2-art-2',
        title: 'Atomic Transaction & Serializer Contract',
        type: 'CODE PATTERN',
        description: 'Django REST Framework pattern ensuring atomic database writes and deterministic response contracts.',
        codeSnippet: {
          filename: 'services/record_service.py',
          language: 'python',
          code: `from django.db import transaction
from rest_framework import serializers

class HealthRecordService:
    @staticmethod
    @transaction.atomic
    def persist_encounter(patient_id: str, encounter_data: dict) -> dict:
        """Atomically persist clinical encounter and audit journal."""
        # 1. Validate entity existence and role permissions
        patient = Patient.objects.select_for_update().get(id=patient_id)
        
        # 2. Persist primary encounter record
        encounter = Encounter.objects.create(
            patient=patient,
            encounter_type=encounter_data['type'],
            status='COMPLETED'
        )
        
        # 3. Create immutable audit journal entry
        AuditLog.objects.create(
            entity_id=str(encounter.id),
            action='ENCOUNTER_CREATED',
            checksum=generate_hash(encounter_data)
        )
        
        return {'status': 'SUCCESS', 'encounter_id': str(encounter.id)}`
        }
      }
    ],
    decisions: [
      {
        id: 'p2-dec-1',
        problem: 'Loose schema definitions and unvalidated API payloads cause silent data corruption and unexpected frontend client crashes.',
        decision: 'Enforce strict relational schemas in PostgreSQL with foreign key constraints and typed serializers on both ends of the wire.',
        why: 'The persistent data model is the ultimate source of truth; preserving database-level integrity prevents cascading failure modes across distributed clients.',
        result: 'Achieved predictable data consistency, seamless schema migrations, and eliminated state drift between frontend and backend.'
      }
    ],
    lessons: [
      {
        principle: 'Own the full stack',
        takeaway: 'Frontends are only as reliable as the underlying database contracts. Architects who understand relational integrity make vastly superior client-side design decisions.'
      },
      {
        principle: 'Transactions over optimistic assumptions',
        takeaway: 'Never assume multiple related records will succeed independently; always wrap multi-entity mutations in explicit atomic transactions.'
      }
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
    ],
    artifacts: [
      {
        id: 'p3-art-1',
        title: 'Edge Clinical NLP Triage Inference Pipeline',
        type: 'DATA FLOW',
        description: 'Deterministic ML inference pipeline transforming unstructured clinical symptom dictation into structured triage classifications.',
        diagramSteps: [
          { step: '01', label: 'INPUT TOKENIZATION', desc: 'Raw text normalization, symptom phrase extraction & stop-word filtering' },
          { step: '02', label: 'FEATURE EXTRACTION', desc: 'Vital sign extraction and embedding projection into medical semantic space' },
          { step: '03', label: 'CLASSIFICATION MODEL', desc: 'Triage prioritization classification across urgency tiers (Emergent, Urgent, Non-Urgent)' },
          { step: '04', label: 'SCHEMA VALIDATION', desc: 'Output forced into strict JSON format with confidence scoring and fallback bounds' }
        ]
      },
      {
        id: 'p3-art-2',
        title: 'Structured Schema Enforcement in Python',
        type: 'CODE PATTERN',
        description: 'Deterministic validation pattern ensuring machine learning and LLM outputs strictly adhere to application contracts.',
        codeSnippet: {
          filename: 'intelligence/triage_validator.py',
          language: 'python',
          code: `from typing import Dict, List, Literal
from pydantic import BaseModel, Field

class ClinicalTriagePayload(BaseModel):
    priority_level: Literal['EMERGENT', 'URGENT', 'ROUTINE']
    confidence_score: float = Field(ge=0.0, le=1.0)
    flagged_symptoms: List[str]
    suggested_icd10_codes: List[str]
    requires_immediate_physician: bool

def parse_model_inference(raw_prediction: Dict) -> ClinicalTriagePayload:
    """Enforce strict schema validation on AI model outputs."""
    try:
        validated = ClinicalTriagePayload(**raw_prediction)
        return validated
    except Exception as err:
        # Fallback to deterministic default safe protocol on parse anomaly
        return ClinicalTriagePayload(
            priority_level='URGENT',
            confidence_score=0.0,
            flagged_symptoms=['MANUAL_REVIEW_REQUIRED'],
            suggested_icd10_codes=[],
            requires_immediate_physician=True
        )`
        }
      }
    ],
    decisions: [
      {
        id: 'p3-dec-1',
        problem: 'General-purpose cloud LLMs are slow, non-deterministic, cost-prohibitive, and fail in offline clinical environments.',
        decision: 'Focus on focused, deterministic model pipelines with strict schema enforcement that can run assistive inference on local edge hardware.',
        why: 'In healthcare, predictability and availability exceed raw parameter counts; an AI system that drops offline during emergencies is useless.',
        result: 'Engineered responsive triage assistance that executes deterministically without mandatory cloud connectivity.'
      }
    ],
    lessons: [
      {
        principle: 'Assistive intelligence over autonomous black-boxes',
        takeaway: 'AI should provide structured acceleration and advisory triage to human experts, never make unvalidated autonomous decisions.'
      },
      {
        principle: 'Strict schema boundaries around probabilistic models',
        takeaway: 'Never pass unparsed probabilistic text directly into application state; always filter model outputs through rigorous type validators.'
      }
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
    ],
    artifacts: [
      {
        id: 'p4-art-1',
        title: 'Offline-First Clinical Continuity Topology',
        type: 'ARCHITECTURE MAP',
        description: 'Multi-device clinical architecture showing local-first autonomy with bidirectional upstream synchronization.',
        diagramSteps: [
          { step: '01', label: 'LOCAL INTAKE TERMINAL', desc: 'Clinician creates encounter and vitals in local SQLite edge replica' },
          { step: '02', label: 'FHIR SERIALIZATION', desc: 'Encounter serialized to HL7/FHIR JSON format with client-side UUID' },
          { step: '03', label: 'LOCAL COMMIT JOURNAL', desc: 'Transaction signed into append-only local journal with vector clock timestamp' },
          { step: '04', label: 'CONNECTIVITY RESTORED', desc: 'Replication daemon detects network restoration and pushes batch diffs' },
          { step: '05', label: 'CONFLICT RESOLUTION', desc: 'Three-way merge applies non-conflicting clinical encounters to central repository' }
        ]
      },
      {
        id: 'p4-art-2',
        title: 'FHIR Observation Resource Builder',
        type: 'CODE PATTERN',
        description: 'Production schema builder producing compliant HL7/FHIR R4 Observation resources from raw clinical encounters.',
        codeSnippet: {
          filename: 'fhir/observation_builder.ts',
          language: 'typescript',
          code: `interface ClinicalVitals {
  patientId: string;
  encounterId: string;
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  timestamp: string;
}

export function buildFHIRObservation(vitals: ClinicalVitals) {
  return {
    resourceType: 'Observation',
    id: crypto.randomUUID(),
    status: 'final',
    category: [
      {
        coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'vital-signs' }]
      }
    ],
    code: {
      coding: [{ system: 'http://loinc.org', code: '85354-9', display: 'Blood pressure panel' }]
    },
    subject: { reference: \`Patient/\${vitals.patientId}\` },
    encounter: { reference: \`Encounter/\${vitals.encounterId}\` },
    effectiveDateTime: vitals.timestamp,
    component: [
      {
        code: { coding: [{ system: 'http://loinc.org', code: '8480-6', display: 'Systolic blood pressure' }] },
        valueQuantity: { value: vitals.systolicBP, unit: 'mmHg' }
      },
      {
        code: { coding: [{ system: 'http://loinc.org', code: '8462-4', display: 'Diastolic blood pressure' }] },
        valueQuantity: { value: vitals.diastolicBP, unit: 'mmHg' }
      }
    ]
  };
}`
        }
      }
    ],
    decisions: [
      {
        id: 'p4-dec-1',
        problem: 'Traditional EHR architectures assume high-bandwidth continuous internet, causing total clinic failure during power blackouts.',
        decision: 'Build an offline-first local edge database architecture on each device using local persistence and vector-clock replication.',
        why: 'In healthcare, documentation failure can lead to catastrophic medical errors; system availability must be 100% independent of connectivity.',
        result: 'Guaranteed uninterrupted clinical intake and encounter logging during simulated regional power outages.'
      }
    ],
    lessons: [
      {
        principle: 'Design for failure modes first',
        takeaway: 'When engineering for emerging and infrastructure-limited markets, unstable connectivity is not an anomaly—it is the baseline reality.'
      },
      {
        principle: 'Standards prevent isolation',
        takeaway: 'Adopting HL7/FHIR interoperability models ensures that health records can be shared with regional hospitals without proprietary data lock-in.'
      }
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
    ],
    artifacts: [
      {
        id: 'p5-art-1',
        title: 'Spatial Orbital Geometry & Viewport Containment Engine',
        type: 'ARCHITECTURE MAP',
        description: 'Mathematical polar coordinate engine placing 5 symmetrical nodes at 72° angular offsets around a reactive central Core.',
        diagramSteps: [
          { step: '01', label: 'POLAR ORIGIN', desc: 'Exact center derived: cx = window.innerWidth / 2, cy = window.innerHeight / 2' },
          { step: '02', label: 'VIEWPORT CLEARANCE', desc: 'Safety bounds calculated: maxRTop (HUD), maxRBottom (Taskbar), maxRSide' },
          { step: '03', label: 'SAFE RADIUS CLAMP', desc: 'orbitRadius = Math.max(85, Math.min(idealRadius, maxSafeRadius * 0.96))' },
          { step: '04', label: 'TRIGONOMETRIC MAP', desc: 'Node coordinates computed: x = cx + R * cos(θ), y = cy + R * sin(θ)' },
          { step: '05', label: 'SVG VECTOR RAYS', desc: 'Direct connection lines and pulse packets drawn between Core and Nodes' }
        ]
      },
      {
        id: 'p5-art-2',
        title: 'Responsive Polar Math from OrbitDesktop.tsx',
        type: 'CODE PATTERN',
        description: 'Live production mathematical calculation guaranteeing zero orbital node clipping across any viewport width or height.',
        codeSnippet: {
          filename: 'components/orbit/desktop/OrbitDesktop.tsx',
          language: 'typescript',
          code: `// Real production coordinate calculation from ORBIT OS
const centerX = dimensions.width / 2;
const centerY = dimensions.height / 2;
const topClearance = isMobile ? 62 : 68;
const bottomClearance = 76;
const edgeMarginX = isMobile ? 12 : 24;

const nodeHalfW = isMobile ? 60 : isTablet ? 75 : 88;
const nodeHalfH = isMobile ? 18 : isTablet ? 22 : 24;

// 1. Top node boundary constraint (MISSIONS at angle -90°)
const maxRTop = Math.max(80, centerY - topClearance - nodeHalfH);

// 2. Bottom nodes boundary constraint (ACHIEVEMENTS at 54°, ENGINEERING at 126°)
const maxRBottom = Math.max(80, (dimensions.height - bottomClearance - centerY - nodeHalfH) / 0.809);

// 3. Side nodes boundary constraint (KNOWLEDGE at -18°, TERMINAL at 198°)
const maxRSide = Math.max(80, (centerX - edgeMarginX - nodeHalfW) / 0.951);

const maxSafeRadius = Math.min(maxRTop, maxRBottom, maxRSide);
const idealRadius = isMobile ? 120 : isTablet ? 195 : 245;
const orbitRadius = Math.max(85, Math.min(idealRadius, maxSafeRadius * 0.96));

// Compute exact trigonometric positions
const nodePositions = ORBIT_NODES.map((node) => {
  const rad = (node.angleDeg * Math.PI) / 180;
  const r = orbitRadius * (node.radiusMultiplier || 1.0);
  return {
    node,
    x: centerX + Math.cos(rad) * r,
    y: centerY + Math.sin(rad) * r
  };
});`
        }
      }
    ],
    decisions: [
      {
        id: 'p5-dec-1',
        problem: 'Traditional developer portfolios rely on linear scroll templates that fail to demonstrate actual spatial UX or systems architecture.',
        decision: 'Build an interactive client-side browser operating system with unified window management and radial polar geometry.',
        why: 'Demonstrating complex window management, audio synthesis, and mathematical coordinate mapping in a real running interface proves systems competence far better than static resume text.',
        result: 'Created a cohesive, memorable spatial portfolio platform running at 60fps with zero layout jitter.'
      },
      {
        id: 'p5-dec-2',
        problem: 'Multiple competing window states in child components caused z-index split-brain bugs and broken focus handoffs.',
        decision: 'Centralize all window states, layering, and boundary dragging into a single unified WindowProvider.',
        why: 'In an operating system interface, window focus and layering must be governed by an authoritative single source of truth.',
        result: 'Flawless window stacking, predictable drag constraints, and instantaneous taskbar synchronization.'
      }
    ],
    lessons: [
      {
        principle: 'Mathematical invariants eliminate UI jitter',
        takeaway: 'Deriving spatial interface positions from strict geometric formulas ensures absolute visual harmony across any screen aspect ratio.'
      },
      {
        principle: 'Procedural synthesis beats media bloat',
        takeaway: 'Synthesizing audio feedback directly with the Web Audio API delivers instant tactile response with zero media asset downloads.'
      }
    ]
  }
];
