"use client";

import { useEffect, useState } from "react";

const options = ["light", "dark", "system"] as const;
type ThemeChoice = (typeof options)[number];

function apply(choice: ThemeChoice) {
  const dark =
    choice === "dark" ||
    (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = choice;
  localStorage.setItem("depth-theme", choice);
}

export function ThemeControl() {
  const [choice, setChoice] = useState<ThemeChoice>("light");

  useEffect(() => {
    const stored = localStorage.getItem("depth-theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      setChoice(stored);
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = localStorage.getItem("depth-theme");
      if (current === "system") apply("system");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <fieldset className="flex items-center gap-1">
      <legend className="sr-only">Color theme</legend>
      {options.map((option) => (
        <label
          key={option}
          className={`cursor-pointer rounded-[4px] px-2.5 py-1 text-[13px] capitalize ${
            choice === option ? "bg-card text-foreground" : "text-muted"
          }`}
        >
          <input
            type="radio"
            name="theme"
            value={option}
            checked={choice === option}
            className="sr-only"
            onChange={() => {
              setChoice(option);
              apply(option);
            }}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
}
