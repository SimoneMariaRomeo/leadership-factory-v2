"use client";

// This component runs the admin journeys UI in the browser.
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

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

type JourneyDetail = JourneySummary & {
  steps: StepRecord[];
};

type OutlineOption = {
  id: string;
  title: string;
  slug: string;
};

type Filters = {
  isStandard: "all" | "standard" | "nonstandard";
  status: string;
  userEmail: string;
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

type NewJourneyForm = {
  title: string;
  slug: string;
  intro: string;
  isStandard: boolean;
};

type JourneysClientProps = {
  initialJourneys: JourneySummary[];
  initialDetail: JourneyDetail | null;
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

export default function JourneysClient({ initialJourneys, initialDetail, outlines }: JourneysClientProps) {
  const [journeys, setJourneys] = useState<JourneySummary[]>(initialJourneys);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(initialDetail?.id || initialJourneys[0]?.id || null);
  const [journeyDetail, setJourneyDetail] = useState<JourneyDetail | null>(initialDetail);
  const [journeyForm, setJourneyForm] = useState<JourneyForm>(() => buildJourneyForm(initialDetail));
  const [newJourney, setNewJourney] = useState<NewJourneyForm>({ title: "", slug: "", intro: "", isStandard: false });
  const [filters, setFilters] = useState<Filters>({ isStandard: "all", status: "all", userEmail: "" });
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [savingJourney, setSavingJourney] = useState(false);
  const [deletingJourney, setDeletingJourney] = useState(false);
  const [stepSaving, setStepSaving] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [addStepOutlineId, setAddStepOutlineId] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const needAnalysisChatId = useMemo(() => {
    const needStep = journeyDetail?.steps.find((step) => step.sessionOutline?.slug === "need-analysis");
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
  }, [journeyDetail, outlines]);

  useEffect(() => {
    if (selectedJourneyId && !journeys.some((journey) => journey.id === selectedJourneyId)) {
      const first = journeys[0];
      if (first) {
        loadJourneyDetail(first.id);
      } else {
        setSelectedJourneyId(null);
        setJourneyDetail(null);
      }
    }
  }, [journeys, selectedJourneyId]);

  // This reloads journeys when filters change.
  useEffect(() => {
    const controller = new AbortController();
    const fetchJourneys = async () => {
      setLoadingList(true);
      const query = new URLSearchParams();
      if (filters.isStandard !== "all") query.set("isStandard", filters.isStandard);
      if (filters.status && filters.status !== "all") query.set("status", filters.status);
      if (filters.userEmail) query.set("userEmail", filters.userEmail);

      try {
        const response = await fetch(`/api/admin/journeys?${query.toString()}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Could not load journeys.");
        setJourneys(data.journeys || []);
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.error("Loading journeys failed:", error);
        setMessage(error?.message || "Could not load journeys.");
      } finally {
        setLoadingList(false);
      }
    };

    fetchJourneys();
    return () => controller.abort();
  }, [filters]);

  // This fetches one journey detail.
  const loadJourneyDetail = async (journeyId: string) => {
    setLoadingDetail(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${journeyId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not load journey.");
      setJourneyDetail(data.journey);
      setSelectedJourneyId(journeyId);
      setJourneyForm(buildJourneyForm(data.journey));
    } catch (error: any) {
      console.error("Loading journey failed:", error);
      setMessage(error?.message || "Could not load journey.");
    } finally {
      setLoadingDetail(false);
    }
  };

  // This saves the current journey form.
  const handleSaveJourney = async () => {
    if (!selectedJourneyId) return;
    setSavingJourney(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/journeys/${selectedJourneyId}`, {
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
      setJourneys((prev) => prev.map((item) => (item.id === data.journey.id ? data.journey : item)));
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

      setJourneys((prev) => prev.filter((item) => item.id !== journeyDetail.id));
      const remaining = journeys.filter((j) => j.id !== journeyDetail.id);
      if (remaining.length > 0) {
        await loadJourneyDetail(remaining[0].id);
      } else {
        setJourneyDetail(null);
        setSelectedJourneyId(null);
      }
      setMessage("Journey deleted.");
    } catch (error: any) {
      console.error("Deleting journey failed:", error);
      setMessage(error?.message || "Could not delete journey.");
    } finally {
      setDeletingJourney(false);
    }
  };

  // This creates a new journey with minimal fields.
  const handleCreateJourney = async () => {
    setSavingJourney(true);
    setMessage(null);
    try {
      if (!newJourney.title.trim()) {
        throw new Error("Title is required for a new journey.");
      }
      const response = await fetch("/api/admin/journeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newJourney.title,
          slug: newJourney.slug,
          intro: newJourney.intro,
          isStandard: newJourney.isStandard,
          objectivesText: "",
          status: "draft",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not create journey.");

      setJourneys((prev) => [data.journey, ...prev]);
      setSelectedJourneyId(data.journey.id);
      setJourneyDetail(data.journey);
      setJourneyForm(buildJourneyForm(data.journey));
      setNewJourney({ title: "", slug: "", intro: "", isStandard: false });
      setMessage("Journey created.");
    } catch (error: any) {
      console.error("Creating journey failed:", error);
      setMessage(error?.message || "Could not create journey.");
    } finally {
      setSavingJourney(false);
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
      setMessage("Step saved.");
    } catch (error: any) {
      console.error("Saving step failed:", error);
      setMessage(error?.message || "Could not save step.");
    } finally {
      setStepSaving(null);
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

    setReordering(true);
    setMessage(null);
    try {
      const orderedStepIds = reordered.map((step, idx) => step.id);
      const response = await fetch(`/api/admin/journeys/${journeyDetail.id}/steps/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedStepIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not reorder steps.");

      setJourneyDetail((prev) => (prev ? { ...prev, steps: data.steps } : prev));
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
            steps: prev.steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)),
          }
        : prev
    );
  };

  // This formats timestamps in a simple way.
  const formatDate = (value: string | Date | null | undefined) => {
    if (!value) return "-";
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleString();
  };

  const journeyObjectivesLines = journeyForm.objectivesText || "";

  return (
    <div className="admin-grid journeys-grid">
      <div className="admin-filters-card">
        <div className="admin-card-head">
          <h3 className="admin-title">Filters</h3>
        </div>
        <label className="admin-label">
          Standard flag
          <select
            className="admin-input"
            value={filters.isStandard}
            onChange={(event) => setFilters((prev) => ({ ...prev, isStandard: event.target.value as Filters["isStandard"] }))}
            disabled={loadingList}
          >
            <option value="all">All</option>
            <option value="standard">Standard only</option>
            <option value="nonstandard">Non-standard</option>
          </select>
        </label>
        <label className="admin-label">
          Status
          <select
            className="admin-input"
            value={filters.status}
            onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
            disabled={loadingList}
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="awaiting_review">Awaiting review</option>
            <option value="active">Active</option>
              <option value="completed">Completed</option>
          </select>
        </label>
        <label className="admin-label">
          User email (for personalized journeys)
          <input
            className="admin-input"
            type="text"
            value={filters.userEmail}
            onChange={(event) => setFilters((prev) => ({ ...prev, userEmail: event.target.value }))}
            placeholder="Search by email"
            disabled={loadingList}
          />
        </label>
        {loadingList ? <p className="tiny-note">Loading journeys...</p> : null}

        <div className="admin-card-head" style={{ marginTop: "16px" }}>
          <h3 className="admin-title">Create journey</h3>
        </div>
        <label className="admin-label">
          Title
          <input
            className="admin-input"
            type="text"
            value={newJourney.title}
            onChange={(event) => setNewJourney((prev) => ({ ...prev, title: event.target.value }))}
          />
        </label>
        <label className="admin-label">
          Slug (optional)
          <input
            className="admin-input"
            type="text"
            value={newJourney.slug}
            onChange={(event) => setNewJourney((prev) => ({ ...prev, slug: event.target.value }))}
          />
        </label>
        <label className="admin-label">
          Intro
          <textarea
            className="admin-input"
            rows={3}
            value={newJourney.intro}
            onChange={(event) => setNewJourney((prev) => ({ ...prev, intro: event.target.value }))}
          />
        </label>
        <label className="admin-label checkbox">
          <input
            type="checkbox"
            checked={newJourney.isStandard}
            onChange={(event) => setNewJourney((prev) => ({ ...prev, isStandard: event.target.checked }))}
          />
          <span>Standard journey</span>
        </label>
        <button type="button" className="primary-button" onClick={handleCreateJourney} disabled={savingJourney}>
          {savingJourney ? "Saving..." : "Create journey"}
        </button>
      </div>

      <div className="journeys-right-stack">
        <div className="admin-list-card">
        <div className="admin-card-head">
          <h3 className="admin-title">Journeys</h3>
          <p className="tiny-note">{journeys.length} items</p>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Standard</th>
                <th>User email</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {journeys.map((journey) => (
                <tr
                  key={journey.id}
                  className={journey.id === selectedJourneyId ? "selected-row" : ""}
                  onClick={() => loadJourneyDetail(journey.id)}
                >
                  <td>{journey.title}</td>
                  <td>{journey.slug || "-"}</td>
                  <td>
                    <span className={`pill ${journey.isStandard ? "pill-live" : "pill-dim"}`}>
                      {journey.isStandard ? "Standard" : "Personalized"}
                    </span>
                  </td>
                  <td>{journey.personalizedForUser?.email || "-"}</td>
                  <td>
                    <span
                      className="tiny-note"
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "10px",
                        fontWeight: 600,
                        ...(statusStyles[journey.status] || {}),
                      }}
                    >
                      {statusLabels[journey.status] || journey.status}
                    </span>
                  </td>
                  <td>{formatDate(journey.updatedAt)}</td>
                </tr>
              ))}
              {journeys.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "12px" }}>
                    No journeys found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

        <div className="admin-form-card">
            <div className="admin-card-head">
              <div>
                <h3 className="admin-title">Journey detail</h3>
                {needAnalysisChatId ? (
                  <Link href={`/chats/${needAnalysisChatId}`} className="tiny-note link-button" target="_blank">
                    Need-analysis chat
                  </Link>
                ) : null}
              </div>
              {journeyDetail ? (
                <button
                  type="button"
                  className="secondary-button danger"
                  onClick={handleDeleteJourney}
                  disabled={deletingJourney}
                >
                  {deletingJourney ? "Deleting..." : "Delete journey"}
                </button>
              ) : null}
            </div>

        {loadingDetail && <p className="tiny-note">Loading journey...</p>}
        {!journeyDetail ? (
          <p className="tiny-note">Select a journey to edit.</p>
        ) : (
          <>
            <div className="admin-form-grid single-column-grid">
              <label className="admin-label">
                Title
                <input
                  className="admin-input"
                  type="text"
                  value={journeyForm.title}
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, title: event.target.value }))}
                />
              </label>
              <label className="admin-label">
                Slug
                <input
                  className="admin-input"
                  type="text"
                  value={journeyForm.slug}
                  disabled={journeyDetail.status === "active"}
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, slug: event.target.value }))}
                />
              </label>
              <label className="admin-label">
                Status
                <select
                  className="admin-input"
                  style={statusStyles[journeyForm.status] || undefined}
                  value={journeyForm.status}
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, status: event.target.value }))}
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
                  onChange={(event) =>
                    setJourneyForm((prev) => ({
                      ...prev,
                      isStandard: event.target.checked,
                      personalizedUserEmail: event.target.checked ? "" : prev.personalizedUserEmail,
                    }))
                  }
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
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, personalizedUserEmail: event.target.value }))}
                  placeholder="email@example.com"
                />
              </label>
              <label className="admin-label">
                Intro
                <textarea
                  className="admin-input"
                  rows={3}
                  value={journeyForm.intro}
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, intro: event.target.value }))}
                />
              </label>
              <label className="admin-label">
                Objectives (one per line)
                <textarea
                  className="admin-input"
                  rows={4}
                  value={journeyObjectivesLines}
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, objectivesText: event.target.value }))}
                />
              </label>
              <label className="admin-label">
                User goal summary
                <textarea
                  className="admin-input"
                  rows={3}
                  value={journeyForm.userGoalSummary}
                  onChange={(event) => setJourneyForm((prev) => ({ ...prev, userGoalSummary: event.target.value }))}
                />
              </label>
            </div>

            <div className="admin-actions">
              <button type="button" className="primary-button" onClick={handleSaveJourney} disabled={savingJourney}>
                {savingJourney ? "Saving..." : "Save journey"}
              </button>
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
                            {step.sessionOutline?.title || "Untitled outline"}
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
                            ↑
                          </button>
                          <button
                            type="button"
                            className="secondary-button"
                            onClick={() => handleReorder(step.id, "down")}
                            disabled={reordering || index === journeyDetail.steps.length - 1}
                          >
                            ↓
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
                              {option.title} — {option.slug}
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
                                href={`/chats/${chat.id}`}
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
                          disabled={stepSaving === step.id}
                        >
                          {stepSaving === step.id ? "Saving..." : "Save step"}
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
                              {option.title} — {option.slug}
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

        {message ? <span className="tiny-note" style={{ color: message === "Saved." ? "var(--text-soft)" : "#842029" }}>{message}</span> : null}
      </div>
      </div>
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
