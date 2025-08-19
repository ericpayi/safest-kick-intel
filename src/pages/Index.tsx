import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { MatchCard } from '@/components/MatchCard';
import { mockMatches } from '@/data/mockMatches';
import heroImage from '@/assets/hero-soccer.jpg';

const Index = () => {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedSafety, setSelectedSafety] = useState('all');

  const filteredMatches = useMemo(() => {
    return mockMatches.filter(match => {
      const leagueMatch = selectedLeague === 'all' || match.league === selectedLeague;
      const safetyMatch = selectedSafety === 'all' || match.prediction.safetyRating === selectedSafety;
      return leagueMatch && safetyMatch;
    });
  }, [selectedLeague, selectedSafety]);

  const matchCounts = useMemo(() => {
    const filtered = selectedLeague === 'all' 
      ? mockMatches 
      : mockMatches.filter(match => match.league === selectedLeague);
    
    return {
      total: filtered.length,
      safe: filtered.filter(m => m.prediction.safetyRating === 'safe').length,
      medium: filtered.filter(m => m.prediction.safetyRating === 'medium').length,
      risky: filtered.filter(m => m.prediction.safetyRating === 'risky').length,
    };
  }, [selectedLeague]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Soccer Predictions" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Smart Soccer
              <span className="text-primary block">Predictions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered analysis delivering the safest betting predictions with confidence scores and detailed insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <FilterBar
          selectedLeague={selectedLeague}
          selectedSafety={selectedSafety}
          onLeagueChange={setSelectedLeague}
          onSafetyChange={setSelectedSafety}
          matchCounts={matchCounts}
        />

        {/* Matches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No matches found for the selected filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
