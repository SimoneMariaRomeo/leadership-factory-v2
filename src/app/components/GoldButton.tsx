"use client";

// This button shows a gold style with a tiny loading spinner before navigation.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type GoldButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  asSecondary?: boolean;
};

export default function GoldButton({ href, children, className = "", asSecondary = false }: GoldButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Stop double clicks while we show the glow.
    if (loading) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    event.preventDefault();
    setTimeout(() => {
      router.push(href);
    }, 380);
  };

  const baseClass = asSecondary ? "secondary-button" : "primary-button";
  const finalClass = `${baseClass} ${className}`.trim();

  return (
    <Link
      href={href}
      className={finalClass}
      onClick={handleClick}
      data-loading={loading ? "true" : "false"}
      aria-busy={loading}
    >
      {!asSecondary && (
        <span className="btn-spinner" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      )}
      <span className="btn-label">{loading ? "Loading..." : children}</span>
    </Link>
  );
}
