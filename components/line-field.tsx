"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export function LineField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    const size = { width: 0, height: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.width = rect.width;
      size.height = rect.height;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const { width, height } = size;
      if (width < 2 || height < 2) {
        if (!reduce) frame = requestAnimationFrame(draw);
        return;
      }
      context.clearRect(0, 0, width, height);
      const dark = document.documentElement.classList.contains("dark");
      const gradient = context.createLinearGradient(
        width * 0.2,
        height,
        width,
        0,
      );
      gradient.addColorStop(0, dark ? "rgba(24,226,153,0.15)" : "#d7e7a4");
      gradient.addColorStop(0.55, dark ? "#18e299" : "#8fce7a");
      gradient.addColorStop(1, dark ? "#7dffd0" : "#1fa77a");
      const t = reduce ? 0 : time / 1000;
      const count = 24;
      for (let index = 0; index < count; index += 1) {
        const n = index / (count - 1);
        const wave = Math.sin(t * 0.28 + index * 0.45) * 14;
        context.beginPath();
        context.strokeStyle = gradient;
        context.globalAlpha = dark ? 0.28 + n * 0.45 : 0.35 + n * 0.5;
        context.lineWidth = 1.15;
        const y = height * (0.42 + n * 0.7);
        const lift = height * (0.25 + n * 0.7);
        context.moveTo(width * 0.34, Math.min(height + 20, y));
        context.bezierCurveTo(
          width * 0.5,
          y - lift * 0.25 + wave,
          width * 0.68,
          y - lift * 0.85 + wave * 0.4,
          width + 30,
          y - lift - index * 3,
        );
        context.stroke();
      }
      context.globalAlpha = 1;
      if (!reduce) frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
