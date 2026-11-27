// Verifies every locale file has exactly the same message keys as the source (tr.json).
// Run: npm run i18n:check
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_LOCALE = "tr";
const dir = join(import.meta.dirname, "..", "messages");

type Messages = { [key: string]: string | Messages };

function flatten(obj: Messages, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? [path] : flatten(value, path);
  });
}

function load(locale: string): Set<string> {
  const raw = readFileSync(join(dir, `${locale}.json`), "utf8");
  return new Set(flatten(JSON.parse(raw) as Messages));
}

const source = load(SOURCE_LOCALE);
const locales = readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((l) => l !== SOURCE_LOCALE);

let failed = false;
for (const locale of locales) {
  const keys = load(locale);
  const missing = [...source].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !source.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`✗ ${locale}.json`);
    for (const k of missing) console.error(`  missing: ${k}`);
    for (const k of extra) console.error(`  extra:   ${k}`);
  } else {
    console.log(`✓ ${locale}.json (${keys.size} keys)`);
  }
}

process.exit(failed ? 1 : 0);
