import { describe, expect, it } from "vitest";
import {
  dueDateFromLmp,
  gestationalAge,
  lmpFromDueDate,
  toDayNumber,
  trimesterForWeek,
} from "./gestation";

describe("dueDateFromLmp", () => {
  it("adds 280 days", () => {
    expect(dueDateFromLmp("2026-01-01")).toBe("2026-10-08");
  });

  it("handles leap years", () => {
    expect(dueDateFromLmp("2027-06-01")).toBe("2028-03-07");
  });

  it("round-trips with lmpFromDueDate", () => {
    expect(lmpFromDueDate(dueDateFromLmp("2026-11-27"))).toBe("2026-11-27");
  });
});

describe("gestationalAge", () => {
  it("returns weeks and days", () => {
    expect(gestationalAge("2026-01-01", "2026-03-20")).toMatchObject({
      totalDays: 78,
      weeks: 11,
      days: 1,
      trimester: 1,
      daysUntilDue: 202,
    });
  });

  it("is 40+0 on the due date", () => {
    const age = gestationalAge("2026-01-01", "2026-10-08");
    expect([age.weeks, age.days, age.daysUntilDue]).toEqual([40, 0, 0]);
  });

  it("rejects an LMP in the future", () => {
    expect(() => gestationalAge("2026-12-01", "2026-11-27")).toThrow(RangeError);
  });
});

describe("trimesterForWeek", () => {
  it.each([
    [0, 1],
    [13, 1],
    [14, 2],
    [27, 2],
    [28, 3],
    [41, 3],
  ] as const)("week %i is trimester %i", (week, trimester) => {
    expect(trimesterForWeek(week)).toBe(trimester);
  });
});

describe("toDayNumber", () => {
  it.each(["2026-02-30", "2026-13-01", "27.11.2026", ""])("rejects %s", (value) => {
    expect(() => toDayNumber(value)).toThrow(RangeError);
  });
});
