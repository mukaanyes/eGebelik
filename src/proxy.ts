import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Locale detection: URL prefix → NEXT_LOCALE cookie → Accept-Language → default (tr).
// Session refresh (Supabase Auth) will be added here in the auth task.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
