import { mclTrend, sitesIdentified, treatmentCostTrend, patentActivity } from '../data/analyticsData';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const tooltipStyle = {
  contentStyle: { background: '#1a1a1a', border: '1px solid #2a2a2a', fontSize: '10px', fontFamily: 'monospace' },
  itemStyle: { color: '#ccc', fontSize: '10px' },
};

function MiniChart({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-black/30 rounded border border-bloomberg-border/30 p-2">
      <div className="text-[10px] text-bloomberg-muted uppercase tracking-wider mb-1">{title}</div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AnalyticsTrends() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="text-bloomberg-cyan">📈 Analytics & Trends</span>
      </div>

      <div className="flex-1 overflow-auto p-3 grid grid-cols-2 gap-2">
        {/* MCL Stringency Trend */}
        <MiniChart title="MCL Stringency (ppt) → Stricter">
          <LineChart data={mclTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="year" tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} scale="log" domain={['auto', 'auto']} />
            <Tooltip {...tooltipStyle} />
            <Line type="stepAfter" dataKey="pfoa" stroke="#ff3b3b" strokeWidth={2} dot={{ r: 2 }} name="PFOA MCL" />
            <Line type="stepAfter" dataKey="pfos" stroke="#ff6600" strokeWidth={2} dot={{ r: 2 }} name="PFOS MCL" />
          </LineChart>
        </MiniChart>

        {/* Sites Identified */}
        <MiniChart title="PFAS Sites Identified (cumulative)">
          <AreaChart data={sitesIdentified}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="year" tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Area type="monotone" dataKey="sites" stroke="#00bfff" fill="#00bfff" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </MiniChart>

        {/* Treatment Cost Trends */}
        <MiniChart title="Treatment Cost ($/1K gal) → Declining">
          <LineChart data={treatmentCostTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="year" tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey="gac" stroke="#00d26a" strokeWidth={1.5} dot={false} name="GAC" />
            <Line type="monotone" dataKey="ix" stroke="#00bfff" strokeWidth={1.5} dot={false} name="IX" />
            <Line type="monotone" dataKey="nfro" stroke="#ffb700" strokeWidth={1.5} dot={false} name="NF/RO" />
            <Line type="monotone" dataKey="eo" stroke="#ff6600" strokeWidth={1.5} dot={false} name="EO" />
          </LineChart>
        </MiniChart>

        {/* Patent Activity */}
        <MiniChart title="PFAS Destruction Patents (annual)">
          <BarChart data={patentActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="year" tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 8, fill: '#666' }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="filings" fill="#00d26a" fillOpacity={0.7} radius={[2, 2, 0, 0]} />
          </BarChart>
        </MiniChart>
      </div>
    </div>
  );
}
