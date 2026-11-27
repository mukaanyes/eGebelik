import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import type { Locale } from "@/i18n/config";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const items = [
  { href: "/doctor", key: "patients" },
  { href: "/doctor/calendar", key: "calendar" },
  { href: "/doctor/alerts", key: "alerts" },
  { href: "/doctor/profile", key: "profile" },
] as const;

// Dashboard-first shell for obgyn_doctor accounts (PROJECT_PLAN.md §8.2).
// Role, verification and patient-link checks are added with auth (CLAUDE.md §5).
export default function DoctorLayout({ children, params }: LayoutProps<"/[locale]">) {
  setRequestLocale(use(params).locale as Locale);
  const t = useTranslations("nav.doctor");
  return (
    <div data-theme="clinical" className="flex flex-1 flex-col bg-background md:flex-row">
      <nav
        aria-label={t("label")}
        className="border-b border-border bg-surface md:w-60 md:border-e md:border-b-0"
      >
        <ul className="flex gap-1 overflow-x-auto p-2 md:flex-col">
          {items.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-background"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
}
