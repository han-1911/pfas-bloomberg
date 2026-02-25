import MarketOverview from './MarketOverview';
import RegulatoryTracker from './RegulatoryTracker';
import TechLandscape from './TechLandscape';
import PFASIntelligenceEngine from './PFASIntelligenceEngine';
import NewsFeed from './NewsFeed';
import AnalyticsTrends from './AnalyticsTrends';

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-hidden p-2">
      <div className="grid grid-cols-12 grid-rows-[1fr_1fr] gap-2 h-full">
        {/* Row 1 */}
        <div className="col-span-5 row-span-1 min-h-0">
          <MarketOverview />
        </div>
        <div className="col-span-3 row-span-1 min-h-0">
          <RegulatoryTracker />
        </div>
        <div className="col-span-4 row-span-1 min-h-0">
          <PFASIntelligenceEngine />
        </div>

        {/* Row 2 */}
        <div className="col-span-4 row-span-1 min-h-0">
          <TechLandscape />
        </div>
        <div className="col-span-3 row-span-1 min-h-0">
          <NewsFeed />
        </div>
        <div className="col-span-5 row-span-1 min-h-0">
          <AnalyticsTrends />
        </div>
      </div>
    </div>
  );
}
