import { z } from "zod";

export const deploymentOptions = [
  { value: "local", label: "Fully local" },
  { value: "organization", label: "Organization-hosted" },
  { value: "undecided", label: "Not sure yet" },
] as const;

export const pilotSchema = z.object({
  name: z.string().trim().min(1, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a work email.").max(200),
  company: z.string().trim().min(1, "Enter a company.").max(160),
  role: z.string().trim().min(1, "Enter your role.").max(120),
  workflow: z
    .string()
    .trim()
    .min(1, "Describe the current review process.")
    .max(2000),
  deployment: z.enum(["local", "organization", "undecided"], {
    errorMap: () => ({ message: "Choose a deployment preference." }),
  }),
});

export type PilotInput = z.infer<typeof pilotSchema>;

export type PilotRecord = PilotInput & {
  id: string;
  submittedAt: string;
};
