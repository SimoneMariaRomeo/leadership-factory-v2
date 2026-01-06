"use client";

// This section lets a user view, add, edit, and finish goals.
import { useMemo, useState } from "react";

type GoalStatus = "active" | "achieved";

type Goal = {
  id: string;
  statement: string;
  status: GoalStatus;
  updatedAt: string;
};

type GoalsPanelProps = {
  goals: Goal[];
};

// This turns an ISO date into a short friendly date.
function formatGoalDate(value: string) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// This renders the goals list with add, edit, and status actions.
export default function GoalsPanel({ goals: initialGoals }: GoalsPanelProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const sortedGoals = useMemo(() => {
    const copy = [...goals];
    const rank = (status: GoalStatus) => (status === "active" ? 0 : 1);
    return copy.sort((a, b) => {
      const statusDelta = rank(a.status) - rank(b.status);
      if (statusDelta !== 0) return statusDelta;
      const aTime = Date.parse(a.updatedAt) || 0;
      const bTime = Date.parse(b.updatedAt) || 0;
      return bTime - aTime;
    });
  }, [goals]);

  // This opens the add goal form.
  const startAdd = () => {
    setAdding(true);
    setNewText("");
    setEditingId(null);
    setMessage(null);
  };

  // This closes the add goal form.
  const cancelAdd = () => {
    setAdding(false);
    setNewText("");
    setMessage(null);
  };

  // This saves a new goal on the server.
  const saveNewGoal = async () => {
    const trimmed = newText.trim();
    if (!trimmed) {
      setMessage("Please write a goal before saving.");
      return;
    }

    setSavingId("new");
    setMessage(null);
    try {
      const response = await fetch("/api/profile/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statement: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success || !data?.goal) {
        throw new Error(data?.error || "Could not save your goal.");
      }

      setGoals((prev) => [...prev, data.goal]);
      setAdding(false);
      setNewText("");
      setMessage("Saved.");
    } catch (err: any) {
      console.error("Saving new goal failed:", err);
      setMessage(err?.message || "Could not save your goal.");
    } finally {
      setSavingId(null);
    }
  };

  // This opens the edit form for one goal.
  const startEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setDraftText(goal.statement);
    setAdding(false);
    setMessage(null);
  };

  // This closes the edit form.
  const cancelEdit = () => {
    setEditingId(null);
    setDraftText("");
    setMessage(null);
  };

  // This saves edits to an existing goal.
  const saveGoal = async (goalId: string) => {
    const trimmed = draftText.trim();
    if (!trimmed) {
      setMessage("Please write a goal before saving.");
      return;
    }

    setSavingId(goalId);
    setMessage(null);
    try {
      const response = await fetch("/api/profile/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId, statement: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success || !data?.goal) {
        throw new Error(data?.error || "Could not save your goal.");
      }

      setGoals((prev) => prev.map((goal) => (goal.id === goalId ? data.goal : goal)));
      setEditingId(null);
      setDraftText("");
      setMessage("Saved.");
    } catch (err: any) {
      console.error("Saving goal failed:", err);
      setMessage(err?.message || "Could not save your goal.");
    } finally {
      setSavingId(null);
    }
  };

  // This toggles a goal between active and achieved.
  const toggleStatus = async (goal: Goal) => {
    const nextStatus: GoalStatus = goal.status === "active" ? "achieved" : "active";
    setSavingId(goal.id);
    setMessage(null);
    try {
      const response = await fetch("/api/profile/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalId: goal.id, status: nextStatus }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success || !data?.goal) {
        throw new Error(data?.error || "Could not update your goal.");
      }

      setGoals((prev) => prev.map((item) => (item.id === goal.id ? data.goal : item)));
    } catch (err: any) {
      console.error("Updating goal status failed:", err);
      setMessage(err?.message || "Could not update your goal.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="section-card">
      <div className="section-head">
        <div>
          <h2 className="hero-kicker section-title">Your goals</h2>
          <p className="tiny-note" style={{ marginTop: 0 }}>
            Keep your active goals at the top and mark old ones as achieved.
          </p>
        </div>
        <button type="button" className="secondary-button nav-button" onClick={startAdd} disabled={adding}>
          Add goal
        </button>
      </div>

      {adding ? (
        <div className="goal-edit-wrap">
          <textarea
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
            rows={3}
            className="goal-input"
            placeholder="Write your new goal..."
            disabled={savingId === "new"}
          />
          <div className="goal-actions">
            <button type="button" className="primary-button" onClick={saveNewGoal} disabled={savingId === "new"}>
              {savingId === "new" ? "Saving..." : "Save goal"}
            </button>
            <button type="button" className="secondary-button" onClick={cancelAdd} disabled={savingId === "new"}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {sortedGoals.length === 0 && !adding ? (
        <div className="goal-box flat">
          <div className="goal-text hero-lead">No goals yet. Add one to guide your journey.</div>
        </div>
      ) : (
        <div className="goal-list">
          {sortedGoals.map((goal) => {
            const isEditing = editingId === goal.id;
            const isAchieved = goal.status === "achieved";
            const formattedDate = formatGoalDate(goal.updatedAt);

            return (
              <div
                key={goal.id}
                className={`goal-card goal-item${isAchieved ? " goal-item-achieved" : ""}`}
              >
                <div className="goal-card-head">
                  <div>
                    {formattedDate ? <p className="tiny-note">Last updated on {formattedDate}</p> : null}
                  </div>
                  <div className="goal-item-actions">
                    <label className="goal-status-toggle">
                      <input
                        type="checkbox"
                        checked={isAchieved}
                        onChange={() => toggleStatus(goal)}
                        disabled={savingId === goal.id}
                      />
                      <span>{isAchieved ? "Achieved" : "Active"}</span>
                    </label>
                    <button
                      type="button"
                      className="secondary-button nav-button"
                      onClick={() => (isEditing ? cancelEdit() : startEdit(goal))}
                      disabled={savingId === goal.id}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="goal-edit-wrap">
                    <textarea
                      value={draftText}
                      onChange={(event) => setDraftText(event.target.value)}
                      rows={3}
                      className="goal-input"
                      placeholder="Update your goal..."
                      disabled={savingId === goal.id}
                    />
                    <div className="goal-actions">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => saveGoal(goal.id)}
                        disabled={savingId === goal.id}
                      >
                        {savingId === goal.id ? "Saving..." : "Save goal"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="goal-box flat">
                    <div className="goal-text hero-lead">{goal.statement}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {message ? (
        <div className="tiny-note" style={{ color: message === "Saved." ? "var(--text-soft)" : "#842029" }}>
          {message}
        </div>
      ) : null}
    </div>
  );
}
