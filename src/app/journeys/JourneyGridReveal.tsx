"use client";

// This client component reveals journey cards one by one after the user moves the mouse.
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type JourneyCard = {
  id: string;
  title: string;
  intro: string | null;
  slug: string | null;
};

type JourneyGridRevealProps = {
  journeys: JourneyCard[];
};

export default function JourneyGridReveal({ journeys }: JourneyGridRevealProps) {
  const ordered = useMemo(() => journeys, [journeys]);
  const [visibleCount, setVisibleCount] = useState(() => ordered.length);
  const startedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setVisibleCount(ordered.length);
  }, [ordered.length]);

  useEffect(() => {
    if (visibleCount >= ordered.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [visibleCount, ordered.length]);

  useEffect(() => {
    const kickOff = () => {
      if (startedRef.current) return;
      // If everything is already shown, do nothing so cards stay visible.
      if (visibleCount >= ordered.length) return;
      startedRef.current = true;
      setVisibleCount(1);
      timerRef.current = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= ordered.length) {
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 160);
    };

    const handler = () => kickOff();
    window.addEventListener("pointermove", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("pointermove", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [ordered.length]);

  return (
    <div className="journey-grid">
      {ordered.map((journey, index) => {
        const linkHref = `/journeys/${journey.slug || journey.id}`;
        const isVisible = index < visibleCount;
        return (
          <Link
            key={journey.id}
            href={linkHref}
            className={`journey-card journey-card-link-wrapper journey-card-fancy journey-reveal-card ${
              isVisible ? "journey-reveal-card--on" : ""
            }`}
            aria-label={journey.title}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <h3 className="journey-title">{journey.title}</h3>
            <p className="journey-intro">
              {journey.intro || "This journey outline will be expanded with steps in the next step of the build."}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
