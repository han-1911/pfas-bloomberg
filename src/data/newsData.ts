export interface NewsItem {
  id: string;
  timestamp: string;
  source: string;
  headline: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    timestamp: '2024-06-14T14:32:00Z',
    source: 'Reuters',
    headline: '3M Begins $10.3B PFAS Settlement Payments to U.S. Water Utilities',
    severity: 'high',
    category: 'Settlement',
  },
  {
    id: 'n2',
    timestamp: '2024-06-14T12:15:00Z',
    source: 'EPA.gov',
    headline: 'EPA Orders Emergency Cleanup at Camp Lejeune PFAS Contamination Site',
    severity: 'high',
    category: 'Enforcement',
  },
  {
    id: 'n3',
    timestamp: '2024-06-13T18:45:00Z',
    source: 'Bloomberg',
    headline: 'DuPont/Chemours Agrees to $1.185B PFAS Water Contamination Settlement',
    severity: 'high',
    category: 'Settlement',
  },
  {
    id: 'n4',
    timestamp: '2024-06-13T15:20:00Z',
    source: 'Science Daily',
    headline: 'MIT Researchers Develop Novel Electrochemical Method for 99.9% PFAS Destruction',
    severity: 'medium',
    category: 'Technology',
  },
  {
    id: 'n5',
    timestamp: '2024-06-13T10:00:00Z',
    source: 'AP News',
    headline: 'Senate Passes Bipartisan PFAS Action Act — Moves to Reconciliation',
    severity: 'high',
    category: 'Legislative',
  },
  {
    id: 'n6',
    timestamp: '2024-06-12T16:30:00Z',
    source: 'Env. Monitor',
    headline: 'New PFAS Contamination Plume Discovered Near Indianapolis Aquifer',
    severity: 'medium',
    category: 'Contamination',
  },
  {
    id: 'n7',
    timestamp: '2024-06-12T09:00:00Z',
    source: 'ECHA',
    headline: 'European Chemicals Agency Receives 5,600 Comments on Universal PFAS Ban',
    severity: 'medium',
    category: 'Regulatory',
  },
  {
    id: 'n8',
    timestamp: '2024-06-11T14:00:00Z',
    source: 'DOD',
    headline: 'Pentagon Allocates $3.4B for PFAS Remediation at 328 Military Sites',
    severity: 'high',
    category: 'Enforcement',
  },
  {
    id: 'n9',
    timestamp: '2024-06-11T11:30:00Z',
    source: 'Nature',
    headline: 'Study: PFAS Found in 45% of U.S. Tap Water Samples — USGS Survey',
    severity: 'high',
    category: 'Contamination',
  },
  {
    id: 'n10',
    timestamp: '2024-06-10T08:45:00Z',
    source: 'WaterWorld',
    headline: 'Xylem Acquires Emerging PFAS Destruction Technology Startup for $240M',
    severity: 'medium',
    category: 'M&A',
  },
  {
    id: 'n11',
    timestamp: '2024-06-09T17:00:00Z',
    source: 'Reuters',
    headline: 'Australia Announces National PFAS Response Plan — $2.1B AUD Allocated',
    severity: 'medium',
    category: 'Regulatory',
  },
  {
    id: 'n12',
    timestamp: '2024-06-09T13:20:00Z',
    source: 'Env. Monitor',
    headline: 'PFAS Detected in Agricultural Runoff Across 12 Midwest States',
    severity: 'medium',
    category: 'Contamination',
  },
  {
    id: 'n13',
    timestamp: '2024-06-08T10:15:00Z',
    source: 'Patent Wire',
    headline: 'Patent Filings for PFAS Destruction Technologies Up 340% Since 2020',
    severity: 'low',
    category: 'Technology',
  },
  {
    id: 'n14',
    timestamp: '2024-06-07T15:45:00Z',
    source: 'CA EPA',
    headline: 'California Orders PFAS Testing for All Public Water Systems by 2025',
    severity: 'medium',
    category: 'Regulatory',
  },
];
