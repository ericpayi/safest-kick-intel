import { useMemo } from 'react';
import { mockMatches } from '@/data/mockMatches';

interface BettingResult {
  matchId: string;
  betAmount: number;
  odds: number;
  outcome: 'win' | 'loss';
  date: string;
}

// Mock betting history for the past weeks
const mockBettingHistory: BettingResult[] = [
  // This week
  { matchId: '1', betAmount: 50, odds: 2.1, outcome: 'win', date: '2024-08-26' },
  { matchId: '2', betAmount: 30, odds: 1.8, outcome: 'win', date: '2024-08-25' },
  { matchId: '3', betAmount: 40, odds: 2.5, outcome: 'loss', date: '2024-08-24' },
  { matchId: '4', betAmount: 25, odds: 1.9, outcome: 'win', date: '2024-08-23' },
  
  // Last week
  { matchId: '5', betAmount: 60, odds: 2.2, outcome: 'win', date: '2024-08-19' },
  { matchId: '6', betAmount: 35, odds: 1.7, outcome: 'loss', date: '2024-08-18' },
  { matchId: '7', betAmount: 45, odds: 2.0, outcome: 'win', date: '2024-08-17' },
  { matchId: '8', betAmount: 50, odds: 1.6, outcome: 'win', date: '2024-08-16' },
  
  // Week before last
  { matchId: '9', betAmount: 40, odds: 2.3, outcome: 'loss', date: '2024-08-12' },
  { matchId: '10', betAmount: 55, odds: 1.9, outcome: 'win', date: '2024-08-11' },
  { matchId: '11', betAmount: 30, odds: 2.4, outcome: 'win', date: '2024-08-10' },
  { matchId: '12', betAmount: 45, odds: 1.8, outcome: 'loss', date: '2024-08-09' },
];

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function getCurrentWeekStart(): string {
  return getWeekStart(new Date());
}

export function useWeeklyROI() {
  return useMemo(() => {
    const currentWeekStart = getCurrentWeekStart();
    const currentWeekEnd = new Date();
    currentWeekEnd.setDate(new Date(currentWeekStart).getDate() + 6);
    
    // Filter bets for current week
    const currentWeekBets = mockBettingHistory.filter(bet => {
      const betDate = new Date(bet.date);
      return betDate >= new Date(currentWeekStart) && betDate <= currentWeekEnd;
    });
    
    // Calculate totals for current week
    const totalInvested = currentWeekBets.reduce((sum, bet) => sum + bet.betAmount, 0);
    const totalReturns = currentWeekBets.reduce((sum, bet) => {
      if (bet.outcome === 'win') {
        return sum + (bet.betAmount * bet.odds);
      }
      return sum; // Loss = 0 return
    }, 0);
    
    const profit = totalReturns - totalInvested;
    const roi = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
    
    // Calculate win rate
    const wins = currentWeekBets.filter(bet => bet.outcome === 'win').length;
    const winRate = currentWeekBets.length > 0 ? (wins / currentWeekBets.length) * 100 : 0;
    
    return {
      roi: Math.round(roi * 10) / 10, // Round to 1 decimal place
      winRate: Math.round(winRate * 10) / 10,
      totalInvested,
      totalReturns,
      profit,
      betsCount: currentWeekBets.length,
      isPositive: roi > 0
    };
  }, []);
}