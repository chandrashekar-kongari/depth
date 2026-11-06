"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  deploymentOptions,
  pilotSchema,
  type PilotInput,
} from "@/lib/pilot-schema";

const fieldClass =
  "h-[42px] w-full rounded-[4px] border border-border-secondary bg-base-default px-3 text-[14px] text-foreground-primary";

export function PilotForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PilotInput>({
    resolver: zodResolver(pilotSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      workflow: "",
      deployment: "undecided",
    },
  });

  const onSubmit = async (values: PilotInput) => {
    setSubmitError(null);
    setSavedId(null);
    try {
      const response = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        id?: string;
      } | null;
      if (!response.ok || !payload?.ok || !payload.id) {
        setSubmitError("We couldn’t save this request. Nothing was recorded.");
        return;
      }
      setSavedId(payload.id);
      reset();
    } catch {
      setSubmitError("We couldn’t save this request. Nothing was recorded.");
    }
  };

  return (
    <form
      id="signup"
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name?.message}>
          <input
            className={fieldClass}
            autoComplete="name"
            {...register("name")}
          />
        </Field>
        <Field label="Work Email" error={errors.email?.message}>
          <input
            className={fieldClass}
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            className={fieldClass}
            autoComplete="organization"
            {...register("company")}
          />
        </Field>
        <Field label="Role" error={errors.role?.message}>
          <input
            className={fieldClass}
            autoComplete="organization-title"
            {...register("role")}
          />
        </Field>
      </div>
      <Field label="Current Review Process" error={errors.workflow?.message}>
        <textarea
          className="min-h-32 w-full rounded-[4px] border border-border-secondary bg-base-default px-3 py-3 text-[14px] leading-6 text-foreground-primary"
          {...register("workflow")}
        />
      </Field>
      <fieldset>
        <legend className="mb-2 text-[14px] font-medium">
          Deployment Preference
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {deploymentOptions.map((option) => (
            <label
              key={option.value}
              className="flex h-[42px] items-center gap-2 rounded-[4px] border border-border-secondary px-3 text-[14px]"
            >
              <input
                type="radio"
                value={option.value}
                {...register("deployment")}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.deployment ? (
          <p className="mt-2 text-[13px] text-error">
            {errors.deployment.message}
          </p>
        ) : null}
      </fieldset>
      <p className="text-[13px] leading-5 text-foreground-secondary">
        Tell us a little about your team and your current drawing review
        process.
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-[42px] w-fit items-center rounded-[4px] bg-base-invert px-4 text-[14px] font-medium text-foreground-invert shadow-button-sm transition-opacity duration-200 ease-out-soft disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Join the Pilot"}
      </button>
      {submitError ? (
        <p role="alert" className="text-[14px] text-foreground-primary">
          {submitError}
        </p>
      ) : null}
      {savedId ? (
        <p role="status" className="text-[14px] text-foreground-primary">
          Request received. Reference {savedId}.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium">{label}</span>
      {children}
      {error ? (
        <span className="mt-2 block text-[13px] text-error">{error}</span>
      ) : null}
    </label>
  );
}
