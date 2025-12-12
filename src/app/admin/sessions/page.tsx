// This page shows the admin tool for session outlines.
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import SessionsClient from "./SessionsClient";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";
import { prisma } from "../../../server/prismaClient";
import { listSessionOutlines } from "../../../server/admin/sessions";

export const dynamic = "force-dynamic";

export default async function AdminSessionsPage() {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));
  if (!user || user.role !== "admin") {
    redirect("/");
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
