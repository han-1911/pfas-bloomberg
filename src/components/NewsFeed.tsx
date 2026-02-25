import { newsItems } from '../data/newsData';

const severityStyles = {
  high: { badge: 'bg-bloomberg-red/20 text-bloomberg-red', dot: '●' },
  medium: { badge: 'bg-bloomberg-amber/20 text-bloomberg-amber', dot: '●' },
  low: { badge: 'bg-bloomberg-green/20 text-bloomberg-green', dot: '●' },
};

function timeAgo(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = now - then;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NewsFeed() {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="text-bloomberg-orange">📰 News & Intelligence</span>
        <span className="text-bloomberg-green text-[10px]">● LIVE</span>
      </div>

      <div className="flex-1 overflow-auto">
        {newsItems.map(item => {
          const sev = severityStyles[item.severity];
          return (
            <div
              key={item.id}
              className="px-3 py-2 border-b border-bloomberg-border/30 hover:bg-bloomberg-header/30 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[9px] ${sev.badge} px-1 py-0.5 rounded font-semibold`}>
                  {sev.dot} {item.severity.toUpperCase()}
                </span>
                <span className="text-[10px] text-bloomberg-cyan font-semibold">{item.source}</span>
                <span className="text-[10px] text-bloomberg-muted px-1 border border-bloomberg-border/50 rounded">
                  {item.category}
                </span>
                <span className="text-[10px] text-bloomberg-muted ml-auto">{timeAgo(item.timestamp)}</span>
              </div>
              <div className="text-xs text-bloomberg-text leading-snug">
                {item.headline}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
