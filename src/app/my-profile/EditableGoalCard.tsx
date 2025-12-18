"use client";

// This card shows the goal and lets the user edit and save it inline.
import { useState } from "react";

type EditableGoalCardProps = {
  initialGoal: string | null;
  confirmedAt: Date | null;
};

export default function EditableGoalCard({ initialGoal, confirmedAt }: EditableGoalCardProps) {
  const [goal, setGoal] = useState(initialGoal || "");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const formattedDate = confirmedAt
    ? new Date(confirmedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;

  const handleSave = async () => {
    const trimmed = goal.trim();
    if (!trimmed) {
      setMessage("Please add your goal before saving.");
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/profile/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learningGoal: trimmed }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not save your goal.");
      }

      setEditing(false);
      setMessage("Saved.");
    } catch (err: any) {
      console.error("Saving goal failed:", err);
      setMessage(err?.message || "Could not save your goal.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="goal-card section-card">
      <div className="goal-card-head">
        <div>
          <h2 className="hero-kicker section-title">Your goal</h2>
          {formattedDate ? <p className="tiny-note">Last updated on {formattedDate}</p> : null}
        </div>
        <button
          type="button"
          className="secondary-button nav-button"
          onClick={() => setEditing((prev) => !prev)}
          disabled={saving}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>
      {editing ? (
        <div className="goal-edit-wrap">
          <textarea
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            rows={3}
            className="goal-input"
            placeholder="Write your learning goal..."
            disabled={saving}
          />
          <div className="goal-actions">
            <button type="button" className="primary-button" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save goal"}
            </button>
            {message ? (
              <span className="tiny-note" style={{ color: message === "Saved." ? "var(--text-soft)" : "#842029" }}>
                {message}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="goal-box flat">
          <div className="goal-text hero-lead">{goal || "No learning goal yet. Add yours to guide your journeys."}</div>
        </div>
      )}
    </div>
  );
}
