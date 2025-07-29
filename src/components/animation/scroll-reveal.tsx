"use client";
import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

useEffect(() => {
  const el = containerRef.current;
  if (!el) return;

  const scroller =
    scrollContainerRef && scrollContainerRef.current
      ? scrollContainerRef.current
      : window;

  // Rotation effect (optional)
  gsap.fromTo(
    el,
    { transformOrigin: "0% 50%", rotate: baseRotation },
    {
      ease: "none",
      rotate: 0,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top bottom",
        end: rotationEnd,
        scrub: true,
      },
    }
  );

  const wordElements = el.querySelectorAll<HTMLElement>(".word");

  // Opacity + Y movement (fade from top, not disappear)
  gsap.fromTo(
  wordElements,
  { opacity: baseOpacity, y: 30 },
  {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: el,
      scroller,
      start: "top 85%",
      end: "bottom 50%",
      scrub: true,
    },
  }
);


  // Optional blur effect
  if (enableBlur) {
    gsap.fromTo(
      wordElements,
      { filter: `blur(${blurStrength}px)` },
      {
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 80%",
          end: wordAnimationEnd || "bottom 60%",
          scrub: true,
        },
      }
    );
  }

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, [
  scrollContainerRef,
  enableBlur,
  baseRotation,
  baseOpacity,
  rotationEnd,
  wordAnimationEnd,
  blurStrength,
]);


  return (
    <h2 ref={containerRef} className={`md:my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1.6rem,5vw,3.5rem)] md:leading-13 px-5  ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
