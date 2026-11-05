"use client";

import { useState } from "react";

const items = [
  {
    question: "What is the Depth pilot?",
    answer:
      "The pilot is an early invitation to talk about how your team reviews mechanical drawings, and to look at an illustrative review queue. It is not a finished product launch.",
  },
  {
    question: "Can we use the drawing review queue today?",
    answer:
      "The queue on this site is an illustrative concept. There is no released Depth application to install from this page.",
  },
  {
    question: "Where would drawing data live?",
    answer:
      "The intended direction is fully local deployment or organization-hosted deployment, so drawing data stays in the customer environment. That deployment work is not a completed feature.",
  },
  {
    question: "Are AI review and 3D-to-2D generation available?",
    answer: "No. Both are marked coming soon. They are not part of the pilot.",
  },
  {
    question: "What happens when I submit the form?",
    answer:
      "Your answers are written to a file on the server that hosts this site, so they can be read for the pilot. The page confirms the request only after that write succeeds.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto w-full max-w-[768px] px-4 py-24">
        <h2 className="text-[32px] font-medium leading-[40px] tracking-[-0.64px]">
          Frequently asked questions
        </h2>
        <div className="mt-8 border-t border-line">
          {items.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.question} className="border-b border-line">
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
                    <p className="pb-5 pr-8 text-[15px] leading-6 text-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
