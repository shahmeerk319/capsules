"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const el = ref.current;

    let splitter: GSAPSplitText;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        linesClass: "split-line",
      });
    } catch (error) {
      console.error("SplitText error:", error);
      el.style.opacity = "1"; // Fallback: just show the text
      return;
    }

    let targets: Element[] = [];
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "chars":
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for animation");
      el.style.opacity = "1";
      splitter.revert();
      return;
    }

    gsap.set(el, { opacity: 1 }); // Show container
    gsap.set(targets, { ...from, immediateRender: false });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
        });
        onLetterAnimationComplete?.();
      },
    });

    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(targets);
      splitter.revert();
    };
  }, [text, delay, duration, ease, splitType, from, to, onLetterAnimationComplete]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
        opacity: 0, // hidden before animation
      }}
    >
      {text}
      <span className="text-[5vw] lg:text-6xl">®</span>
    </p>
  );
};

export default SplitText;
