// Pregnancy date math. All inputs are calendar dates (YYYY-MM-DD) without a time
// component, so results do not depend on the server or user time zone.

export const PREGNANCY_LENGTH_DAYS = 280;
export const MAX_TRACKED_WEEK = 42;

export type Trimester = 1 | 2 | 3;

export interface GestationalAge {
  totalDays: number;
  weeks: number;
  days: number;
  trimester: Trimester;
  daysUntilDue: number;
}

const DAY_MS = 86_400_000;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parses YYYY-MM-DD into a UTC day number. Throws on invalid dates. */
export function toDayNumber(isoDate: string): number {
  const match = ISO_DATE.exec(isoDate);
  if (!match) throw new RangeError(`Invalid date: ${isoDate}`);
  const [, y, m, d] = match.map(Number);
  const ms = Date.UTC(y, m - 1, d);
  const check = new Date(ms);
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) {
    throw new RangeError(`Invalid date: ${isoDate}`);
  }
  return ms / DAY_MS;
}

export function fromDayNumber(day: number): string {
  return new Date(day * DAY_MS).toISOString().slice(0, 10);
}

/** Naegele's rule: estimated due date = last menstrual period + 280 days. */
export function dueDateFromLmp(lmpDate: string): string {
  return fromDayNumber(toDayNumber(lmpDate) + PREGNANCY_LENGTH_DAYS);
}

export function lmpFromDueDate(dueDate: string): string {
  return fromDayNumber(toDayNumber(dueDate) - PREGNANCY_LENGTH_DAYS);
}

export function trimesterForWeek(weeks: number): Trimester {
  if (weeks < 14) return 1;
  if (weeks < 28) return 2;
  return 3;
}

/** Gestational age on `today` for a pregnancy with the given LMP. */
export function gestationalAge(lmpDate: string, today: string): GestationalAge {
  const lmp = toDayNumber(lmpDate);
  const now = toDayNumber(today);
  const totalDays = now - lmp;
  if (totalDays < 0) throw new RangeError("LMP date is in the future");
  const weeks = Math.floor(totalDays / 7);
  return {
    totalDays,
    weeks,
    days: totalDays % 7,
    trimester: trimesterForWeek(weeks),
    daysUntilDue: lmp + PREGNANCY_LENGTH_DAYS - now,
  };
}
