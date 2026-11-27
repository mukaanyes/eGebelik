import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import type { Locale } from "@/i18n/config";

export default function DoctorDashboardPage({ params }: PageProps<"/[locale]/doctor">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("doctor.dashboard");
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("empty")}</p>
    </main>
  );
}
