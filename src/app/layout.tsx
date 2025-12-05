// This file sets the global app shell with the gradient background and shared styles.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leadership Factory",
  description: "A calm guided funnel toward your learning goal.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This wraps every page with the body styling.
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
