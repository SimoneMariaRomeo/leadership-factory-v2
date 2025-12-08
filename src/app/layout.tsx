// This file sets the global app shell with the gradient background and shared styles.
import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";
import TopNav from "./components/TopNav";
import { getCurrentUser, requestFromCookieHeader } from "../server/auth/session";

export const metadata: Metadata = {
  title: "Leadership Factory",
  description: "A calm guided funnel toward your learning goal.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This fetches the current user from the auth cookie so the nav can show the right links.
  const headerStore = headers();
  const cookieHeader = headerStore.get("cookie");
  const currentUser = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  // This wraps every page with the background and shared styles.
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <TopNav initialUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
