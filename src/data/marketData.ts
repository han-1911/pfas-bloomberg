export interface CompanyTicker {
  symbol: string;
  name: string;
  segment: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

export const marketSize = {
  current: 23.2,
  projected2030: 41.5,
  cagr: 12.8,
  unit: 'B',
};

export const marketSegments = [
  { name: 'Remediation', value: 38, color: '#00d26a' },
  { name: 'Monitoring', value: 24, color: '#00bfff' },
  { name: 'Filtration', value: 22, color: '#ffb700' },
  { name: 'Destruction', value: 16, color: '#ff6600' },
];

function generateSparkline(base: number, volatility: number): number[] {
  const points: number[] = [];
  let val = base;
  for (let i = 0; i < 20; i++) {
    val += (Math.random() - 0.48) * volatility;
    points.push(Number(val.toFixed(2)));
  }
  return points;
}

export const companies: CompanyTicker[] = [
  // Treatment/Remediation
  { symbol: 'ACM', name: 'AECOM', segment: 'Treatment', price: 98.42, change: 1.23, changePercent: 1.27, sparkline: generateSparkline(98, 2) },
  { symbol: 'J', name: 'Jacobs Solutions', segment: 'Treatment', price: 142.15, change: -0.87, changePercent: -0.61, sparkline: generateSparkline(142, 3) },
  { symbol: 'VEOEY', name: 'Veolia Environ.', segment: 'Treatment', price: 32.78, change: 0.45, changePercent: 1.39, sparkline: generateSparkline(33, 1) },
  { symbol: 'XYL', name: 'Xylem Inc', segment: 'Treatment', price: 127.53, change: 2.31, changePercent: 1.84, sparkline: generateSparkline(128, 3) },
  // Filtration/Materials
  { symbol: 'MMM', name: '3M Company', segment: 'Materials', price: 105.67, change: -2.14, changePercent: -1.99, sparkline: generateSparkline(106, 4) },
  { symbol: 'CC', name: 'Chemours Co', segment: 'Materials', price: 22.34, change: -0.56, changePercent: -2.45, sparkline: generateSparkline(22, 1.5) },
  { symbol: 'DHR', name: 'Danaher Corp', segment: 'Materials', price: 253.89, change: 3.42, changePercent: 1.37, sparkline: generateSparkline(254, 5) },
  // Analytics/Testing
  { symbol: 'SGSEY', name: 'SGS SA', segment: 'Analytics', price: 94.12, change: 0.78, changePercent: 0.84, sparkline: generateSparkline(94, 2) },
  { symbol: 'ERFSF', name: 'Eurofins Sci.', segment: 'Analytics', price: 58.93, change: 1.12, changePercent: 1.94, sparkline: generateSparkline(59, 2) },
  { symbol: 'IDXX', name: 'IDEXX Labs', segment: 'Analytics', price: 487.21, change: -4.33, changePercent: -0.88, sparkline: generateSparkline(487, 8) },
];
