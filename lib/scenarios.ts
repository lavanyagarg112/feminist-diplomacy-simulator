import fs from "fs";
import path from "path";
import type { ScenarioFile } from "./types";

const dataDir = path.join(process.cwd(), "data", "scenarios");

export function listScenarioSlugs(): string[] {
  try {
    return fs
      .readdirSync(dataDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

export function loadScenario(slug: string): ScenarioFile | null {
  try {
    const p = path.join(dataDir, `${slug}.json`);
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw) as ScenarioFile;
  } catch {
    return null;
  }
}

