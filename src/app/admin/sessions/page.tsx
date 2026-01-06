// This page shows the admin tool for session outlines.
import { headers } from "next/headers";
import Link from "next/link";
import SessionsClient from "./SessionsClient";
import LoginPrompt from "../../components/LoginPrompt";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";
import { prisma } from "../../../server/prismaClient";
import { listSessionOutlines } from "../../../server/admin/sessions";

export const dynamic = "force-dynamic";

export default async function AdminSessionsPage() {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Admin login"
            message="Sign in first, then you can open the sessions admin tool."
            buttonLabel="Login to admin"
            afterLoginPath="/admin/sessions"
          />
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="glass-card gate-card">
            <div className="gate-copy">
              <h2 className="hero-title" style={{ marginBottom: "8px" }}>
                Admin access only
              </h2>
              <p className="hero-lead" style={{ marginBottom: "16px" }}>
                Your account is not an admin. Please use an admin login.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [journeys, outlines] = await Promise.all([
    prisma.learningJourney.findMany({
      select: { id: true, title: true, slug: true, isStandard: true },
      orderBy: [{ title: "asc" }],
    }),
    listSessionOutlines({}),
  ]);

  return (
    <div className="content-shell admin-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="admin-page-head">
          <div>
            <p className="hero-kicker">Admin</p>
            <h1 className="hero-title" style={{ marginBottom: 4 }}>
              Session Outlines
            </h1>
            <p className="hero-lead">Filter, add, edit, and delete session outlines for every journey.</p>
          </div>
          <div className="admin-quick-links">
            <Link className="secondary-button" href="/admin/journeys">
              Journeys
            </Link>
            <form action="/api/auth/logout" method="post" style={{ margin: 0 }}>
              <button type="submit" className="secondary-button danger">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <SessionsClient journeys={journeys} initialOutlines={outlines} />
      </div>
    </div>
  );
}
