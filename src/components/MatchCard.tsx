import { Match } from '@/types/match';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, Shield, Target } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const { homeTeam, awayTeam, league, datetime, prediction } = match;
  
  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const { date, time } = formatDateTime(datetime);

  const getSafetyColor = (rating: string) => {
    switch (rating) {
      case 'safe': return 'safe';
      case 'medium': return 'medium';
      case 'risky': return 'risky';
      default: return 'medium';
    }
  };

  const getOutcomeText = (outcome: string) => {
    switch (outcome) {
      case 'home': return homeTeam.shortName;
      case 'away': return awayTeam.shortName;
      case 'draw': return 'Draw';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{league}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{date} • {time}</span>
            </div>
          </div>
          <Badge variant={getSafetyColor(prediction.safetyRating) as any}>
            <Shield className="w-3 h-3 mr-1" />
            {prediction.safetyRating.toUpperCase()}
          </Badge>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{homeTeam.shortName}</h3>
            <p className="text-sm text-muted-foreground">{homeTeam.name}</p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-xs">
                Form: {homeTeam.form}
              </Badge>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-muted-foreground">VS</p>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{awayTeam.shortName}</h3>
            <p className="text-sm text-muted-foreground">{awayTeam.name}</p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-xs">
                Form: {awayTeam.form}
              </Badge>
            </div>
          </div>
        </div>

        {/* Prediction */}
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="font-medium">Prediction:</span>
              <Badge variant="default">{getOutcomeText(prediction.outcome)}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-medium">{prediction.confidence}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence Level</span>
              <span className="font-medium">{prediction.confidence}%</span>
            </div>
            <Progress value={prediction.confidence} className="h-2" />
          </div>
        </div>

        {/* Odds */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Home Win</p>
            <p className="font-bold text-lg">{prediction.odds.home}</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Draw</p>
            <p className="font-bold text-lg">{prediction.odds.draw}</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Away Win</p>
            <p className="font-bold text-lg">{prediction.odds.away}</p>
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Betting Tips:</h4>
          <div className="flex flex-wrap gap-2">
            {prediction.tips.map((tip, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tip}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};