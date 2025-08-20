import { useQuery } from "@tanstack/react-query";
import type { Match } from "@/types/match";
import { mockMatches } from "@/data/mockMatches";

function getToday(): string {
  const d = new Date();
  // Use local date; backend defaults to UTC if omitted
  return d.toISOString().slice(0, 10);
}

export async function fetchTodayMatches(date?: string): Promise<Match[]> {
  const targetDate = date || getToday();
  try {
    const res = await fetch(`/functions/v1/get-today-matches?date=${encodeURIComponent(targetDate)}`);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      console.warn("Edge function not reachable or returned non-JSON. Using mock matches.", { status: res.status, contentType });
      return mockMatches;
    }

    const data = await res.json();
    if (!data?.matches) {
      console.warn("Edge function responded without matches. Using mock matches.", data);
      return mockMatches;
    }

    return data.matches as Match[];
  } catch (err) {
    console.warn("Failed to fetch matches. Using mock matches.", err);
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
