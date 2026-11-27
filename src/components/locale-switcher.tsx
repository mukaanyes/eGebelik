"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { locales, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted">{t("label")}</span>
      <select
        className="rounded-md border border-border bg-surface px-2 py-1"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const next = event.target.value as Locale;
          startTransition(() => router.replace(pathname, { locale: next }));
        }}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {t(l)}
          </option>
        ))}
      </select>
    </label>
  );
}
