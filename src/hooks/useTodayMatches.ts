import { useQuery } from "@tanstack/react-query";
import type { Match } from "@/types/match";

function getToday(): string {
  const d = new Date();
  // Use local date; backend defaults to UTC if omitted
  return d.toISOString().slice(0, 10);
}

export async function fetchTodayMatches(date?: string): Promise<Match[]> {
  const targetDate = date || getToday();
  const res = await fetch(`/functions/v1/get-today-matches?date=${encodeURIComponent(targetDate)}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch matches");
  }
  const data = await res.json();
  return data.matches as Match[];
}

export function useTodayMatches(date?: string) {
  return useQuery<Match[], Error>({
    queryKey: ["today-matches", date || getToday()],
    queryFn: () => fetchTodayMatches(date),
    staleTime: 1000 * 60, // 1 minute
  });
}
