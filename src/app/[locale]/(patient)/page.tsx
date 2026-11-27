import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import type { Locale } from "@/i18n/config";

export default function TodayPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("home");

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex justify-end">
        <LocaleSwitcher />
      </div>
      <section className="rounded-2xl bg-surface p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{t("greeting")}</h1>
        <p className="mt-2 text-muted">{t("intro")}</p>
        <button
          type="button"
          className="mt-4 rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground"
        >
          {t("startOnboarding")}
        </button>
      </section>
      <MedicalDisclaimer />
    </main>
  );
}
