"use client";

import { type LucideIcon, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(GSAPSplitText);

interface ReserveButtonProps {
  text?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  iconClass?: string;
  iconBtnClass?: string;
}

export default function ReserveButton({
  text = "Reserve",
  icon: Icon = ArrowUpRight,
  onClick,
  disabled = false,
  className = "",
  textClassName = "",
  iconClass = "",
  iconBtnClass = "",
}: ReserveButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconWrapperRef = useRef<HTMLDivElement>(null);
  const hoverTween = useRef<GSAPSplitText | null>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const btn = btnRef.current;
    const textEl = textRef.current;
    const iconEl = iconWrapperRef.current;

    if (!btn || !textEl || !iconEl) return;

    // Mount animation
    btn.classList.remove("opacity-0", "w-0");
    gsap.set(btn, { opacity: 0, width: 0, scale: 1 });
    gsap.set(textEl, { opacity: 0, x: -10 });
    gsap.set(iconEl, { opacity: 0, scale: 0 });

    const tl = gsap.timeline();
    tl.to(btn, { opacity: 1, duration: 0.6, ease: "power3.out" })
      .to(textEl, { opacity: 1, x: 0, duration: 0.3 }, "+=0.1")
      .to(
        iconEl,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        "+=0.1"
      );

    // Hover handlers
    const hoverIn = () => {
      if (isHovering.current) return;
      isHovering.current = true;

      // Split text only once
      hoverTween.current = new GSAPSplitText(textEl, { type: "chars" });
      const chars = hoverTween.current.chars;

      gsap.killTweensOf(chars); // clean stale animations
      gsap.fromTo(
        chars,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.03,
          onComplete: () => {
            if (hoverTween.current) {
              hoverTween.current.revert();
              hoverTween.current = null;
            }
            isHovering.current = false;
          },
        }
      );

      gsap.to(iconEl, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(btn, {
        scale: 1.04,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const hoverOut = () => {
      gsap.to(iconEl, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    btn.addEventListener("mouseenter", hoverIn);
    btn.addEventListener("mouseleave", hoverOut);

    return () => {
      btn.removeEventListener("mouseenter", hoverIn);
      btn.removeEventListener("mouseleave", hoverOut);
    };
  }, []);

  return (
   <button
  onClick={onClick}
  disabled={disabled}
  ref={btnRef}
  className={cn(`
    flex items-center justify-between
    bg-[#f4efe7] hover:bg-[#f4efe7]
    disabled:bg-gray-100 disabled:cursor-not-allowed
    transition-colors duration-200 
    rounded-full shadow-sm border border-gray-300
    pl-2 md:pl-5
    min-w-[82px] md:min-w-[130px]
   h-8 md:h-12 lg:h-13
    mt-2
    group overflow-hidden
    opacity-0 w-0
    ${className}
  `)}
>
  <span
    ref={textRef}
    className={cn(`
      text-gray-800 font-medium
      text-[10px] md:text-[15px]
      transition-transform duration-300 ease-out 
      group-hover:-translate-x-0.5
      ${textClassName}
    `)}
  >
    {text}
  </span>

  <div
    ref={iconWrapperRef}
    className={cn(`
      bg-gray-800 hover:bg-gray-900 
      group-disabled:bg-gray-400 
      transition-all duration-300 ease-out 
      rounded-full flex-shrink-0 p-1 mr-1 sm:mr-0 md:mr-1
      ${iconBtnClass}
    `)}
  >
    <Icon
      className={cn(`
        w-[3vw] h-[3vw] sm:w-5 sm:h-5 md:w-7 md:h-7
        text-[#f4efe7] 
        transition-transform duration-300 ease-out 
        group-hover:translate-x-0.5 
        ${iconClass}
      `)}
    />
  </div>
</button>

  );
}
