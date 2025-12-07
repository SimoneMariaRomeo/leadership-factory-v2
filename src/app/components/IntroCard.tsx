"use client";

// This card shows the intro content with a logo and a soft typing effect.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Paragraph = {
  text: string;
  italic?: boolean;
};

type IntroCardProps = {
  title: string;
  paragraphs: Paragraph[];
  button: {
    label: string;
    href: string;
  };
};

export default function IntroCard({ title, paragraphs, button }: IntroCardProps) {
  const [typedTitle, setTypedTitle] = useState<string>("");
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>(() => paragraphs.map(() => ""));
  const [paragraphIndex, setParagraphIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const isJsdom = typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom");
  const skipTyping =
    isJsdom || (typeof process !== "undefined" && (!process.env.NODE_ENV || process.env.NODE_ENV === "test"));

  // Reset typing whenever the content changes.
  useEffect(() => {
    setTypedTitle("");
    setTitleIndex(0);
    setTypedParagraphs(paragraphs.map(() => ""));
    setParagraphIndex(0);
  }, [title, paragraphs]);

  // In tests (or when NODE_ENV is unset), show full text immediately to keep tests stable.
  useEffect(() => {
    if (skipTyping) {
      setTypedTitle(title);
      setTitleIndex(title.length);
      setTypedParagraphs(paragraphs.map((p) => p.text));
      setParagraphIndex(paragraphs.length);
    }
  }, [skipTyping, title, paragraphs]);

  const titleDone = useMemo(() => titleIndex >= title.length, [titleIndex, title.length]);

  // Type the title first.
  useEffect(() => {
    if (skipTyping) return;
    if (titleIndex < title.length) {
      const timer = setTimeout(() => {
        setTypedTitle(title.slice(0, titleIndex + 1));
        setTitleIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [titleIndex, title]);

  // Then type each paragraph one by one.
  useEffect(() => {
    if (skipTyping) return;
    if (!titleDone || paragraphIndex >= paragraphs.length) return;
    const currentText = paragraphs[paragraphIndex].text;
    const currentTyped = typedParagraphs[paragraphIndex] || "";

    if (currentTyped.length < currentText.length) {
      const timer = setTimeout(() => {
        setTypedParagraphs((prev) => {
          const copy = [...prev];
          copy[paragraphIndex] = currentText.slice(0, currentTyped.length + 1);
          return copy;
        });
      }, 14);
      return () => clearTimeout(timer);
    }

    const nextTimer = setTimeout(() => {
      setParagraphIndex((prev) => prev + 1);
    }, 120);
    return () => clearTimeout(nextTimer);
  }, [titleDone, paragraphIndex, paragraphs, typedParagraphs]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    setLoading(true);
    router.push(button.href);
  };

  return (
    <div className="luxury-gradient">
      <main className="intro-card">
        <div className="intro-row">
          <div className="intro-logo">
            <Image src="/coai-logo.png" alt="Coach logo" width={56} height={56} className="intro-logo-img" />
          </div>
          <div className="intro-text-col">
            <h1 className="intro-title">{typedTitle}</h1>
            {paragraphs.map((paragraph, idx) => (
              <p
                key={paragraph.text}
                className={`intro-paragraph${paragraph.italic ? " intro-paragraph-italic" : ""}`}
              >
                {typedParagraphs[idx]}
              </p>
            ))}
          </div>
        </div>
        <Link
          className="intro-button"
          href={button.href}
          onClick={handleClick}
          data-loading={loading ? "true" : "false"}
          aria-busy={loading}
        >
          <span className="btn-spinner" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="btn-label">{button.label}</span>
        </Link>
      </main>
    </div>
  );
}
