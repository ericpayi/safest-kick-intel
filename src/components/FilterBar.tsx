import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Shield } from 'lucide-react';
import { League } from '@/types/match';

interface FilterBarProps {
  selectedLeague: string;
  selectedSafety: string;
  onLeagueChange: (league: string) => void;
  onSafetyChange: (safety: string) => void;
  matchCounts: {
    total: number;
    safe: number;
    medium: number;
    risky: number;
  };
}

const leagues: League[] = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League'];

export const FilterBar = ({ 
  selectedLeague, 
  selectedSafety, 
  onLeagueChange, 
  onSafetyChange,
  matchCounts 
}: FilterBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <Trophy className="w-4 h-4 text-primary" />
            <Select value={selectedLeague} onValueChange={onLeagueChange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Leagues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leagues</SelectItem>
                {leagues.map((league) => (
                  <SelectItem key={league} value={league}>
                    {league}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <Shield className="w-4 h-4 text-primary" />
            <Select value={selectedSafety} onValueChange={onSafetyChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Safety Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Safety Levels</SelectItem>
                <SelectItem value="safe">Safe Bets Only</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="risky">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Next 3 Days</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="outline" className="flex items-center gap-1">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium">{matchCounts.total}</span>
        </Badge>
        <Badge variant="safe" className="flex items-center gap-1">
          <span>Safe:</span>
          <span className="font-medium">{matchCounts.safe}</span>
        </Badge>
        <Badge variant="medium" className="flex items-center gap-1">
          <span>Medium:</span>
          <span className="font-medium">{matchCounts.medium}</span>
        </Badge>
        <Badge variant="risky" className="flex items-center gap-1">
          <span>Risky:</span>
          <span className="font-medium">{matchCounts.risky}</span>
        </Badge>
      </div>
    </div>
  );
};