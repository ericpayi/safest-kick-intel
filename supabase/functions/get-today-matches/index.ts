// Uses APISPORTS_KEY (stored in Supabase secrets) to fetch today's fixtures from api-sports.io
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
        // Example body: { date: "YYYY-MM-DD", apisportsKey: "..." }
        (req as any)._bodyApiKey = (body && typeof body.apisportsKey === "string") ? body.apisportsKey : null;
      } catch (_) {
        bodyDate = null;
        (req as any)._bodyApiKey = null;
      }
    }

    // Default to today's date in UTC if not provided
    const todayUtc = new Date().toISOString().slice(0, 10);
    const date = dateParam || bodyDate || todayUtc;

    const envCandidates = ["APISPORTS_KEY"];
    const envKey = envCandidates
      .map((k) => Deno.env.get(k))
      .find((v) => !!v) || null;

    const bodyApiKey = (req as any)._bodyApiKey as string | null;
    const APISPORTS_KEY = envKey || bodyApiKey || "ae601aab18443b82b03dc35c6e7645fe";

    if (!APISPORTS_KEY) {
      try {
        const present = envCandidates.filter((k) => !!Deno.env.get(k));
        console.error(
          "[get-today-matches] Missing API Sports key.",
          { checked: envCandidates, present, hasBodyOverride: !!bodyApiKey }
        );
      } catch (_) {
        // ignore logging errors
      }
      return new Response(
        JSON.stringify({ error: "Missing APISPORTS_KEY secret", checked: envCandidates }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch today's fixtures
    const apiUrl = `https://v3.football.api-sports.io/fixtures?date=${date}`;
    const apiRes = await fetch(apiUrl, {
      headers: {
        "x-apisports-key": APISPORTS_KEY,
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
