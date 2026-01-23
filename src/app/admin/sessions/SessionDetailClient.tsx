"use client";

// This component edits one session outline in the browser.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

type OutlineForm = {
  title: string;
  slug: string;
  objective: string;
  content: string;
  botTools: string;
  firstUserMessage: string;
  tagsText: string;
};

type SessionDetailClientProps = {
  initialOutline: OutlineRecord;
};

// This renders the session outline editor for admins.
export default function SessionDetailClient({ initialOutline }: SessionDetailClientProps) {
  const router = useRouter();
  const [outline, setOutline] = useState<OutlineRecord>(initialOutline);
  const [form, setForm] = useState<OutlineForm>(() => buildForm(initialOutline));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setForm(buildForm(outline));
    setDirty(false);
  }, [outline]);

  // This saves edits to the outline.
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

      const response = await fetch(`/api/admin/sessions/${outline.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not update outline.");

      setOutline(data.outline);
      setMessage("Saved.");
      setDirty(false);
    } catch (error: any) {
      console.error("Saving outline failed:", error);
      setMessage(error?.message || "Could not save outline.");
    } finally {
      setSaving(false);
    }
  };

  // This deletes the outline after confirmation.
  const handleDelete = async () => {
    const warn =
      outline._count?.steps && outline._count.steps > 0
        ? `This outline is used by ${outline._count.steps} step(s). Deleting it will also delete those steps. Continue?`
        : "Are you sure you want to delete this outline?";
    if (!window.confirm(warn)) return;

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/sessions/${outline.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not delete outline.");

      setMessage("Outline deleted.");
      router.push("/admin/sessions");
    } catch (error: any) {
      console.error("Deleting outline failed:", error);
      setMessage(error?.message || "Could not delete outline.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`admin-form-card ${dirty ? "dirty-card" : ""}`}>
      <div className="admin-card-head">
        <div>
          <h3 className="admin-title">Edit outline</h3>
          {outline?._count?.steps ? <p className="tiny-note">{outline._count.steps} step(s) use this outline.</p> : null}
        </div>
        <button type="button" className="secondary-button danger" onClick={handleDelete} disabled={saving}>
          Delete
        </button>
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
              setDirty(true);
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
              setDirty(true);
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
              setDirty(true);
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
              setDirty(true);
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
              setDirty(true);
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
              setDirty(true);
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
              setDirty(true);
            }}
          />
        </label>
      </div>

      <div className="admin-actions">
        <button type="button" className="primary-button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        {message ? <span className="tiny-note">{message}</span> : null}
        {dirty ? <span className="dirty-note">Unsaved changes</span> : null}
      </div>
    </div>
  );
}

// This builds the form state from an outline.
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
