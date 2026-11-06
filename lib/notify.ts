import { Resend } from "resend";
import { deploymentOptions, type PilotRecord } from "@/lib/pilot-schema";

const fromAddress = "Depth <onboarding@resend.dev>";

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendPilotNotification(record: PilotRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PILOT_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    throw new Error("Email is not configured.");
  }

  const deployment =
    deploymentOptions.find((option) => option.value === record.deployment)
      ?.label ?? record.deployment;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress,
    to,
    replyTo: record.email,
    subject: `Pilot request from ${oneLine(record.name)}`,
    text: [
      `Name: ${record.name}`,
      `Email: ${record.email}`,
      `Company: ${record.company}`,
      `Role: ${record.role}`,
      `Deployment: ${deployment}`,
      `Submitted: ${record.submittedAt}`,
      `Reference: ${record.id}`,
      "",
      "Current review process:",
      record.workflow,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
