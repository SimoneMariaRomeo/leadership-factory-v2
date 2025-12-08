"use client";

// This component shows the avatar circle and lets the user pick a preset image.
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AVATARS = [
  "avatar_bloom.svg",
  "avatar_bridge.svg",
  "avatar_bulb.svg",
  "avatar_compass.svg",
  "avatar_lighthouse.svg",
  "avatar_mountain.svg",
  "avatar_path.svg",
  "avatar_rings.svg",
  "avatar_seed.svg",
  "avatar_spiral.svg",
];

type AvatarPickerProps = {
  name: string | null;
  email: string | null;
  picture: string | null;
};

export default function AvatarPicker({ name, email, picture }: AvatarPickerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const defaultAvatar = `/avatars/${AVATARS[0]}`;
  const [current, setCurrent] = useState(picture || defaultAvatar);
  const [message, setMessage] = useState<string | null>(null);

  const initial = (name || email || "U").trim().charAt(0).toUpperCase();
  const avatarSrc = current || null;

  const saveAvatar = async (file: string) => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picture: file }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not update avatar.");
      }
      setCurrent(`/avatars/${file}`);
      setMessage(null);
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      console.error("Avatar update failed:", err);
      setMessage(err?.message || "Could not update avatar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="avatar-picker">
      <button
        type="button"
        className="avatar-clickable"
        aria-label="Change avatar"
        onClick={() => setOpen(true)}
        disabled={saving}
      >
        <div className="avatar" aria-label="Profile avatar">
          {avatarSrc ? <Image src={avatarSrc} alt="Profile avatar" width={48} height={48} /> : <span>{initial}</span>}
        </div>
      </button>
      {message ? (
        <span className="tiny-note" style={{ color: "#842029" }}>
          {message}
        </span>
      ) : null}

      {open ? (
        <div className="avatar-modal" role="dialog" aria-modal="true">
          <div className="avatar-modal-backdrop" onClick={() => setOpen(false)} />
          <div className="avatar-modal-content">
            <div className="avatar-modal-head">
              <h3 className="hero-title" style={{ margin: 0, fontSize: "18px" }}>
                Choose an avatar
              </h3>
              <button type="button" className="secondary-button nav-button" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <div className="avatar-grid">
              {AVATARS.map((file) => (
                <button
                  key={file}
                  type="button"
                  className="avatar-choice"
                  onClick={() => saveAvatar(file)}
                  disabled={saving}
                  aria-label={`Use ${file}`}
                >
                  <Image src={`/avatars/${file}`} alt={file} width={72} height={72} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
