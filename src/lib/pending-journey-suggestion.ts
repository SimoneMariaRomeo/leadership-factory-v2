// This helper keeps the latest AI journey suggestion in the browser so we can reuse it after a reload.
const PENDING_JOURNEY_KEY = "pendingJourneySuggestion";

export type JourneySuggestion = {
  title: string;
  intro: string;
  avoidTitles: string[];
  avoidJourneys?: { title: string; intro: string | null }[];
};

// This fetches sessionStorage only when the browser is available.
function getSessionStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

// This saves the suggestion JSON if we can reach sessionStorage.
export function saveJourneySuggestion(suggestion: JourneySuggestion): void {
  const storage = getSessionStorage();
  if (!storage) return;
  const payload = JSON.stringify(suggestion);
  storage.setItem(PENDING_JOURNEY_KEY, payload);
}

// This reads the stored suggestion or returns null when none exists.
export function readJourneySuggestion(): JourneySuggestion | null {
  const storage = getSessionStorage();
  if (!storage) return null;
  const raw = storage.getItem(PENDING_JOURNEY_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<JourneySuggestion>;
    const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
    const intro = typeof parsed.intro === "string" ? parsed.intro.trim() : "";
    const avoid = Array.isArray(parsed.avoidTitles)
      ? parsed.avoidTitles.map((item) => (typeof item === "string" ? item : "")).filter(Boolean)
      : [];
    if (!title || !intro) return null;
    const avoidJourneys = Array.isArray(parsed.avoidJourneys)
      ? (parsed.avoidJourneys
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const t = typeof (item as any).title === "string" ? (item as any).title.trim() : "";
            const i = typeof (item as any).intro === "string" ? (item as any).intro.trim() : "";
            if (!t) return null;
            return { title: t, intro: i || null };
          })
          .filter((v): v is { title: string; intro: string | null } => Boolean(v))) || []
      : [];
    return { title, intro, avoidTitles: avoid, avoidJourneys };
  } catch {
    return null;
  }
}

// This wipes the stored suggestion.
export function clearJourneySuggestion(): void {
  const storage = getSessionStorage();
  if (!storage) return;
  storage.removeItem(PENDING_JOURNEY_KEY);
}
