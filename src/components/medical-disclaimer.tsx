import { useTranslations } from "next-intl";
import { serviceCountry } from "@/i18n/config";

export function MedicalDisclaimer() {
  const t = useTranslations("legal");
  return (
    <p role="note" className="text-xs text-muted">
      {t("medicalDisclaimer", { emergencyNumber: serviceCountry.emergencyNumber })}
    </p>
  );
}
