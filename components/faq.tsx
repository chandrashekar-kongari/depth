"use client";

import { useState } from "react";

const items = [
  {
    question: "What is Depth?",
    answer:
      "Depth is engineering software being developed to help mechanical and manufacturing teams organize and improve drawing review workflows.",
  },
  {
    question: "What is available in the early pilot?",
    answer:
      "Our initial focus is the Drawing Review Queue. We're inviting teams to share their requirements and explore how Depth could fit their review process. Specific pilot capabilities will be confirmed directly with participants.",
  },
  {
    question: "Will our engineering files leave our organization?",
    answer:
      "Depth is being designed for local and organization-hosted deployment, with engineering data kept within customer-controlled infrastructure. Deployment details and available configurations will be confirmed during the pilot.",
  },
  {
    question: "What features are coming next?",
    answer:
      "We're planning AI-assisted drawing review and 3D-to-2D drawing generation. These capabilities are not yet generally available.",
  },
  {
    question: "What happens after joining the pilot?",
    answer:
      "We'll review your application and follow up to learn about your team's drawing review workflow and deployment requirements.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" data-line>
      <div className="rail grid-layout py-24">
        <div className="mx-auto w-full max-w-[768px]">
          <h2 className="text-[22px] font-semibold leading-[calc(4/3*1em)] tracking-normal text-foreground-primary lg:text-[34px] lg:leading-[calc(10/9*1em)]">
            Frequently asked questions
          </h2>
          <div className="mt-8 border-t border-border-line">
            {items.map((item, index) => {
              const expanded = open === index;
              return (
                <div
                  key={item.question}
                  className="border-b border-border-line"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-normal leading-6"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    {item.question}
                    <svg
                      viewBox="0 0 16 16"
                      className={`h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <path
                        d="M3.5 6 8 10.5 12.5 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden" aria-hidden={!expanded}>
                      <p className="pb-5 pr-8 text-[16px] leading-6 text-foreground-secondary">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
