// This helper keeps the latest AI journey suggestion in the browser so we can reuse it after a reload.
const PENDING_JOURNEY_KEY = "pendingJourneySuggestion";

export type JourneySuggestion = {
  title: string;
  intro: string;
  avoidTitles: string[];
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
    return { title, intro, avoidTitles: avoid };
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
