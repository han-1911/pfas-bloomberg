import { useState } from 'react';
import { regulatoryEvents, type Severity, type Jurisdiction } from '../data/regulatoryData';

const severityConfig: Record<Severity, { label: string; color: string; dot: string }> = {
  final: { label: 'Final Rule', color: 'text-bloomberg-red', dot: '🔴' },
  proposed: { label: 'Proposed', color: 'text-bloomberg-amber', dot: '🟡' },
  guidance: { label: 'Guidance', color: 'text-bloomberg-green', dot: '🟢' },
};

const jurisdictions: ('All' | Jurisdiction)[] = ['All', 'Federal', 'State', 'International'];

export default function RegulatoryTracker() {
  const [filter, setFilter] = useState<'All' | Jurisdiction>('All');

  const filtered = filter === 'All'
    ? regulatoryEvents
    : regulatoryEvents.filter(e => e.jurisdiction === filter);

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="text-bloomberg-amber">📜 Regulatory & Policy Tracker</span>
        <div className="flex gap-1">
          {jurisdictions.map(j => (
            <button
              key={j}
              onClick={() => setFilter(j)}
              className={`px-2 py-0.5 text-[10px] rounded border ${
                filter === j
                  ? 'border-bloomberg-cyan text-bloomberg-cyan bg-bloomberg-cyan/10'
                  : 'border-bloomberg-border text-bloomberg-muted hover:text-bloomberg-text'
              }`}
            >
              {j}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {sorted.map(event => {
          const sev = severityConfig[event.severity];
          return (
            <div
              key={event.id}
              className="px-3 py-2 border-b border-bloomberg-border/30 hover:bg-bloomberg-header/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px]">{sev.dot}</span>
                    <span className={`text-[10px] font-semibold ${sev.color}`}>{sev.label}</span>
                    <span className="text-[10px] text-bloomberg-muted px-1 border border-bloomberg-border rounded">
                      {event.jurisdiction}
                    </span>
                    <span className="text-[10px] text-bloomberg-muted">{event.source}</span>
                  </div>
                  <div className="text-xs text-bloomberg-text font-medium leading-snug">
                    {event.title}
                  </div>
                  <div className="text-[10px] text-bloomberg-muted mt-0.5 leading-snug">
                    {event.description}
                  </div>
                </div>
                <div className="text-[10px] text-bloomberg-muted whitespace-nowrap">
                  {event.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
