import { Match } from '@/types/match';

export const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: {
      id: 'mc',
      name: 'Manchester City',
      shortName: 'MCI',
      form: 'WWWDW',
      position: 1,
    },
    awayTeam: {
      id: 'liv',
      name: 'Liverpool',
      shortName: 'LIV',
      form: 'WWLWW',
      position: 2,
    },
    league: 'Premier League',
    datetime: '2024-01-20T15:00:00Z',
    prediction: {
      outcome: 'home',
      confidence: 78,
      safetyRating: 'medium',
      scorePrediction: {
        homeScore: 2,
        awayScore: 1
      },
      odds: {
        home: 2.10,
        draw: 3.40,
        away: 3.20,
      },
      tips: ['Strong home record', 'Both teams to score likely', 'Over 2.5 goals recommended'],
    },
    stats: {
      homeTeamStats: {
        goalsScored: 45,
        goalsConceded: 18,
        wins: 14,
        draws: 4,
        losses: 2,
      },
      awayTeamStats: {
        goalsScored: 42,
        goalsConceded: 22,
        wins: 13,
        draws: 3,
        losses: 4,
      },
    },
  },
  {
    id: '2',
    homeTeam: {
      id: 'ars',
      name: 'Arsenal',
      shortName: 'ARS',
      form: 'WDWWL',
      position: 3,
    },
    awayTeam: {
      id: 'che',
      name: 'Chelsea',
      shortName: 'CHE',
      form: 'LWDWW',
      position: 6,
    },
    league: 'Premier League',
    datetime: '2024-01-20T17:30:00Z',
    prediction: {
      outcome: 'home',
      confidence: 85,
      safetyRating: 'safe',
      scorePrediction: {
        homeScore: 2,
        awayScore: 0
      },
      odds: {
        home: 1.80,
        draw: 3.60,
        away: 4.20,
      },
      tips: ['Arsenal excellent at home', 'Under 2.5 goals value bet', 'Arsenal clean sheet likely'],
    },
    stats: {
      homeTeamStats: {
        goalsScored: 38,
        goalsConceded: 15,
        wins: 12,
        draws: 6,
        losses: 2,
      },
      awayTeamStats: {
        goalsScored: 32,
        goalsConceded: 28,
        wins: 9,
        draws: 5,
        losses: 6,
      },
    },
  },
  {
    id: '3',
    homeTeam: {
      id: 'tot',
      name: 'Tottenham',
      shortName: 'TOT',
      form: 'LLWDW',
      position: 5,
    },
    awayTeam: {
      id: 'mun',
      name: 'Manchester United',
      shortName: 'MUN',
      form: 'WLWLW',
      position: 4,
    },
    league: 'Premier League',
    datetime: '2024-01-21T14:00:00Z',
    prediction: {
      outcome: 'draw',
      confidence: 62,
      safetyRating: 'risky',
      scorePrediction: {
        homeScore: 1,
        awayScore: 1
      },
      odds: {
        home: 2.80,
        draw: 3.20,
        away: 2.60,
      },
      tips: ['Both teams inconsistent', 'Draw good value', 'Both teams to score'],
    },
    stats: {
      homeTeamStats: {
        goalsScored: 35,
        goalsConceded: 32,
        wins: 10,
        draws: 4,
        losses: 6,
      },
      awayTeamStats: {
        goalsScored: 30,
        goalsConceded: 28,
        wins: 10,
        draws: 3,
        losses: 7,
      },
    },
  },
  {
    id: '4',
    homeTeam: {
      id: 'real',
      name: 'Real Madrid',
      shortName: 'RMA',
      form: 'WWWWW',
      position: 1,
    },
    awayTeam: {
      id: 'atletico',
      name: 'Atletico Madrid',
      shortName: 'ATM',
      form: 'WDLWW',
      position: 4,
    },
    league: 'La Liga',
    datetime: '2024-01-21T20:00:00Z',
    prediction: {
      outcome: 'home',
      confidence: 92,
      safetyRating: 'safe',
      scorePrediction: {
        homeScore: 3,
        awayScore: 1
      },
      odds: {
        home: 1.65,
        draw: 3.80,
        away: 5.00,
      },
      tips: ['Real Madrid in perfect form', 'Safest bet of the day', 'Low-scoring El Derbi expected'],
    },
    stats: {
      homeTeamStats: {
        goalsScored: 48,
        goalsConceded: 12,
        wins: 16,
        draws: 3,
        losses: 1,
      },
      awayTeamStats: {
        goalsScored: 28,
        goalsConceded: 18,
        wins: 11,
        draws: 6,
        losses: 3,
      },
    },
  },
  {
    id: '5',
    homeTeam: {
      id: 'napoli',
      name: 'Napoli',
      shortName: 'NAP',
      form: 'WLWWL',
      position: 3,
    },
    awayTeam: {
      id: 'juventus',
      name: 'Juventus',
      shortName: 'JUV',
      form: 'DWWWW',
      position: 2,
    },
    league: 'Serie A',
    datetime: '2024-01-22T18:45:00Z',
    prediction: {
      outcome: 'away',
      confidence: 71,
      safetyRating: 'medium',
      scorePrediction: {
        homeScore: 0,
        awayScore: 1
      },
      odds: {
        home: 3.10,
        draw: 3.20,
        away: 2.30,
      },
      tips: ['Juventus strong away form', 'Under 2.5 goals likely', 'Juventus defensive solidity'],
    },
    stats: {
      homeTeamStats: {
        goalsScored: 34,
        goalsConceded: 25,
        wins: 11,
        draws: 4,
        losses: 5,
      },
      awayTeamStats: {
        goalsScored: 31,
        goalsConceded: 16,
        wins: 13,
        draws: 5,
        losses: 2,
      },
    },
  },
];