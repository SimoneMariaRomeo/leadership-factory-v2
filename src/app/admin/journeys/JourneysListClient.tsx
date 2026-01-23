"use client";

// This component lists journeys and lets admins filter or create them.
import { useEffect, useState } from "react";
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

type Filters = {
  isStandard: "all" | "standard" | "nonstandard";
  status: string;
  userEmail: string;
};

type NewJourneyForm = {
  title: string;
  slug: string;
  intro: string;
  isStandard: boolean;
};

type JourneysListClientProps = {
  initialJourneys: JourneySummary[];
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

// This renders the journeys list with filters and a create form.
export default function JourneysListClient({ initialJourneys }: JourneysListClientProps) {
  const router = useRouter();
  const [journeys, setJourneys] = useState<JourneySummary[]>(initialJourneys);
  const [filters, setFilters] = useState<Filters>({ isStandard: "all", status: "all", userEmail: "" });
  const [loadingList, setLoadingList] = useState(false);
  const [savingJourney, setSavingJourney] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [newJourney, setNewJourney] = useState<NewJourneyForm>({ title: "", slug: "", intro: "", isStandard: false });

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
      setNewJourney({ title: "", slug: "", intro: "", isStandard: false });
      setMessage("Journey created.");
      router.push(`/admin/journeys/${data.journey.id}`);
    } catch (error: any) {
      console.error("Creating journey failed:", error);
      setMessage(error?.message || "Could not create journey.");
    } finally {
      setSavingJourney(false);
    }
  };

  // This formats the update time for display.
  const formatDate = (value: string | Date) => {
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleString();
  };

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
        {message ? <p className="tiny-note">{message}</p> : null}
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
                  <th />
                </tr>
              </thead>
              <tbody>
                {journeys.map((journey) => (
                  <tr key={journey.id}>
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
                    <td>
                      <Link className="link-button" href={`/admin/journeys/${journey.id}`}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
                {journeys.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "12px" }}>
                      No journeys found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
