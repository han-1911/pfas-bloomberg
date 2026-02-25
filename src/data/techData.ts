export type TechCategory = 'Separation' | 'Destruction' | 'Emerging';

export interface Technology {
  name: string;
  shortName: string;
  category: TechCategory;
  trl: number;
  effectivenessMin: number;
  effectivenessMax: number;
  costPer1000Gal: string;
  applicablePFAS: string;
}

export const technologies: Technology[] = [
  // Separation
  {
    name: 'Granular Activated Carbon',
    shortName: 'GAC',
    category: 'Separation',
    trl: 9,
    effectivenessMin: 85,
    effectivenessMax: 99,
    costPer1000Gal: '$2–8',
    applicablePFAS: 'Long-chain PFCA/PFSA',
  },
  {
    name: 'Ion Exchange',
    shortName: 'IX',
    category: 'Separation',
    trl: 9,
    effectivenessMin: 90,
    effectivenessMax: 99,
    costPer1000Gal: '$3–12',
    applicablePFAS: 'PFCA, PFSA, some short-chain',
  },
  {
    name: 'Membrane (NF/RO)',
    shortName: 'NF/RO',
    category: 'Separation',
    trl: 9,
    effectivenessMin: 95,
    effectivenessMax: 99.9,
    costPer1000Gal: '$5–20',
    applicablePFAS: 'Broad spectrum PFAS',
  },
  // Destruction
  {
    name: 'Electrochemical Oxidation',
    shortName: 'EO',
    category: 'Destruction',
    trl: 7,
    effectivenessMin: 80,
    effectivenessMax: 99,
    costPer1000Gal: '$10–50',
    applicablePFAS: 'PFCA, some PFSA',
  },
  {
    name: 'UV/Sulfite Reduction',
    shortName: 'UV/S',
    category: 'Destruction',
    trl: 5,
    effectivenessMin: 70,
    effectivenessMax: 95,
    costPer1000Gal: '$15–60',
    applicablePFAS: 'PFCA preferred',
  },
  {
    name: 'Supercritical Water Oxidation',
    shortName: 'SCWO',
    category: 'Destruction',
    trl: 7,
    effectivenessMin: 95,
    effectivenessMax: 99.99,
    costPer1000Gal: '$20–80',
    applicablePFAS: 'Broad spectrum',
  },
  {
    name: 'High-Temp Incineration',
    shortName: 'HT-INC',
    category: 'Destruction',
    trl: 8,
    effectivenessMin: 90,
    effectivenessMax: 99.99,
    costPer1000Gal: '$30–100',
    applicablePFAS: 'All PFAS (concentrated)',
  },
  {
    name: 'Sonochemical Degradation',
    shortName: 'SONO',
    category: 'Destruction',
    trl: 4,
    effectivenessMin: 60,
    effectivenessMax: 90,
    costPer1000Gal: '$25–70',
    applicablePFAS: 'PFOS, PFOA, some short-chain',
  },
  // Emerging
  {
    name: 'Photocatalysis',
    shortName: 'PHOTO',
    category: 'Emerging',
    trl: 3,
    effectivenessMin: 50,
    effectivenessMax: 85,
    costPer1000Gal: '$20–80',
    applicablePFAS: 'PFCA primarily',
  },
  {
    name: 'Plasma Treatment',
    shortName: 'PLASMA',
    category: 'Emerging',
    trl: 4,
    effectivenessMin: 70,
    effectivenessMax: 95,
    costPer1000Gal: '$30–90',
    applicablePFAS: 'Broad spectrum',
  },
  {
    name: 'Bioremediation',
    shortName: 'BIO',
    category: 'Emerging',
    trl: 2,
    effectivenessMin: 20,
    effectivenessMax: 60,
    costPer1000Gal: '$1–5',
    applicablePFAS: 'Limited, fluorotelomers',
  },
  {
    name: 'Mechanochemical',
    shortName: 'MECH',
    category: 'Emerging',
    trl: 5,
    effectivenessMin: 85,
    effectivenessMax: 99,
    costPer1000Gal: '$15–50',
    applicablePFAS: 'Broad spectrum (solids)',
  },
];
