// This file only allows requests that use the staging web address.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set([
  "staging.leadership-factory.cn",
  "localhost",
  "127.0.0.1",
  "::1",
]);

// This helper checks if the host name is in the allowed list.
function isAllowedHost(hostname: string | null): boolean {
  if (!hostname) {
    return false;
  }

  return ALLOWED_HOSTS.has(hostname);
}

// This middleware blocks other hosts and sends them to the staging domain.
export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host");
  const hostname = hostHeader ? hostHeader.split(":")[0] : null;

  if (isAllowedHost(hostname)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.hostname = "staging.leadership-factory.cn";
  redirectUrl.port = "";
  return NextResponse.redirect(redirectUrl, 308);
}
