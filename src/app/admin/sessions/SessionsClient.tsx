"use client";

// This component runs the admin outline UI in the browser.
import { useEffect, useMemo, useState } from "react";

type JourneyOption = {
  id: string;
  title: string;
  slug: string | null;
  isStandard?: boolean;
};

type OutlineRecord = {
  id: string;
  title: string;
  slug: string;
  order: number;
  objective: string | null;
  content: string;
  botTools: string;
  firstUserMessage: string;
  tags: any;
  updatedAt: string | Date;
  _count: { steps: number };
};

type SessionsClientProps = {
  journeys: JourneyOption[];
  initialOutlines: OutlineRecord[];
};

type Filters = {
  journeyId: string;
  search: string;
};

type OutlineForm = {
  title: string;
  slug: string;
  objective: string;
  content: string;
  botTools: string;
  firstUserMessage: string;
  tagsText: string;
};

export default function SessionsClient({ journeys, initialOutlines }: SessionsClientProps) {
  const [outlines, setOutlines] = useState<OutlineRecord[]>(initialOutlines);
  const [filters, setFilters] = useState<Filters>({ journeyId: "", search: "" });
  const [selectedId, setSelectedId] = useState<string | null>(initialOutlines[0]?.id || null);
  const [form, setForm] = useState<OutlineForm>(() => buildForm(initialOutlines[0]));
  const [creatingNew, setCreatingNew] = useState(initialOutlines.length === 0);
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedOutline = useMemo(() => outlines.find((item) => item.id === selectedId) || null, [outlines, selectedId]);

  useEffect(() => {
    if (selectedId && selectedOutline) {
      setForm(buildForm(selectedOutline));
      setCreatingNew(false);
    } else if (!selectedId) {
      setForm(buildForm(null));
      setCreatingNew(true);
    }
  }, [selectedId, selectedOutline]);

  // This reloads outlines when filters change.
  useEffect(() => {
    const controller = new AbortController();
    const fetchOutlines = async () => {
      setLoadingList(true);
      const query = new URLSearchParams();
      if (filters.journeyId) query.set("journeyId", filters.journeyId);
      if (filters.search) query.set("search", filters.search);

      try {
        const response = await fetch(`/api/admin/sessions?${query.toString()}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Could not load outlines.");
        }
        setOutlines(data.outlines || []);
        if (selectedId && !data.outlines?.some((item: any) => item.id === selectedId)) {
          setSelectedId(null);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.error("Loading outlines failed:", error);
        setMessage(error?.message || "Could not load outlines.");
      } finally {
        setLoadingList(false);
      }
    };

    fetchOutlines();
    return () => controller.abort();
  }, [filters]);

  // This marks a row dirty when edits are in progress.
  const markDirty = (id: string | null) => {
    if (!id) return;
    setDirtyIds((prev) => new Set(prev).add(id));
  };

  // This saves a new or existing outline.
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const payload: any = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      objective: form.objective.trim(),
      content: form.content,
      botTools: form.botTools,
      firstUserMessage: form.firstUserMessage,
      tags: parseTags(form.tagsText),
    };

    try {
      if (!payload.title || !payload.slug || !payload.content || !payload.botTools || !payload.firstUserMessage) {
        throw new Error("Please fill the required fields.");
      }

      if (creatingNew) {
        const response = await fetch("/api/admin/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Could not create outline.");

        setOutlines((prev) => [data.outline, ...prev]);
        setSelectedId(data.outline.id);
        setCreatingNew(false);
        setDirtyIds((prev) => {
          const next = new Set(prev);
          next.delete(data.outline.id);
          return next;
        });
        setMessage("Saved.");
      } else if (selectedId) {
        const response = await fetch(`/api/admin/sessions/${selectedId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Could not update outline.");

        setOutlines((prev) => prev.map((item) => (item.id === selectedId ? data.outline : item)));
        setDirtyIds((prev) => {
          const next = new Set(prev);
          next.delete(selectedId);
          return next;
        });
        setMessage("Saved.");
      }
    } catch (error: any) {
      console.error("Saving outline failed:", error);
      setMessage(error?.message || "Could not save outline.");
    } finally {
      setSaving(false);
    }
  };

  // This deletes the selected outline after confirmation.
  const handleDelete = async () => {
    if (!selectedId || !selectedOutline) return;
    const warn =
      selectedOutline._count?.steps && selectedOutline._count.steps > 0
        ? `This outline is used by ${selectedOutline._count.steps} step(s). Deleting it will also delete those steps. Continue?`
        : "Are you sure you want to delete this outline?";
    if (!window.confirm(warn)) return;

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/sessions/${selectedId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not delete outline.");

      setOutlines((prev) => prev.filter((item) => item.id !== selectedId));
      setSelectedId(null);
      setCreatingNew(true);
      setMessage("Outline deleted.");
    } catch (error: any) {
      console.error("Deleting outline failed:", error);
      setMessage(error?.message || "Could not delete outline.");
    } finally {
      setSaving(false);
    }
  };

  // This resets the form for a fresh outline.
  const startCreate = () => {
    setSelectedId(null);
    setCreatingNew(true);
    setForm(buildForm(null));
    setMessage(null);
  };

  // This formats the update time for display.
  const formatDate = (value: string | Date) => {
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleString();
  };

  return (
    <div className="admin-grid">
      <div className="admin-filters-card">
        <div className="admin-card-head">
          <h3 className="admin-title">Filters</h3>
          <button type="button" className="secondary-button" onClick={startCreate}>
            New outline
          </button>
        </div>
          <label className="admin-label">
            Journey
            <select
              className="admin-input"
              value={filters.journeyId}
              onChange={(event) => setFilters((prev) => ({ ...prev, journeyId: event.target.value }))}
              disabled={loadingList}
            >
              <option value="">All journeys</option>
              {journeys.map((journey) => (
                <option key={journey.id} value={journey.id}>
                  {journey.title}
                </option>
              ))}
            </select>
          </label>
        <label className="admin-label">
          Search title or slug
          <input
            type="text"
            className="admin-input"
            placeholder="Search..."
            value={filters.search}
            onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
            disabled={loadingList}
          />
        </label>
        {loadingList ? <p className="tiny-note">Loading outlines...</p> : null}
      </div>

      <div className="admin-stack">
        <div className="admin-list-card">
        <div className="admin-card-head">
          <h3 className="admin-title">Outlines</h3>
          <p className="tiny-note">{outlines.length} items</p>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {outlines.map((outline) => {
                const isDirty = dirtyIds.has(outline.id);
                return (
                  <tr
                    key={outline.id}
                    className={`${outline.id === selectedId ? "selected-row" : ""} ${isDirty ? "dirty-row" : ""}`}
                    onClick={() => {
                      setSelectedId(outline.id);
                      setMessage(null);
                    }}
                  >
                    <td>{outline.title}</td>
                    <td>{outline.slug}</td>
                    <td>{formatDate(outline.updatedAt)}</td>
                    <td>
                      <button
                        type="button"
                        className="link-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedId(outline.id);
                          setMessage(null);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
              {outlines.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "12px" }}>
                    No outlines yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        {dirtyIds.size > 0 ? <p className="dirty-note" style={{ marginTop: 8 }}>Unsaved rows are highlighted. Save to clear.</p> : null}
      </div>

        <div className="admin-form-card">
        <div className="admin-card-head">
          <div>
            <h3 className="admin-title">{creatingNew ? "Create outline" : "Edit outline"}</h3>
            {selectedOutline?._count?.steps ? (
              <p className="tiny-note">{selectedOutline._count.steps} step(s) use this outline.</p>
            ) : null}
          </div>
          {selectedId ? (
            <button type="button" className="secondary-button danger" onClick={handleDelete} disabled={saving}>
              Delete
            </button>
          ) : null}
        </div>

        <div className="admin-form-grid single-column-grid">
          <label className="admin-label">
            Title
            <input
              className="admin-input"
              type="text"
              value={form.title}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, title: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>

          <label className="admin-label">
            Slug
            <input
              className="admin-input"
              type="text"
              value={form.slug}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, slug: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>

          <label className="admin-label">
            Objective
            <input
              className="admin-input"
              type="text"
              value={form.objective}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, objective: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>

          <label className="admin-label">
            First user message
            <textarea
              className="admin-input"
              rows={3}
              value={form.firstUserMessage}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, firstUserMessage: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>

          <label className="admin-label">
            Content (large prompt)
            <textarea
              className="admin-input big"
              rows={8}
              value={form.content}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, content: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>

          <label className="admin-label">
            Bot tools (large)
            <textarea
              className="admin-input big"
              rows={6}
              value={form.botTools}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, botTools: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>

          <label className="admin-label">
            Tags (plain text or JSON)
            <input
              className="admin-input"
              type="text"
              value={form.tagsText}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, tagsText: event.target.value }));
                markDirty(selectedId);
              }}
            />
          </label>
        </div>

        <div className="admin-actions">
          <button type="button" className="primary-button" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          {message ? <span className="tiny-note" style={{ color: message === "Saved." ? "var(--text-soft)" : "#842029" }}>{message}</span> : null}
        </div>
        </div>
      </div>
    </div>
  );
}

// This builds the form state from an outline or blank slate.
function buildForm(outline: OutlineRecord | null | undefined): OutlineForm {
  return {
    title: outline?.title || "",
    slug: outline?.slug || "",
    objective: outline?.objective || "",
    content: outline?.content || "",
    botTools: outline?.botTools || "",
    firstUserMessage: outline?.firstUserMessage || "",
    tagsText: outline?.tags ? safeStringify(outline.tags) : "",
  };
}

// This tries to show JSON nicely.
function safeStringify(value: any) {
  try {
    return typeof value === "string" ? value : JSON.stringify(value);
  } catch {
    return "";
  }
}

// This parses tags input into JSON when possible.
function parseTags(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}
