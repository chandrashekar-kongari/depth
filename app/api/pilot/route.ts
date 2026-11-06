import { randomUUID } from "crypto";
import { sendPilotNotification } from "@/lib/notify";
import { pilotSchema } from "@/lib/pilot-schema";
import { savePilotSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON." },
      { status: 400 },
    );
  }

  const parsed = pilotSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Check the form fields." },
      { status: 400 },
    );
  }

  const record = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    ...parsed.data,
  };

  let saved = false;
  try {
    saved = await savePilotSubmission(record);
  } catch (error) {
    console.error(error);
  }

  try {
    await sendPilotNotification(record);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        ok: false,
        error: saved
          ? "The request was saved, but the notification email was not sent."
          : "The notification email was not sent.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, id: record.id }, { status: 201 });
}
