import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import type { Locale } from "@/i18n/config";
import { PatientTabBar } from "@/components/patient-tab-bar";

// Mobile-first shell for mothers and partners (PROJECT_PLAN.md §8.1).
export default function PatientLayout({ children, params }: LayoutProps<"/[locale]">) {
  setRequestLocale(use(params).locale as Locale);
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col pb-20">
      {children}
      <PatientTabBar />
    </div>
  );
}
