"use client";

// This component lists session outlines and lets admins filter or create them.
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

type SessionsListClientProps = {
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

// This renders the sessions list with filters and a create form.
export default function SessionsListClient({ journeys, initialOutlines }: SessionsListClientProps) {
  const router = useRouter();
  const [outlines, setOutlines] = useState<OutlineRecord[]>(initialOutlines);
  const [filters, setFilters] = useState<Filters>({ journeyId: "", search: "" });
  const [form, setForm] = useState<OutlineForm>(() => buildForm(null));
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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

  // This saves a new outline.
  const handleCreate = async () => {
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

      const response = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not create outline.");

      setOutlines((prev) => [data.outline, ...prev]);
      setForm(buildForm(null));
      setMessage("Outline created.");
      router.push(`/admin/sessions/${data.outline.id}`);
    } catch (error: any) {
      console.error("Creating outline failed:", error);
      setMessage(error?.message || "Could not create outline.");
    } finally {
      setSaving(false);
    }
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

        <div className="admin-card-head" style={{ marginTop: "16px" }}>
          <h3 className="admin-title">Create outline</h3>
        </div>
        <label className="admin-label">
          Title
          <input
            className="admin-input"
            type="text"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
        </label>

        <label className="admin-label">
          Slug
          <input
            className="admin-input"
            type="text"
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
          />
        </label>

        <label className="admin-label">
          Objective
          <input
            className="admin-input"
            type="text"
            value={form.objective}
            onChange={(event) => setForm((prev) => ({ ...prev, objective: event.target.value }))}
          />
        </label>

        <label className="admin-label">
          First user message
          <textarea
            className="admin-input"
            rows={3}
            value={form.firstUserMessage}
            onChange={(event) => setForm((prev) => ({ ...prev, firstUserMessage: event.target.value }))}
          />
        </label>

        <label className="admin-label">
          Content (large prompt)
          <textarea
            className="admin-input big"
            rows={8}
            value={form.content}
            onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          />
        </label>

        <label className="admin-label">
          Bot tools (large)
          <textarea
            className="admin-input big"
            rows={6}
            value={form.botTools}
            onChange={(event) => setForm((prev) => ({ ...prev, botTools: event.target.value }))}
          />
        </label>

        <label className="admin-label">
          Tags (plain text or JSON)
          <input
            className="admin-input"
            type="text"
            value={form.tagsText}
            onChange={(event) => setForm((prev) => ({ ...prev, tagsText: event.target.value }))}
          />
        </label>

        <button type="button" className="primary-button" onClick={handleCreate} disabled={saving}>
          {saving ? "Saving..." : "Create outline"}
        </button>
        {message ? <p className="tiny-note">{message}</p> : null}
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
                {outlines.map((outline) => (
                  <tr key={outline.id}>
                    <td>{outline.title}</td>
                    <td>{outline.slug}</td>
                    <td>{formatDate(outline.updatedAt)}</td>
                    <td>
                      <Link className="link-button" href={`/admin/sessions/${outline.id}`}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
                {outlines.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "12px" }}>
                      No outlines yet.
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

// This builds the form state from a blank slate.
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
