import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { PilotRecord } from "@/lib/pilot-schema";

const filePath = path.join(process.cwd(), "data", "pilot-submissions.json");

async function readAll(): Promise<PilotRecord[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(filePath, "utf8"));
    return Array.isArray(parsed) ? (parsed as PilotRecord[]) : [];
  } catch {
    return [];
  }
}

export async function savePilotSubmission(record: PilotRecord): Promise<boolean> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const existing = await readAll();
  existing.push(record);
  await writeFile(filePath, JSON.stringify(existing, null, 2));
  const confirmed = await readAll();
  return confirmed.some((item) => item.id === record.id);
}
