import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const tabs = [
  { href: "/", key: "today" },
  { href: "/tools", key: "tools" },
  { href: "/community", key: "community" },
  { href: "/explore", key: "explore" },
  { href: "/profile", key: "profile" },
] as const;

export function PatientTabBar() {
  const t = useTranslations("nav.patient");
  return (
    <nav
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <Link href={tab.href} className="block py-3 text-center text-xs font-medium">
              {t(tab.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
