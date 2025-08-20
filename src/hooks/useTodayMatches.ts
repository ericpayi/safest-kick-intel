import { useQuery } from "@tanstack/react-query";
import type { Match } from "@/types/match";
import { mockMatches } from "@/data/mockMatches";
import { supabase } from "@/integrations/supabase/client";

function getToday(): string {
  const d = new Date();
  // Use local date; backend defaults to UTC if omitted
  return d.toISOString().slice(0, 10);
}

export async function fetchTodayMatches(date?: string): Promise<Match[]> {
  const targetDate = date || getToday();
  try {
    const { data, error } = await supabase.functions.invoke("get-today-matches", {
      body: { date: targetDate },
    });

    if (error) {
      console.warn("Edge function error. Using mock matches.", error);
      return mockMatches;
    }

    if (!data || !("matches" in data) || !Array.isArray((data as any).matches)) {
      console.warn("Edge function responded without matches. Using mock matches.", data);
      return mockMatches;
    }

    return (data as any).matches as Match[];
  } catch (err) {
    console.warn("Failed to invoke edge function. Using mock matches.", err);
    return mockMatches;
  }
}

export function useTodayMatches(date?: string) {
  return useQuery<Match[], Error>({
    queryKey: ["today-matches", date || getToday()],
    queryFn: () => fetchTodayMatches(date),
    staleTime: 1000 * 60, // 1 minute
  });
}
