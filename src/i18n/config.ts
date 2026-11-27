// Single source of truth for supported locales. Add a locale here,
// then add messages/<locale>.json and run `npm run i18n:check`.
export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

// Country-specific values are tied to the country of service, not the UI language.
export const serviceCountry = {
  code: "TR",
  emergencyNumber: "112",
  timeZone: "Europe/Istanbul",
} as const;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
