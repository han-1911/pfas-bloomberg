export type Severity = 'final' | 'proposed' | 'guidance';
export type Jurisdiction = 'Federal' | 'State' | 'International';

export interface RegulatoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  severity: Severity;
  jurisdiction: Jurisdiction;
  source: string;
}

export const regulatoryEvents: RegulatoryEvent[] = [
  {
    id: 'r1',
    date: '2024-04-10',
    title: 'EPA Final MCL for PFOA/PFOS: 4 ppt',
    description: 'EPA establishes maximum contaminant levels for PFOA and PFOS at 4 parts per trillion in drinking water under the Safe Drinking Water Act.',
    severity: 'final',
    jurisdiction: 'Federal',
    source: 'EPA',
  },
  {
    id: 'r2',
    date: '2024-04-19',
    title: 'EPA CERCLA Superfund Designation for PFOA/PFOS',
    description: 'PFOA and PFOS designated as CERCLA hazardous substances, enabling federal cleanup actions and cost recovery.',
    severity: 'final',
    jurisdiction: 'Federal',
    source: 'EPA',
  },
  {
    id: 'r3',
    date: '2024-02-07',
    title: 'EU Universal PFAS Restriction Proposal',
    description: 'ECHA publishes universal restriction proposal covering ~10,000 PFAS substances. Broadest PFAS ban globally.',
    severity: 'proposed',
    jurisdiction: 'International',
    source: 'ECHA',
  },
  {
    id: 'r4',
    date: '2024-01-15',
    title: 'DOD PFAS Cleanup Mandate — NDAA FY2024',
    description: 'Department of Defense mandated to accelerate PFAS cleanup at 700+ military installations.',
    severity: 'final',
    jurisdiction: 'Federal',
    source: 'DOD',
  },
  {
    id: 'r5',
    date: '2023-12-01',
    title: 'California MCL: PFOA 4 ppt, PFOS 6.5 ppt',
    description: 'California adopts final MCLs for PFOA and PFOS in drinking water, among the strictest state-level standards.',
    severity: 'final',
    jurisdiction: 'State',
    source: 'CA SWRCB',
  },
  {
    id: 'r6',
    date: '2023-09-14',
    title: 'Michigan PFAS Standards — Part 201',
    description: 'Michigan DEQ finalizes cleanup criteria for 7 PFAS compounds under Part 201 Environmental Remediation Act.',
    severity: 'final',
    jurisdiction: 'State',
    source: 'MI EGLE',
  },
  {
    id: 'r7',
    date: '2023-06-15',
    title: 'New Jersey MCL: PFNA 13 ppt',
    description: 'New Jersey maintains strictest PFNA standard nationally at 13 ppt, pioneering individual PFAS regulation.',
    severity: 'final',
    jurisdiction: 'State',
    source: 'NJ DEP',
  },
  {
    id: 'r8',
    date: '2024-03-20',
    title: 'ITRC PFAS Guidance Update — Treatment Tech',
    description: 'Interstate Technology & Regulatory Council updates PFAS technical guidance for treatment technologies and site characterization.',
    severity: 'guidance',
    jurisdiction: 'Federal',
    source: 'ITRC',
  },
  {
    id: 'r9',
    date: '2024-05-01',
    title: 'Minnesota PFAS Drinking Water Standards',
    description: 'Minnesota Health Department proposes updated health-based values for 5 PFAS compounds in drinking water.',
    severity: 'proposed',
    jurisdiction: 'State',
    source: 'MN DOH',
  },
  {
    id: 'r10',
    date: '2024-06-01',
    title: 'EPA Proposed TSCA Reporting Rule — All PFAS',
    description: 'EPA proposes TSCA Section 8(a)(7) reporting rule requiring manufacturers to report all PFAS uses since 2011.',
    severity: 'proposed',
    jurisdiction: 'Federal',
    source: 'EPA',
  },
];
