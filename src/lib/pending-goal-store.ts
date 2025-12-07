// This small helper keeps the pending learning goal in session storage for the browser.
const PENDING_GOAL_KEY = "pendingLearningGoal";

// This fetches sessionStorage only when a browser is available.
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

// This saves the pending goal text if we can reach sessionStorage.
export function setPendingGoal(goal: string): void {
  const storage = getSessionStorage();
  if (!storage) return;
  storage.setItem(PENDING_GOAL_KEY, goal);
}

// This reads the pending goal text or returns null when nothing is stored.
export function getPendingGoal(): string | null {
  const storage = getSessionStorage();
  if (!storage) return null;
  const storedGoal = storage.getItem(PENDING_GOAL_KEY);
  if (!storedGoal) return null;
  const trimmed = storedGoal.trim();
  return trimmed.length > 0 ? trimmed : null;
}

// This wipes the pending goal when we no longer need it.
export function clearPendingGoal(): void {
  const storage = getSessionStorage();
  if (!storage) return;
  storage.removeItem(PENDING_GOAL_KEY);
}
