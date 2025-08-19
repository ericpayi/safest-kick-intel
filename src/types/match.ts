export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  form: string; // Recent form like "WWLDW"
  position?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  datetime: string;
  prediction: {
    outcome: 'home' | 'away' | 'draw';
    confidence: number; // 0-100
    safetyRating: 'safe' | 'medium' | 'risky';
    odds: {
      home: number;
      draw: number;
      away: number;
    };
    tips: string[];
  };
  stats?: {
    homeTeamStats: {
      goalsScored: number;
      goalsConceded: number;
      wins: number;
      draws: number;
      losses: number;
    };
    awayTeamStats: {
      goalsScored: number;
      goalsConceded: number;
      wins: number;
      draws: number;
      losses: number;
    };
  };
}

export type League = 'Premier League' | 'La Liga' | 'Serie A' | 'Bundesliga' | 'Ligue 1' | 'Champions League';