import { WindowId } from '@/providers/WindowProvider';

export interface OrbitNodeConfig {
  id: WindowId;
  label: string;
  codename: string;
  shortcut: string;
  badge: string;
  domain: string;
  description: string;
  angleDeg: number; // Angle around core in degrees (-90 is top)
  radiusMultiplier: number;
}

export const ORBIT_NODES: OrbitNodeConfig[] = [
  {
    id: 'mission-control',
    label: 'MISSIONS',
    codename: 'NODE-01 // OPS',
    shortcut: '1',
    badge: '3 ACTIVE',
    domain: 'PROJECTS & MISSIONS',
    description: 'Jano Health, Anchor Health, Orbit OS architectures',
    angleDeg: -90,
    radiusMultiplier: 1.0
  },
  {
    id: 'knowledge-matrix',
    label: 'KNOWLEDGE',
    codename: 'NODE-02 // MTX',
    shortcut: '2',
    badge: '4 DOMAINS',
    domain: 'ENGINEERING & AI',
    description: 'Distributed systems, ML/RAG, HealthTech & UI/UX',
    angleDeg: -18,
    radiusMultiplier: 1.0
  },
  {
    id: 'achievement-vault',
    label: 'ACHIEVEMENTS',
    codename: 'NODE-03 // VLT',
    shortcut: '3',
    badge: '3 RECORDS',
    domain: 'ARCHIVAL RECORDS',
    description: 'Harvard HSIL, AI Health Innovation, Jano Health',
    angleDeg: 54,
    radiusMultiplier: 1.0
  },
  {
    id: 'engineering-log',
    label: 'ENGINEERING',
    codename: 'NODE-04 // LOG',
    shortcut: '4',
    badge: '5 PHASES',
    domain: 'SYSTEMS CHRONOLOGY',
    description: 'Foundation, systems, intelligence, healthtech journey',
    angleDeg: 126,
    radiusMultiplier: 1.0
  },
  {
    id: 'terminal',
    label: 'TERMINAL',
    codename: 'NODE-05 // SH',
    shortcut: '5',
    badge: 'v3.2 SH',
    domain: 'INTERACTIVE CLI',
    description: 'Direct system queries, telemetry inspection & shell',
    angleDeg: 198,
    radiusMultiplier: 1.0
  }
];
