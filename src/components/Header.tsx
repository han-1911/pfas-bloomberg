import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (n: number) => n.toString().padStart(2, '0');

  return (
    <header className="bg-bloomberg-header border-b border-bloomberg-border px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bloomberg-green animate-pulse" />
          <span className="text-bloomberg-green font-bold text-lg tracking-widest">
            PFAS BLOOMBERG
          </span>
        </div>
        <span className="text-bloomberg-muted text-xs">
          PFAS Market Intelligence Terminal v1.0
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-bloomberg-muted text-xs">MKT</span>
          <span className="text-bloomberg-green text-xs">● OPEN</span>
        </div>
        <div className="text-bloomberg-amber font-mono text-sm">
          {fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())}
        </div>
        <div className="text-bloomberg-muted text-xs">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </header>
  );
}
