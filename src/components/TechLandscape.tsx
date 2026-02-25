import { technologies, type TechCategory } from '../data/techData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const categoryColors: Record<TechCategory, string> = {
  Separation: '#00d26a',
  Destruction: '#ff6600',
  Emerging: '#00bfff',
};

function TRLBar({ trl }: { trl: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-px">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-3 rounded-sm ${
              i < trl
                ? trl >= 7 ? 'bg-bloomberg-green' : trl >= 4 ? 'bg-bloomberg-amber' : 'bg-bloomberg-red'
                : 'bg-bloomberg-border'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] text-bloomberg-muted w-4">{trl}</span>
    </div>
  );
}

export default function TechLandscape() {
  const chartData = technologies.map(t => ({
    name: t.shortName,
    trl: t.trl,
    category: t.category,
  }));

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="text-bloomberg-green">🔬 Technology Landscape</span>
        <div className="flex gap-2 text-[10px]">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {/* TRL Bar Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#666' }} axisLine={{ stroke: '#2a2a2a' }} tickLine={false} />
              <YAxis domain={[0, 9]} tick={{ fontSize: 9, fill: '#666' }} axisLine={{ stroke: '#2a2a2a' }} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', fontSize: '11px', fontFamily: 'monospace' }}
                itemStyle={{ color: '#ccc' }}
              />
              <Bar dataKey="trl" radius={[2, 2, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={categoryColors[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tech Table */}
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th>Technology</th>
                <th>Cat.</th>
                <th>TRL</th>
                <th>Eff. %</th>
                <th>$/1K gal</th>
                <th>Applicable PFAS</th>
              </tr>
            </thead>
            <tbody>
              {technologies.map(t => (
                <tr key={t.shortName} className="hover:bg-bloomberg-header/30">
                  <td className="font-medium text-bloomberg-text">
                    <span className="text-bloomberg-cyan">{t.shortName}</span>
                    <span className="text-bloomberg-muted ml-1 text-[10px]">{t.name !== t.shortName ? t.name : ''}</span>
                  </td>
                  <td>
                    <span className="px-1 py-0.5 rounded text-[10px]" style={{ color: categoryColors[t.category] }}>
                      {t.category}
                    </span>
                  </td>
                  <td><TRLBar trl={t.trl} /></td>
                  <td className="tabular-nums text-bloomberg-text">{t.effectivenessMin}–{t.effectivenessMax}%</td>
                  <td className="tabular-nums text-bloomberg-amber">{t.costPer1000Gal}</td>
                  <td className="text-bloomberg-muted text-[10px] max-w-[120px] truncate">{t.applicablePFAS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
