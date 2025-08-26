import { Trophy, TrendingUp, BarChart3 } from 'lucide-react';
import { useWeeklyROI } from '@/hooks/useWeeklyROI';

export const Header = () => {
  const { roi, winRate, isPositive } = useWeeklyROI();
  
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SoccerPredict Pro</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Soccer Predictions</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-profit" />
              <span className="text-muted-foreground">Win Rate:</span>
              <span className="font-semibold text-profit">{winRate}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BarChart3 className={`w-4 h-4 ${isPositive ? 'text-profit' : 'text-destructive'}`} />
              <span className="text-muted-foreground">Weekly ROI:</span>
              <span className={`font-semibold ${isPositive ? 'text-profit' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{roi}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};