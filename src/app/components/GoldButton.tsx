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
    if (loading) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    setLoading(true);
    router.push(href);
  };

  const tailwindHover = asSecondary
    ? "transition-colors hover:bg-white hover:shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
    : "bg-luxury-gold transition-colors hover:bg-luxury-gold-light hover:shadow-[0_16px_28px_rgba(212,175,55,0.35)] transition-all";
  const baseClass = asSecondary ? "secondary-button" : "primary-button";
  const finalClass = `${baseClass} ${tailwindHover} ${className}`.trim();

  return (
    <Link
      href={href}
      className={finalClass}
      onClick={handleClick}
      data-loading={loading ? "true" : "false"}
      aria-busy={loading}
    >
      <span
        className="btn-spinner"
        aria-hidden="true"
        style={{
          display: loading ? "inline-flex" : "none",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
        }}
      >
        <span />
        <span />
        <span />
      </span>
      <span className="btn-label" style={loading ? { visibility: "hidden" } : undefined}>
        {children}
      </span>
    </Link>
  );
}
