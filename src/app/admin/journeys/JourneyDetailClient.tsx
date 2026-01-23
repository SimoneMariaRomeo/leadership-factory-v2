"use client";

// This component edits one journey and its steps in the browser.
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type JourneySummary = {
  id: string;
  title: string;
  slug: string | null;
  intro?: string | null;
  objectives?: any;
  isStandard: boolean;
  personalizedForUser?: { id: string; email: string | null; name: string | null } | null;
  userGoalSummary?: string | null;
  status: string;
  updatedAt: string | Date;
};

type StepRecord = {
  id: string;
  journeyId: string;
  sessionOutlineId: string;
  sessionOutline: { id: string; title: string; slug: string };
  order: number;
  status: string;
  chats: { id: string; startedAt: string | Date | null }[];
  ahaText: string | null;
  unlockedAt: string | Date | null;
  completedAt: string | Date | null;
};

export type JourneyDetail = JourneySummary & {
  steps: StepRecord[];
};

type OutlineOption = {
  id: string;
  title: string;
  slug: string;
};

type JourneyForm = {
  title: string;
  slug: string;
  intro: string;
  objectivesText: string;
  isStandard: boolean;
  personalizedUserEmail: string;
  userGoalSummary: string;
  status: string;
};

type JourneyDetailClientProps = {
  initialDetail: JourneyDetail;
  outlines: OutlineOption[];
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  awaiting_review: "Awaiting review",
  active: "Active",
  completed: "Completed",
};

const statusStyles: Record<string, CSSProperties> = {
  draft: { backgroundColor: "#f3f4f6", color: "#111827" },
  awaiting_review: { backgroundColor: "#fef9c3", color: "#854d0e" },
  active: { backgroundColor: "#d1fae5", color: "#064e3b" },
  completed: { backgroundColor: "#991b1b", color: "#fef2f2" },
};

const stepStatusStyles: Record<string, CSSProperties> = {
  locked: { backgroundColor: "#fee2e2", color: "#7f1d1d" },
  unlocked: { backgroundColor: "#dcfce7", color: "#064e3b" },
  completed: {},
};

// This renders the journey editor for admins.
export default function JourneyDetailClient({ initialDetail, outlines }: JourneyDetailClientProps) {
  const router = useRouter();
  const [journeyDetail, setJourneyDetail] = useState<JourneyDetail | null>(initialDetail);
  const [journeyForm, setJourneyForm] = useState<JourneyForm>(() => buildJourneyForm(initialDetail));
  const [journeyDirty, setJourneyDirty] = useState(false);
  const [dirtySteps, setDirtySteps] = useState<Set<string>>(new Set());
  const [reorderDirty, setReorderDirty] = useState(false);
  const [savingJourney, setSavingJourney] = useState(false);
  const [deletingJourney, setDeletingJourney] = useState(false);
  const [duplicatingJourney, setDuplicatingJourney] = useState(false);
  const [stepSaving, setStepSaving] = useState<string | null>(null);
  const [stepDeleting, setStepDeleting] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [addStepOutlineId, setAddStepOutlineId] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const needAnalysisChatId = useMemo(() => {
    const needStep = journeyDetail?.steps.find((step) => step.sessionOutline?.slug === "define-your-goal");
    if (!needStep || !needStep.chats?.length) return null;
    const sorted = [...needStep.chats].sort((a, b) => {
      const aTime = a.startedAt ? new Date(a.startedAt).getTime() : 0;
      const bTime = b.startedAt ? new Date(b.startedAt).getTime() : 0;
      return bTime - aTime;
    });
    return sorted[0]?.id || null;
  }, [journeyDetail]);

  useEffect(() => {
    setJourneyForm(buildJourneyForm(journeyDetail));
    if (journeyDetail) {
      setAddStepOutlineId(outlines[0]?.id || "");
    }
    setJourneyDirty(false);
    setDirtySteps(new Set());
    setReorderDirty(false);
  }, [journeyDetail, outlines]);

  // This saves the current journey form.
  const handleSaveJourney = async () => {
    if (!journeyDetail) return;
    setSavingJourney(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...journeyForm,
          objectivesText: journeyForm.objectivesText,
          personalizedUserEmail: journeyForm.personalizedUserEmail,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not save journey.");

      setJourneyDetail(data.journey);
      setJourneyForm(buildJourneyForm(data.journey));
      setJourneyDirty(false);
      setDirtySteps(new Set());
      setReorderDirty(false);
      setMessage("Saved.");
    } catch (error: any) {
      console.error("Saving journey failed:", error);
      setMessage(error?.message || "Could not save journey.");
    } finally {
      setSavingJourney(false);
    }
  };

  // This deletes the current journey and all of its outlines/steps.
  const handleDeleteJourney = async () => {
    if (!journeyDetail) return;
    const confirmMessage =
      "This will delete this journey, its steps, and its outlines. Steps using those outlines elsewhere will also be removed. Continue?";
    if (!window.confirm(confirmMessage)) return;

    setDeletingJourney(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not delete journey.");

      setMessage("Journey deleted.");
      router.push("/admin/journeys");
    } catch (error: any) {
      console.error("Deleting journey failed:", error);
      setMessage(error?.message || "Could not delete journey.");
    } finally {
      setDeletingJourney(false);
    }
  };

  // This makes a fresh draft copy of the current journey so admins can tweak it safely.
  const handleDuplicateJourney = async () => {
    if (!journeyDetail) return;

    setDuplicatingJourney(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}/duplicate`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not duplicate journey.");

      setMessage("Journey duplicated.");
      router.push(`/admin/journeys/${data.journey.id}`);
    } catch (error: any) {
      console.error("Duplicating journey failed:", error);
      setMessage(error?.message || "Could not duplicate journey.");
    } finally {
      setDuplicatingJourney(false);
    }
  };

  // This saves one step after edits.
  const handleSaveStep = async (stepId: string) => {
    if (!journeyDetail) return;
    const step = journeyDetail.steps.find((item) => item.id === stepId);
    if (!step) return;
    setStepSaving(stepId);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}/steps/${stepId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionOutlineId: step.sessionOutlineId,
          ahaText: step.ahaText,
          status: step.status,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not save step.");

      setJourneyDetail((prev) =>
        prev
          ? { ...prev, steps: prev.steps.map((item) => (item.id === stepId ? data.step : item)) }
          : prev
      );
      setDirtySteps((prev) => {
        const next = new Set(prev);
        next.delete(stepId);
        return next;
      });
      setReorderDirty(false);
      setMessage("Step saved.");
    } catch (error: any) {
      console.error("Saving step failed:", error);
      setMessage(error?.message || "Could not save step.");
    } finally {
      setStepSaving(null);
    }
  };

  // This removes one step from the journey.
  const handleDeleteStep = async (stepId: string) => {
    if (!journeyDetail) return;
    const step = journeyDetail.steps.find((item) => item.id === stepId);
    if (!step) return;
    const stepLabel = step.sessionOutline?.title || "this step";
    const confirmMessage = `Remove "${stepLabel}" from this journey? This cannot be undone.`;
    if (!window.confirm(confirmMessage)) return;

    setStepDeleting(stepId);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}/steps/${stepId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not remove step.");

      setJourneyDetail((prev) =>
        prev ? { ...prev, steps: prev.steps.filter((item) => item.id !== stepId) } : prev
      );
      setDirtySteps((prev) => {
        const next = new Set(prev);
        next.delete(stepId);
        return next;
      });
      setReorderDirty(false);
      setMessage("Step removed.");
    } catch (error: any) {
      console.error("Removing step failed:", error);
      setMessage(error?.message || "Could not remove step.");
    } finally {
      setStepDeleting(null);
    }
  };

  // This reorders steps using up/down buttons.
  const handleReorder = async (stepId: string, direction: "up" | "down") => {
    if (!journeyDetail) return;
    const index = journeyDetail.steps.findIndex((step) => step.id === stepId);
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= journeyDetail.steps.length) return;

    const reordered = [...journeyDetail.steps];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setReorderDirty(true);
    setReordering(true);
    setMessage(null);
    try {
      const orderedStepIds = reordered.map((step) => step.id);
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}/steps/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedStepIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not reorder steps.");

      setJourneyDetail((prev) => (prev ? { ...prev, steps: data.steps } : prev));
      setReorderDirty(false);
      setMessage("Order saved.");
    } catch (error: any) {
      console.error("Reordering failed:", error);
      setMessage(error?.message || "Could not reorder steps.");
    } finally {
      setReordering(false);
    }
  };

  // This adds a new step to the end of the journey.
  const handleAddStep = async () => {
    if (!journeyDetail || !addStepOutlineId) return;
    setStepSaving("new");
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}/steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionOutlineId: addStepOutlineId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not add step.");

      setJourneyDetail((prev) => (prev ? { ...prev, steps: [...prev.steps, data.step] } : prev));
      setDirtySteps(new Set());
      setReorderDirty(false);
      setMessage("Step added.");
    } catch (error: any) {
      console.error("Adding step failed:", error);
      setMessage(error?.message || "Could not add step.");
    } finally {
      setStepSaving(null);
    }
  };

  // This updates a field inside one step in local state.
  const changeStepField = (stepId: string, field: keyof StepRecord, value: any) => {
    setJourneyDetail((prev) =>
      prev
        ? {
            ...prev,
            steps: prev.steps.map((step) => {
              if (step.id !== stepId) return step;
              if (field === "sessionOutlineId") {
                const selectedOutline = outlines.find((option) => option.id === value);
                return {
                  ...step,
                  sessionOutlineId: value,
                  sessionOutline: selectedOutline ? { ...selectedOutline } : step.sessionOutline,
                };
              }
              return { ...step, [field]: value };
            }),
          }
        : prev
    );
    setDirtySteps((prev) => new Set(prev).add(stepId));
  };

  // This formats timestamps in a simple way.
  const formatDate = (value: string | Date | null | undefined) => {
    if (!value) return "-";
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleString();
  };

  const journeyObjectivesLines = journeyForm.objectivesText || "";
  const hasUnsaved = journeyDirty || dirtySteps.size > 0 || reorderDirty;

  return (
    <div className={`admin-form-card ${hasUnsaved ? "dirty-card" : ""}`}>
      <div className="admin-card-head">
        <div>
          <h3 className="admin-title">Journey detail</h3>
          {needAnalysisChatId ? (
            <Link href={`/chats/history/${needAnalysisChatId}`} className="tiny-note link-button" target="_blank">
              Define-your-goal chat
            </Link>
          ) : null}
        </div>
        {journeyDetail ? (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              type="button"
              className="secondary-button"
              onClick={handleDuplicateJourney}
              disabled={duplicatingJourney}
            >
              {duplicatingJourney ? "Duplicating..." : "Duplicate"}
            </button>
            <button
              type="button"
              className="secondary-button danger"
              onClick={handleDeleteJourney}
              disabled={deletingJourney}
            >
              {deletingJourney ? "Deleting..." : "Delete journey"}
            </button>
          </div>
        ) : null}
      </div>

      {!journeyDetail ? (
        <p className="tiny-note">Journey not found.</p>
      ) : (
        <>
          <div className="admin-form-grid single-column-grid">
            <label className="admin-label">
              Title
              <input
                className="admin-input"
                type="text"
                value={journeyForm.title}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, title: event.target.value }));
                  setJourneyDirty(true);
                }}
              />
            </label>
            <label className="admin-label">
              Slug
              <input
                className="admin-input"
                type="text"
                value={journeyForm.slug}
                disabled={journeyDetail.status === "active"}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, slug: event.target.value }));
                  setJourneyDirty(true);
                }}
              />
            </label>
            <label className="admin-label">
              Status
              <select
                className="admin-input"
                style={statusStyles[journeyForm.status] || undefined}
                value={journeyForm.status}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, status: event.target.value }));
                  setJourneyDirty(true);
                }}
              >
                <option value="draft">Draft</option>
                <option value="awaiting_review">Awaiting review</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label className="admin-label checkbox">
              <input
                type="checkbox"
                checked={journeyForm.isStandard}
                onChange={(event) => {
                  setJourneyForm((prev) => ({
                    ...prev,
                    isStandard: event.target.checked,
                    personalizedUserEmail: event.target.checked ? "" : prev.personalizedUserEmail,
                  }));
                  setJourneyDirty(true);
                }}
              />
              <span>Standard journey</span>
            </label>
            <label className="admin-label">
              Personalized user email
              <input
                className="admin-input"
                type="text"
                value={journeyForm.personalizedUserEmail}
                disabled={journeyForm.isStandard}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, personalizedUserEmail: event.target.value }));
                  setJourneyDirty(true);
                }}
                placeholder="email@example.com"
              />
            </label>
            <label className="admin-label">
              Intro
              <textarea
                className="admin-input"
                rows={3}
                value={journeyForm.intro}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, intro: event.target.value }));
                  setJourneyDirty(true);
                }}
              />
            </label>
            <label className="admin-label">
              Objectives (one per line)
              <textarea
                className="admin-input"
                rows={4}
                value={journeyObjectivesLines}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, objectivesText: event.target.value }));
                  setJourneyDirty(true);
                }}
              />
            </label>
            <label className="admin-label">
              User goal summary
              <textarea
                className="admin-input"
                rows={3}
                value={journeyForm.userGoalSummary}
                onChange={(event) => {
                  setJourneyForm((prev) => ({ ...prev, userGoalSummary: event.target.value }));
                  setJourneyDirty(true);
                }}
              />
            </label>
          </div>

          <div className="admin-actions">
            <button type="button" className="primary-button" onClick={handleSaveJourney} disabled={savingJourney}>
              {savingJourney ? "Saving..." : "Save journey"}
            </button>
            {hasUnsaved ? <span className="dirty-note">Unsaved changes</span> : null}
          </div>

          <div className="admin-card-head" style={{ marginTop: "18px" }}>
            <h4 className="admin-title">Steps</h4>
          </div>
          <div className="admin-steps-list">
            {journeyDetail.steps.length === 0 ? (
              <p className="tiny-note">No steps yet.</p>
            ) : (
              journeyDetail.steps
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((step, index) => (
                  <div key={step.id} className="admin-step-card">
                    <div className="admin-step-head">
                      <div>
                        <p className="tiny-note">Order {index + 1}</p>
                        <p className="admin-title" style={{ marginBottom: 4 }}>
                          {step.sessionOutlineId ? (
                            <Link
                              href={`/admin/sessions/${step.sessionOutlineId}`}
                              className="admin-title-link"
                              title="Open this outline in Sessions"
                            >
                              {step.sessionOutline?.title || "Untitled outline"}
                            </Link>
                          ) : (
                            step.sessionOutline?.title || "Untitled outline"
                          )}
                        </p>
                        <p className="tiny-note">Status: {step.status}</p>
                      </div>
                      <div className="step-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => handleReorder(step.id, "up")}
                          disabled={reordering || index === 0}
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => handleReorder(step.id, "down")}
                          disabled={reordering || index === journeyDetail.steps.length - 1}
                        >
                          Down
                        </button>
                      </div>
                    </div>

                    <label className="admin-label">
                      Session outline
                      <select
                        className="admin-input"
                        value={step.sessionOutlineId}
                        onChange={(event) => changeStepField(step.id, "sessionOutlineId", event.target.value)}
                      >
                        {sortedOutlineOptions(outlines).map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.title} - {option.slug}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="admin-label">
                      Aha text
                      <textarea
                        className="admin-input"
                        rows={2}
                        value={step.ahaText || ""}
                        onChange={(event) => changeStepField(step.id, "ahaText", event.target.value)}
                      />
                    </label>

                    <label className="admin-label">
                      Status override
                      <select
                        className="admin-input"
                        value={step.status}
                        style={{ ...(stepStatusStyles[step.status] || {}) }}
                        onChange={(event) => changeStepField(step.id, "status", event.target.value)}
                      >
                        <option value="locked">Locked</option>
                        <option value="unlocked">Unlocked</option>
                        <option value="completed">Completed</option>
                      </select>
                    </label>

                    <p className="tiny-note">
                      Unlocked: {formatDate(step.unlockedAt)} | Completed: {formatDate(step.completedAt)}{" "}
                      {step.chats && step.chats.length > 0 ? (
                        <>
                          | Chats:{" "}
                          {step.chats.map((chat, chatIndex) => (
                            <Link
                              key={chat.id}
                              href={`/chats/history/${chat.id}`}
                              className="link-button"
                              target="_blank"
                              style={{ marginRight: 6 }}
                            >
                              {chatIndex + 1}
                            </Link>
                          ))}
                        </>
                      ) : null}
                    </p>

                    <div className="admin-actions">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => handleSaveStep(step.id)}
                        disabled={stepSaving === step.id || stepDeleting === step.id}
                      >
                        {stepSaving === step.id ? "Saving..." : "Save step"}
                      </button>
                      <button
                        type="button"
                        className="secondary-button danger"
                        onClick={() => handleDeleteStep(step.id)}
                        disabled={stepDeleting === step.id || stepSaving === step.id}
                      >
                        {stepDeleting === step.id ? "Removing..." : "Remove step"}
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>

          <div className="admin-card-head" style={{ marginTop: "16px" }}>
            <h4 className="admin-title">Add step</h4>
          </div>
          <div className="admin-form-grid">
            <label className="admin-label">
              Session outline
              <select
                className="admin-input"
                value={addStepOutlineId}
                onChange={(event) => setAddStepOutlineId(event.target.value)}
              >
                <option value="">Pick outline</option>
                {sortedOutlineOptions(outlines).map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title} - {option.slug}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="admin-actions">
            <button type="button" className="primary-button" onClick={handleAddStep} disabled={stepSaving === "new"}>
              {stepSaving === "new" ? "Adding..." : "Add step"}
            </button>
          </div>
        </>
      )}

      {message ? (
        <span className="tiny-note" style={{ color: message === "Saved." ? "var(--text-soft)" : "#842029" }}>
          {message}
        </span>
      ) : null}
    </div>
  );
}

// This builds the journey form shape from detail data.
function buildJourneyForm(detail: JourneyDetail | null): JourneyForm {
  return {
    title: detail?.title || "",
    slug: detail?.slug || "",
    intro: detail?.intro || "",
    objectivesText: Array.isArray(detail?.objectives) ? (detail?.objectives as string[]).join("\n") : "",
    isStandard: detail?.isStandard || false,
    personalizedUserEmail: detail?.personalizedForUser?.email || "",
    userGoalSummary: detail?.userGoalSummary || "",
    status: detail?.status || "draft",
  };
}

// This orders outlines alphabetically.
function sortedOutlineOptions(options: OutlineOption[]) {
  return options.slice().sort((a, b) => a.title.localeCompare(b.title));
}
