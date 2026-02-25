import { companies, marketSize, marketSegments } from '../data/marketData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';

function Sparkline({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));
  const isUp = data[data.length - 1] >= data[0];
  return (
    <div className="w-16 h-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={isUp ? '#00d26a' : '#ff3b3b'}
            strokeWidth={1}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function MarketOverview() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="text-bloomberg-cyan">📊 Market Overview</span>
        <span className="text-bloomberg-muted">PFAS Remediation Market</span>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {/* Market Size Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-black/40 rounded p-2 border border-bloomberg-border/50">
            <div className="text-bloomberg-muted text-[10px] uppercase">Market Size</div>
            <div className="text-bloomberg-green text-lg font-bold">${marketSize.current}B</div>
          </div>
          <div className="bg-black/40 rounded p-2 border border-bloomberg-border/50">
            <div className="text-bloomberg-muted text-[10px] uppercase">2030 Proj.</div>
            <div className="text-bloomberg-cyan text-lg font-bold">${marketSize.projected2030}B</div>
          </div>
          <div className="bg-black/40 rounded p-2 border border-bloomberg-border/50">
            <div className="text-bloomberg-muted text-[10px] uppercase">CAGR</div>
            <div className="text-bloomberg-amber text-lg font-bold">{marketSize.cagr}%</div>
          </div>
        </div>

        {/* Segment Pie */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={38}
                  dataKey="value"
                  stroke="#0a0a0a"
                  strokeWidth={2}
                >
                  {marketSegments.map((seg, i) => (
                    <Cell key={i} fill={seg.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', fontSize: '11px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#ccc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-1 text-[10px]">
            {marketSegments.map((seg) => (
              <div key={seg.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm" style={{ background: seg.color }} />
                <span className="text-bloomberg-text">{seg.name}</span>
                <span className="text-bloomberg-muted">{seg.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Tickers */}
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">Chg%</th>
              <th>Chart</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.symbol} className="hover:bg-bloomberg-header/50">
                <td className="text-bloomberg-cyan font-semibold">{c.symbol}</td>
                <td className="text-bloomberg-text truncate max-w-[100px]">{c.name}</td>
                <td className="text-right tabular-nums">{c.price.toFixed(2)}</td>
                <td className={`text-right tabular-nums font-semibold ${c.changePercent >= 0 ? 'text-bloomberg-green' : 'text-bloomberg-red'}`}>
                  {c.changePercent >= 0 ? '+' : ''}{c.changePercent.toFixed(2)}%
                </td>
                <td><Sparkline data={c.sparkline} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
