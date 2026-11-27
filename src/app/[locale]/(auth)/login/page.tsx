import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import type { Locale } from "@/i18n/config";

export default function LoginPage({ params }: PageProps<"/[locale]/login">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("auth.login");
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-2 p-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="text-muted">{t("intro")}</p>
    </main>
  );
}
