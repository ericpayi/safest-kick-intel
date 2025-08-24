// Supabase Edge Function: get-today-matches
// Uses RAPIDAPI_KEY (stored in Supabase secrets) to fetch today's fixtures
// and maps them to the app's Match type shape (with minimal placeholder prediction fields for now)

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const method = req.method || "GET";

    // Support both GET (querystring) and POST (JSON body) for date
    const dateParam = url.searchParams.get("date"); // YYYY-MM-DD
    let bodyDate: string | null = null;
    if (method === "POST") {
      try {
        const body = await req.json();
        bodyDate = (body && typeof body.date === "string") ? body.date : null;
        // Optional: allow a temporary override key in request body for debugging
        // DO NOT use this in production clients; prefer Supabase Secrets
        // Example body: { date: "YYYY-MM-DD", rapidapiKey: "..." }
        (req as any)._bodyRapidKey = (body && typeof body.rapidapiKey === "string") ? body.rapidapiKey : null;
      } catch (_) {
        bodyDate = null;
        (req as any)._bodyRapidKey = null;
      }
    }

    // Default to today's date in UTC if not provided
    const todayUtc = new Date().toISOString().slice(0, 10);
    const date = dateParam || bodyDate || todayUtc;

    const envCandidates = ["RAPIDAPI_KEY", "RAPID_API_KEY", "X_RAPIDAPI_KEY"];
    const envKey = envCandidates
      .map((k) => Deno.env.get(k))
      .find((v) => !!v) || null;

    const bodyRapidKey = (req as any)._bodyRapidKey as string | null;
    const RAPIDAPI_KEY = envKey || bodyRapidKey;

    if (!RAPIDAPI_KEY) {
      try {
        const present = envCandidates.filter((k) => !!Deno.env.get(k));
        console.error(
          "[get-today-matches] Missing RapidAPI key.",
          { checked: envCandidates, present, hasBodyOverride: !!bodyRapidKey }
        );
      } catch (_) {
        // ignore logging errors
      }
      return new Response(
        JSON.stringify({ error: "Missing RAPIDAPI_KEY secret", checked: envCandidates }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch today's fixtures
    const apiUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}`;
    const apiRes = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return new Response(JSON.stringify({ error: "API error", details: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await apiRes.json();
    const fixtures: any[] = data?.response || [];

    // Map to our app's Match shape (minimal fields + placeholder prediction)
    const matches = fixtures.map((f: any) => {
      const id = String(f.fixture?.id ?? crypto.randomUUID());
      const home = f.teams?.home;
      const away = f.teams?.away;
      const league = f.league?.name ?? "Unknown League";
      const dateIso = f.fixture?.date ?? new Date().toISOString();

      const short = (name: string | undefined) =>
        (name || "").split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 3)
          .toUpperCase() || "TBD";

      return {
        id,
        homeTeam: {
          id: String(home?.id ?? "home"),
          name: home?.name ?? "Home Team",
          shortName: short(home?.name),
          form: "-",
          position: undefined,
        },
        awayTeam: {
          id: String(away?.id ?? "away"),
          name: away?.name ?? "Away Team",
          shortName: short(away?.name),
          form: "-",
          position: undefined,
        },
        league,
        datetime: dateIso,
        prediction: {
          // Basic placeholder until odds/prediction model is added
          outcome: "draw",
          confidence: 50,
          safetyRating: "medium",
          odds: { home: 0, draw: 0, away: 0 },
          tips: [],
        },
      };
    });

    return new Response(JSON.stringify({ date, count: matches.length, matches }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unexpected error", details: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
