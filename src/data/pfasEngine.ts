// ============================================================
// PFAS Material Intelligence Engine v1.0 — TypeScript Implementation
// Faithfully implements the YAML specification
// ============================================================

// --- Types ---

export interface PFASSpecies {
  name: string;
  concentration: number; // mg/L
  unit?: string;
}

export interface WaterMatrix {
  COD?: number;       // mg/L
  TOC?: number;       // mg/L
  NO3_asN?: number;   // mg/L as N
  NO2_asN?: number;   // mg/L as N
  NO3_ion?: number;   // mg/L as ion
  NO2_ion?: number;   // mg/L as ion
  UV254?: number;
  UVT254?: number;
  chloride?: number;  // mg/L
  fluoride?: number;  // mg/L
  hardness?: number;  // mg/L as CaCO3
  sampleColor?: string;
  precipitationIndicator?: boolean;
}

export interface EngineInput {
  species: PFASSpecies[];
  matrix: WaterMatrix;
  treatmentGoal?: string;
  sampleId?: string;
}

export type FlagClassification = 'CRITICAL' | 'COMMERCIAL' | 'TECHNICAL' | 'PATHWAY' | 'SPECIAL_HANDLING' | 'PROCEED';
export type OverallStatus = 'CRITICAL' | 'CONDITIONAL' | 'PROCEED';

export interface ReactivityFlag {
  ruleId: string;
  ruleName: string;
  classification: FlagClassification;
  message: string;
}

export interface MatrixResult {
  parameter: string;
  status: 'acceptable' | 'high' | 'manageable' | 'moderate' | 'concern' | 'missing';
  message: string;
}

export interface PrimarySpecies {
  name: string;
  concentration: number;
  percent: number;
  isTop5: boolean;
  isSecondary: boolean;
}

export interface M1Result {
  totalPFAS: number;
  primarySet: PrimarySpecies[];
  top5CumulativePercent: number;
  primarySetCoveragePercent: number;
  otherFractionPercent: number;
  multiSampleVariation?: number;
  operatingScenario: string;
}

export interface M2Result {
  flags: ReactivityFlag[];
  highestClassification: FlagClassification;
}

export interface M3Result {
  results: MatrixResult[];
  hasMissingRequired: boolean;
  hasHighMatrix: boolean;
}

export interface EngineOutput {
  m1: M1Result;
  m2: M2Result;
  m3: M3Result;
  overallStatus: OverallStatus;
  technicalSummary: string;
  businessEmailDraft: string;
}

// --- Unit Normalization ---

function normalizeToMgL(value: number, unit: string): number {
  const u = unit.toLowerCase().trim();
  if (u === 'mg/l' || u === 'ppm') return value;
  if (u === 'ug/l' || u === 'µg/l') return value / 1000;
  if (u === 'ng/l') return value / 1_000_000;
  return value; // assume mg/L
}

// --- Species Classification Helpers ---

const TFA_KEYWORDS = ['tfa', 'trifluoroacetic acid', 'trifluoroacetate', 'cf3cooh', 'cf3coo-', '76-05-1'];
const TFMS_KEYWORDS = ['tfms', 'trifluoromethanesulfonate', 'trifluoromethanesulfonic acid', 'triflate', 'cf3so3-', 'cf3so3h', '1493-13-6', '358-23-6'];
const PFESA_2PLUS2_KEYWORDS = ['perfluoro(2-ethoxyethane)sulfonic acid', 'perfluoro(2-ethoxyethane)sulfonate', '2+2 pfesa', '2:2 pfesa', '113507-82-7'];
const PFESA_2PLUS2_EXCLUDE = ['f-53b', '73606-19-6'];
const ETHER_CARBOXYLATE_KEYWORDS = ['hfpo-da', 'genx', 'adona', 'f-53b', '13252-13-6', '919005-14-4'];
const TELOMER_REGEX = /\b(\d+):(\d+)\s*(ftsa|ftca)\b/i;
const PFSA_KEYWORDS = ['pfos', 'pfbs', 'pfhxs', 'pfds', 'pfsa'];
const PFCA_KEYWORDS = ['pfoa', 'pfba', 'pfpa', 'pfhxa', 'pfhpa', 'pfna', 'pfda', 'pfunda', 'pfdoa', 'pftrdea', 'pfca'];

function matchesKeywords(name: string, keywords: string[]): boolean {
  const lower = name.toLowerCase();
  return keywords.some(k => lower.includes(k));
}

function isTFA(name: string): boolean { return matchesKeywords(name, TFA_KEYWORDS); }
function isTFMS(name: string): boolean { return matchesKeywords(name, TFMS_KEYWORDS); }
function isPFESA2plus2(name: string): boolean {
  const lower = name.toLowerCase();
  if (PFESA_2PLUS2_EXCLUDE.some(e => lower.includes(e))) return false;
  return matchesKeywords(name, PFESA_2PLUS2_KEYWORDS);
}
function isEtherCarboxylate(name: string): boolean { return matchesKeywords(name, ETHER_CARBOXYLATE_KEYWORDS); }
function isTelomer(name: string): { match: boolean; m?: number } {
  const r = TELOMER_REGEX.exec(name);
  if (r) return { match: true, m: parseInt(r[1]) };
  return { match: false };
}
function isPFSA(name: string): boolean { return matchesKeywords(name, PFSA_KEYWORDS); }
function isPFCA(name: string): boolean { return matchesKeywords(name, PFCA_KEYWORDS); }

// --- MODULE 1: PFAS Composition & Variability ---

function runM1(species: PFASSpecies[]): M1Result {
  // Normalize units
  const normalized = species.map(s => ({
    name: s.name,
    concentration: normalizeToMgL(s.concentration, s.unit || 'mg/L'),
  }));

  // Sort descending by concentration
  const sorted = [...normalized].sort((a, b) => b.concentration - a.concentration);

  // Total PFAS
  const totalPFAS = sorted.reduce((sum, s) => sum + s.concentration, 0);

  if (totalPFAS === 0) {
    return {
      totalPFAS: 0,
      primarySet: [],
      top5CumulativePercent: 0,
      primarySetCoveragePercent: 0,
      otherFractionPercent: 100,
      operatingScenario: 'No PFAS detected',
    };
  }

  // Compute species percent
  const withPercent = sorted.map(s => ({
    ...s,
    percent: (s.concentration / totalPFAS) * 100,
  }));

  // Top 5
  const top5 = withPercent.slice(0, 5);
  const top5CumulativePercent = top5.reduce((sum, s) => sum + s.percent, 0);

  // Secondary: >= 5% but not in top 5
  const secondarySpecies = withPercent.slice(5).filter(s => s.percent >= 5);

  // Primary Set = Top5 + secondary
  const primarySetNames = new Set([...top5.map(s => s.name), ...secondarySpecies.map(s => s.name)]);
  const primarySet: PrimarySpecies[] = withPercent
    .filter(s => primarySetNames.has(s.name))
    .map(s => ({
      name: s.name,
      concentration: s.concentration,
      percent: s.percent,
      isTop5: top5.some(t => t.name === s.name),
      isSecondary: secondarySpecies.some(sec => sec.name === s.name),
    }));

  const primarySetCoveragePercent = primarySet.reduce((sum, s) => sum + s.percent, 0);
  const otherFractionPercent = 100 - top5CumulativePercent;

  // Operating scenario
  let operatingScenario = 'Standard';
  if (totalPFAS > 50) operatingScenario = 'High concentration — extended treatment likely';
  else if (totalPFAS > 10) operatingScenario = 'Moderate concentration';
  else if (totalPFAS < 0.001) operatingScenario = 'Ultra-trace level';

  return {
    totalPFAS,
    primarySet,
    top5CumulativePercent,
    primarySetCoveragePercent,
    otherFractionPercent,
    operatingScenario,
  };
}

// --- MODULE 2: Reactivity Screening ---

function runM2(primarySet: PrimarySpecies[], totalPFAS: number, treatmentGoal?: string): M2Result {
  const flags: ReactivityFlag[] = [];
  const allNames = primarySet.map(s => s.name);
  const goalStr = treatmentGoal || '';

  // R1: TFMS Critical
  if (allNames.some(isTFMS) || isTFMS(goalStr)) {
    flags.push({
      ruleId: 'R1',
      ruleName: 'TFMS_Critical',
      classification: 'CRITICAL',
      message: 'TFMS detected. Technology cannot treat TFMS. Confirm whether TFMS is part of primary goal.',
    });
  }

  // R2: PFESA 2+2 Critical
  if (allNames.some(isPFESA2plus2) || isPFESA2plus2(goalStr)) {
    flags.push({
      ruleId: 'R2',
      ruleName: 'PFESA_2plus2_Critical',
      classification: 'CRITICAL',
      message: '2+2 PFESA detected. Technology cannot treat 2+2 PFESA. Confirm whether this is a primary goal.',
    });
  }

  // R3: TFA Commercial
  if (allNames.some(isTFA)) {
    flags.push({
      ruleId: 'R3',
      ruleName: 'TFA_Commercial',
      classification: 'COMMERCIAL',
      message: 'TFA detected. Highlight differentiated TFA capability.',
    });
  }

  // R4: PFSA Kinetics
  const pfsaFraction = primarySet
    .filter(s => isPFSA(s.name))
    .reduce((sum, s) => sum + s.percent, 0);
  if (pfsaFraction > 20) {
    flags.push({
      ruleId: 'R4',
      ruleName: 'PFSA_Kinetics',
      classification: 'TECHNICAL',
      message: `PFSA fraction >${Math.round(pfsaFraction)}% in Primary Set. Reaction rate may be impacted.`,
    });
  }

  // R5: Short Telomer Pathway
  for (const name of allNames) {
    const tel = isTelomer(name);
    if (tel.match && tel.m !== undefined && tel.m < 4) {
      flags.push({
        ruleId: 'R5',
        ruleName: 'Short_Telomer_Pathway',
        classification: 'PATHWAY',
        message: `Short fluorotelomer detected (${name}). Oxidation often preferred over reduction.`,
      });
      break;
    }
  }

  // R6: Ether Carboxylate Check
  if (allNames.some(isEtherCarboxylate) && !allNames.some(isPFESA2plus2)) {
    flags.push({
      ruleId: 'R6',
      ruleName: 'Ether_Carboxylate_Check',
      classification: 'SPECIAL_HANDLING',
      message: 'Ether PFAS (carboxylate) detected. No immediate composition-based concern.',
    });
  }

  // R99: Proceed Condition
  if (flags.length === 0) {
    const allPFCA = primarySet.every(s => isPFCA(s.name) || s.percent < 1);
    if (allPFCA && totalPFAS < 50) {
      flags.push({
        ruleId: 'R99',
        ruleName: 'Proceed_Condition',
        classification: 'PROCEED',
        message: 'No composition-based concern. Proceed.',
      });
    }
  }

  // Determine highest classification
  const priorityOrder: FlagClassification[] = ['CRITICAL', 'COMMERCIAL', 'TECHNICAL', 'PATHWAY', 'SPECIAL_HANDLING', 'PROCEED'];
  let highestClassification: FlagClassification = 'PROCEED';
  for (const p of priorityOrder) {
    if (flags.some(f => f.classification === p)) {
      highestClassification = p;
      break;
    }
  }

  return { flags, highestClassification };
}

// --- MODULE 3: Water Matrix Screening ---

function runM3(matrix: WaterMatrix): M3Result {
  const results: MatrixResult[] = [];
  let hasMissingRequired = false;
  let hasHighMatrix = false;

  // Convert nitrate/nitrite if provided as ion
  let NO3_mgL = matrix.NO3_ion;
  let NO2_mgL = matrix.NO2_ion;
  if (matrix.NO3_asN !== undefined) NO3_mgL = matrix.NO3_asN * 4.43;
  if (matrix.NO2_asN !== undefined) NO2_mgL = matrix.NO2_asN * 3.29;

  // M3_R1: Organics Check
  const hasCOD = matrix.COD !== undefined;
  const hasTOC = matrix.TOC !== undefined;
  if (!hasCOD && !hasTOC) {
    results.push({ parameter: 'Organics (COD/TOC)', status: 'missing', message: 'COD and TOC not provided. Cannot assess organic load.' });
    hasMissingRequired = true;
  } else {
    let organicsOk = true;
    if (hasCOD && matrix.COD! > 250) organicsOk = false;
    if (hasTOC && matrix.TOC! > 100) organicsOk = false;
    if (organicsOk) {
      results.push({ parameter: 'Organics (COD/TOC)', status: 'acceptable', message: `Organics within acceptable range.${hasCOD ? ` COD: ${matrix.COD} mg/L.` : ''}${hasTOC ? ` TOC: ${matrix.TOC} mg/L.` : ''}` });
    } else {
      results.push({ parameter: 'Organics (COD/TOC)', status: 'high', message: `Organic load high (${hasCOD ? `COD: ${matrix.COD}` : ''}${hasCOD && hasTOC ? ', ' : ''}${hasTOC ? `TOC: ${matrix.TOC}` : ''} mg/L). Pretreatment likely required. Extend project timeline to ~8 weeks.` });
      hasHighMatrix = true;
    }
  }

  // M3_R2: Nitrate/Nitrite Inhibition
  const hasNO3 = NO3_mgL !== undefined;
  const hasNO2 = NO2_mgL !== undefined;
  if (!hasNO3 && !hasNO2) {
    results.push({ parameter: 'Nitrate/Nitrite', status: 'missing', message: 'Nitrate and Nitrite not provided. Cannot assess inhibition risk.' });
    hasMissingRequired = true;
  } else {
    const worstCase = Math.max(NO3_mgL ?? 0, NO2_mgL ?? 0);
    if (worstCase < 1) {
      results.push({ parameter: 'Nitrate/Nitrite', status: 'manageable', message: `Competition impact manageable (worst case: ${worstCase.toFixed(2)} mg/L).` });
    } else if (worstCase <= 20) {
      results.push({ parameter: 'Nitrate/Nitrite', status: 'moderate', message: `Moderate inhibition (worst case: ${worstCase.toFixed(1)} mg/L). Adjust reagent ratio to overcome inhibition.` });
    } else {
      results.push({ parameter: 'Nitrate/Nitrite', status: 'high', message: `High nitrate/nitrite (${worstCase.toFixed(1)} mg/L). Pretreatment (e.g., electrochemical reduction) required.` });
      hasHighMatrix = true;
    }
  }

  // M3_R3: Chloride Corrosion
  if (matrix.chloride !== undefined) {
    if (matrix.chloride > 1000) {
      results.push({ parameter: 'Chloride', status: 'concern', message: `Chloride > 1000 mg/L (${matrix.chloride}). Engineering corrosion concern.` });
    } else {
      results.push({ parameter: 'Chloride', status: 'acceptable', message: `Chloride within range (${matrix.chloride} mg/L).` });
    }
  }

  // M3_R4: Fluoride TOF
  if (matrix.fluoride !== undefined) {
    if (matrix.fluoride > 100) {
      results.push({ parameter: 'Fluoride', status: 'concern', message: `Fluoride > 100 mg/L (${matrix.fluoride}). TOF quantification uncertainty likely increased.` });
    } else {
      results.push({ parameter: 'Fluoride', status: 'acceptable', message: `Fluoride within range (${matrix.fluoride} mg/L).` });
    }
  }

  // M3_R5: Hardness Precipitation
  if (matrix.hardness !== undefined) {
    if (matrix.hardness > 100) {
      results.push({ parameter: 'Hardness', status: 'concern', message: `Hardness > 100 ppm (${matrix.hardness}). Precipitation likely during caustic dosing.` });
    } else {
      results.push({ parameter: 'Hardness', status: 'acceptable', message: `Hardness within range (${matrix.hardness} ppm).` });
    }
  }

  return { results, hasMissingRequired, hasHighMatrix };
}

// --- PIPELINE ---

function generateTechnicalSummary(m1: M1Result, m2: M2Result, m3: M3Result, status: OverallStatus): string {
  let summary = `=== PFAS TREATABILITY PRE-FEASIBILITY SCREENING ===\n\n`;

  summary += `OVERALL STATUS: ${status}\n\n`;

  summary += `--- PFAS COMPOSITION (M1) ---\n`;
  summary += `Total PFAS: ${m1.totalPFAS.toFixed(4)} mg/L\n`;
  summary += `Operating Scenario: ${m1.operatingScenario}\n`;
  summary += `Top-5 Cumulative: ${m1.top5CumulativePercent.toFixed(1)}%\n`;
  summary += `Primary Set Coverage: ${m1.primarySetCoveragePercent.toFixed(1)}%\n\n`;
  summary += `Primary Set:\n`;
  for (const s of m1.primarySet) {
    summary += `  ${s.name}: ${s.concentration.toFixed(4)} mg/L (${s.percent.toFixed(1)}%)${s.isTop5 ? ' [Top5]' : ''}\n`;
  }
  summary += `\nOther Fraction: ${m1.otherFractionPercent.toFixed(1)}%\n\n`;

  summary += `--- REACTIVITY FLAGS (M2) ---\n`;
  if (m2.flags.length === 0) {
    summary += `No flags triggered.\n\n`;
  } else {
    for (const f of m2.flags) {
      summary += `[${f.classification}] ${f.ruleName}: ${f.message}\n`;
    }
    summary += `\n`;
  }

  summary += `--- WATER MATRIX (M3) ---\n`;
  for (const r of m3.results) {
    summary += `[${r.status.toUpperCase()}] ${r.parameter}: ${r.message}\n`;
  }

  return summary;
}

function generateBusinessEmail(m1: M1Result, m2: M2Result, m3: M3Result, status: OverallStatus): string {
  let email = `Subject: PFAS Pre-Feasibility Screening — ${status}\n\n`;
  email += `Hi team,\n\n`;
  email += `Here's a summary of the PFAS pre-feasibility screening:\n\n`;

  // Composition summary
  email += `PFAS Profile:\n`;
  email += `• Total PFAS: ${m1.totalPFAS.toFixed(4)} mg/L\n`;
  email += `• Primary species (${m1.primarySet.length}): ${m1.primarySet.map(s => s.name).join(', ')}\n`;
  email += `• Primary set covers ${m1.primarySetCoveragePercent.toFixed(0)}% of total\n\n`;

  // Flags
  const criticalFlags = m2.flags.filter(f => f.classification === 'CRITICAL');
  const otherFlags = m2.flags.filter(f => f.classification !== 'CRITICAL' && f.classification !== 'PROCEED');

  if (criticalFlags.length > 0) {
    email += `⚠️ Critical Issues:\n`;
    for (const f of criticalFlags) {
      email += `• ${f.message}\n`;
    }
    email += `\n`;
  }

  if (otherFlags.length > 0) {
    email += `Notes:\n`;
    for (const f of otherFlags) {
      email += `• ${f.message}\n`;
    }
    email += `\n`;
  }

  // Matrix
  const matrixIssues = m3.results.filter(r => r.status !== 'acceptable' && r.status !== 'manageable');
  if (matrixIssues.length > 0) {
    email += `Water Matrix Considerations:\n`;
    for (const r of matrixIssues) {
      email += `• ${r.message}\n`;
    }
    email += `\n`;
  }

  // Action items
  email += `Overall Assessment: ${status}\n\n`;
  email += `Next Steps:\n`;
  if (status === 'CRITICAL') {
    email += `• Confirm species identification and treatment goals before proceeding\n`;
    email += `• Additional consultation required for critical species\n`;
  } else if (status === 'CONDITIONAL') {
    email += `• Provide missing water quality data (COD/TOC, NO3/NO2) for complete assessment\n`;
    email += `• Address matrix concerns before finalizing treatment design\n`;
  } else {
    email += `• Proceed to detailed treatability study design\n`;
    email += `• Request bench-scale testing parameters\n`;
  }

  email += `\nBest regards`;
  return email;
}

// --- Main Engine Function ---

export function runPFASEngine(input: EngineInput): EngineOutput {
  // M1: Composition
  const m1 = runM1(input.species);

  // M2: Reactivity
  const m2 = runM2(m1.primarySet, m1.totalPFAS, input.treatmentGoal);

  // M3: Matrix
  const m3 = runM3(input.matrix);

  // Final Status Logic
  let overallStatus: OverallStatus = 'PROCEED';
  if (m2.flags.some(f => f.classification === 'CRITICAL')) {
    overallStatus = 'CRITICAL';
  } else if (m3.hasHighMatrix || m3.hasMissingRequired) {
    overallStatus = 'CONDITIONAL';
  }

  const technicalSummary = generateTechnicalSummary(m1, m2, m3, overallStatus);
  const businessEmailDraft = generateBusinessEmail(m1, m2, m3, overallStatus);

  return { m1, m2, m3, overallStatus, technicalSummary, businessEmailDraft };
}

// --- Demo Data for Initial Load ---

export const demoSpecies: PFASSpecies[] = [
  { name: 'PFOA', concentration: 0.0045, unit: 'mg/L' },
  { name: 'PFOS', concentration: 0.0032, unit: 'mg/L' },
  { name: 'PFHxS', concentration: 0.0018, unit: 'mg/L' },
  { name: 'PFBA', concentration: 0.0012, unit: 'mg/L' },
  { name: 'PFHxA', concentration: 0.0008, unit: 'mg/L' },
  { name: 'PFNA', concentration: 0.0004, unit: 'mg/L' },
  { name: 'PFDA', concentration: 0.0002, unit: 'mg/L' },
];

export const demoMatrix: WaterMatrix = {
  COD: 85,
  TOC: 32,
  NO3_asN: 3.2,
  NO2_asN: 0.05,
  chloride: 180,
  fluoride: 12,
  hardness: 220,
};
