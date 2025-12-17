"use client";

// This page shows what happens next, checks auth, and commits the goal.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./AuthModal";
import GoldButton from "../components/GoldButton";
import { clearPendingGoal, getPendingGoal } from "../../lib/pending-goal-store";
import {
  clearJourneySuggestion,
  readJourneySuggestion,
  saveJourneySuggestion,
  type JourneySuggestion,
} from "../../lib/pending-journey-suggestion";

const FALLBACK_GOAL = "No learning goal found. Please start again from the beginning.";

type WhatsNextPageProps = {
  searchParams: { goal?: string };
};

// This component shows the confirmed goal, handles auth, and sends the commit request.
export default function WhatsNextPage({ searchParams }: WhatsNextPageProps) {
  const router = useRouter();
  const [goal, setGoal] = useState<string | null>(null);
  const [hasStoredGoal, setHasStoredGoal] = useState(false);
  const paragraphs = useMemo(
    () => [
      "Here is a personalized learning suggestion based on what you shared.",
      "Our team will now create the detailed sessions and steps for this journey.",
      "If you want a different angle, ask for another recommendation, then confirm to lock it in.",
      "Please make sure you are signed in so we can send the details to your inbox.",
    ],
    []
  );
  const isJsdom = typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom");
  const skipTyping =
    isJsdom || (typeof process !== "undefined" && (!process.env.NODE_ENV || process.env.NODE_ENV === "test"));
  const initialTypedTitle = skipTyping ? "You did it!" : "";
  const initialTitleIndex = skipTyping ? "You did it!".length : 0;
  const initialParagraphIndex = skipTyping ? paragraphs.length : 0;
  const initialParagraphs = skipTyping ? [...paragraphs] : paragraphs.map(() => "");
  const [typedTitle, setTypedTitle] = useState(initialTypedTitle);
  const [titleIndex, setTitleIndex] = useState(initialTitleIndex);
  const [paragraphIndex, setParagraphIndex] = useState(initialParagraphIndex);
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>(initialParagraphs);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [suggestion, setSuggestion] = useState<JourneySuggestion | null>(null);
  const [avoidTitles, setAvoidTitles] = useState<string[]>([]);
  const [avoidJourneys, setAvoidJourneys] = useState<{ title: string; intro: string | null }[]>([]);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");
  const avoidTitlesRef = useRef<string[]>([]);
  const avoidJourneysRef = useRef<{ title: string; intro: string | null }[]>([]);
  const titleDone = titleIndex >= "You did it!".length;

  // This asks the backend for a fresh journey suggestion and avoids repeating titles.
  const requestSuggestion = useCallback(
    async (extraAvoid: string[] = []) => {
      if (!hasStoredGoal || !goal) return;
      setSuggestionError("");
      setLoadingSuggestion(true);

      const avoidSet = new Set<string>(
        [...avoidTitlesRef.current, ...extraAvoid]
          .map((item) => (typeof item === "string" ? item.trim() : ""))
          .filter((item) => item.length > 0)
      );
      const avoidList = Array.from(avoidSet);
      const avoidJourneyMap = new Map<string, string | null>(
        avoidJourneysRef.current.map((j) => [j.title, j.intro || null])
      );
      avoidList.forEach((title) => {
        if (!avoidJourneyMap.has(title)) {
          avoidJourneyMap.set(title, null);
        }
      });
      const avoidJourneysPayload = Array.from(avoidJourneyMap.entries()).map(([title, intro]) => ({
        title,
        intro: intro || null,
      }));

      try {
        const response = await fetch("/api/recommend-journey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ learningGoal: goal, avoidJourneys: avoidJourneysPayload }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to recommend a journey.");
        }

        const data = await response.json();
        if (typeof data?.title !== "string" || typeof data?.intro !== "string") {
          throw new Error("Invalid recommendation payload.");
        }

        const nextAvoid = Array.from(new Set([...avoidList, data.title.trim()].filter(Boolean)));
        const nextSuggestion: JourneySuggestion = {
          title: data.title.trim(),
          intro: data.intro.trim(),
          avoidTitles: nextAvoid,
          avoidJourneys: [
            ...avoidJourneysPayload.filter((j) => j.title !== data.title.trim()),
            { title: data.title.trim(), intro: data.intro.trim() || null },
          ],
        };
        setSuggestion(nextSuggestion);
        setAvoidTitles(nextAvoid);
        setAvoidJourneys(
          Array.from(
            new Map(
              (nextSuggestion.avoidJourneys || []).map((j) => [j.title, j.intro || null])
            ).entries()
          ).map(([title, intro]) => ({ title, intro }))
        );
        saveJourneySuggestion(nextSuggestion);
      } catch (err) {
        console.error("Recommend journey failed:", err);
        setSuggestionError("Could not load a journey right now. Please try again.");
      } finally {
        setLoadingSuggestion(false);
      }
    },
    [goal, hasStoredGoal]
  );

  useEffect(() => {
    avoidTitlesRef.current = avoidTitles;
  }, [avoidTitles]);

  useEffect(() => {
    avoidJourneysRef.current = avoidJourneys;
  }, [avoidJourneys]);

  // This loads the goal from session storage or the query string.
  useEffect(() => {
    const storedGoal = getPendingGoal();
    if (storedGoal) {
      setGoal(storedGoal);
      setHasStoredGoal(true);
      return;
    }
    const queryGoal = decodeURIComponent(searchParams?.goal || "").trim();
    if (queryGoal) {
      setGoal(queryGoal);
      setHasStoredGoal(true);
    } else {
      setGoal(null);
      setHasStoredGoal(false);
    }
  }, [searchParams]);

  // This loads any stored journey suggestion or fetches a fresh one.
  useEffect(() => {
    if (!hasStoredGoal || !goal) {
      setSuggestion(null);
      setAvoidTitles([]);
      clearJourneySuggestion();
      return;
    }

    const storedSuggestion = readJourneySuggestion();
    if (storedSuggestion) {
      const avoid = storedSuggestion.avoidTitles.length ? storedSuggestion.avoidTitles : [storedSuggestion.title];
      setSuggestion(storedSuggestion);
      setAvoidTitles(Array.from(new Set(avoid)));
      if (storedSuggestion.avoidJourneys?.length) {
        setAvoidJourneys(
          Array.from(
            new Map(
              storedSuggestion.avoidJourneys.map((j) => [j.title, j.intro || null])
            ).entries()
          ).map(([title, intro]) => ({ title, intro }))
        );
      } else {
        setAvoidJourneys([{ title: storedSuggestion.title, intro: storedSuggestion.intro }]);
      }
      return;
    }

    requestSuggestion();
  }, [goal, hasStoredGoal, requestSuggestion]);

  // This fetches whether a user is already logged in.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", { credentials: "include" });
        const data = await response.json();
        setIsAuthenticated(Boolean(data?.user));
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  // This resets the typing animation when the goal changes.
  useEffect(() => {
    if (skipTyping) {
      setTypedTitle("You did it!");
      setTitleIndex("You did it!".length);
      setParagraphIndex(paragraphs.length);
      setTypedParagraphs(paragraphs.map((p) => p));
      return;
    }
    setTypedTitle("");
    setTitleIndex(0);
    setParagraphIndex(0);
    setTypedParagraphs(paragraphs.map(() => ""));
  }, [goal, paragraphs, skipTyping]);

  // This types the title letter by letter.
  useEffect(() => {
    const full = "You did it!";
    if (skipTyping) return;
    if (titleIndex < full.length) {
      const timer = setTimeout(() => {
        setTypedTitle(full.slice(0, titleIndex + 1));
        setTitleIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [titleIndex, skipTyping]);

  // This types each paragraph once the title is finished.
  useEffect(() => {
    if (skipTyping) return;
    if (!titleDone || paragraphIndex >= paragraphs.length) return;
    const currentText = paragraphs[paragraphIndex];
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

    const nextTimer = setTimeout(() => setParagraphIndex((prev) => prev + 1), 120);
    return () => clearTimeout(nextTimer);
  }, [titleDone, paragraphIndex, paragraphs, typedParagraphs, skipTyping]);

  // This calls the backend to save the goal and create the journey.
  const commitGoal = useCallback(async () => {
    if (!goal || !hasStoredGoal) return;
    if (!suggestion) {
      setErrorMessage("Please wait for your journey suggestion first.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/whats-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          learningGoal: goal,
          recommendedTitle: suggestion.title,
          recommendedIntro: suggestion.intro,
        }),
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setShowAuthModal(true);
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Goal commit failed.");
      }

      clearPendingGoal();
      clearJourneySuggestion();
      setSuggestion(null);
      setAvoidTitles([]);
      router.push("/my-profile");
    } catch (err) {
      console.error("Goal commit failed:", err);
      setErrorMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }, [goal, hasStoredGoal, router, suggestion]);

  // This triggers a fresh recommendation when the user asks for a different journey.
  const handleRecommendAnother = useCallback(() => {
    if (!hasStoredGoal || !goal || loadingSuggestion) return;
    requestSuggestion(suggestion?.title ? [suggestion.title] : []);
  }, [goal, hasStoredGoal, loadingSuggestion, requestSuggestion, suggestion?.title]);

  // This decides what to do when the CTA is clicked.
  const handleCtaClick = () => {
    if (!hasStoredGoal || isSubmitting) return;
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    commitGoal();
  };

  // This runs after the modal finishes login or signup.
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    commitGoal();
  };

  return (
    <div className="luxury-gradient">
      <main className="intro-card">
        <div className="intro-row">
          <div className="intro-logo">
            <img className="intro-logo-img" src="/coai-logo.png" alt="Coach logo" />
          </div>
          <div className="intro-text-col">
            <h1 className="intro-title">{typedTitle}</h1>
            <p className="intro-paragraph">{typedParagraphs[0]}</p>
            <div className="goal-box" style={{ width: "100%", maxWidth: "680px" }}>
              {hasStoredGoal ? (
                <>
                  <div style={{ fontWeight: 700, marginBottom: "8px" }}>
                    {suggestion?.title ||
                      (loadingSuggestion ? "Preparing your journey..." : "We are drafting your journey now.")}
                  </div>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {suggestion?.intro ||
                      (loadingSuggestion
                        ? "Hang tight while we tailor the intro."
                        : "If nothing appears, tap Recommend another journey.")}
                  </div>
                </>
              ) : (
                <div>{FALLBACK_GOAL}</div>
              )}
            </div>
            <p className="intro-paragraph">{typedParagraphs[1]}</p>
            <p className="intro-paragraph">{typedParagraphs[2]}</p>
            <p className="intro-paragraph">{typedParagraphs[3]}</p>
            {suggestionError && (
              <div
                role="alert"
                style={{
                  marginTop: "10px",
                  color: "#842029",
                  background: "rgba(209, 67, 67, 0.12)",
                  border: "1px solid rgba(209, 67, 67, 0.35)",
                  padding: "10px 12px",
                  borderRadius: "12px",
                }}
              >
                {suggestionError}
              </div>
            )}
          </div>
        </div>
        {hasStoredGoal ? (
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "flex-start" }}>
            <button
              className="secondary-button"
              type="button"
              onClick={handleRecommendAnother}
              disabled={loadingSuggestion || isSubmitting || checkingAuth}
              style={{ minWidth: "210px" }}
            >
              {loadingSuggestion ? "Working..." : "Recommend another journey"}
            </button>
            <button
              className="primary-button bg-luxury-gold transition-colors hover:bg-luxury-gold-light hover:shadow-[0_16px_28px_rgba(212,175,55,0.35)] transition-all"
              type="button"
              onClick={handleCtaClick}
              data-loading={isSubmitting ? "true" : "false"}
              aria-busy={isSubmitting}
              disabled={isSubmitting || !hasStoredGoal || checkingAuth || loadingSuggestion}
              style={{ minWidth: "170px" }}
            >
              <span
                className="btn-spinner"
                aria-hidden="true"
                style={{
                  display: isSubmitting ? "inline-flex" : "none",
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
              <span className="btn-label" style={isSubmitting ? { visibility: "hidden" } : undefined}>
                YES, I'M IN!
              </span>
            </button>
          </div>
        ) : (
          <GoldButton href="/learning-guide-intro" asSecondary>
            Start again
          </GoldButton>
        )}
        {errorMessage && (
          <div
            role="alert"
            style={{
              marginTop: "6px",
              color: "#842029",
              background: "rgba(209, 67, 67, 0.12)",
              border: "1px solid rgba(209, 67, 67, 0.35)",
              padding: "10px 12px",
              borderRadius: "12px",
            }}
          >
            {errorMessage}
          </div>
        )}
      </main>
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthSuccess}
      />
    </div>
  );
}
