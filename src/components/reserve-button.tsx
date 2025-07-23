"use client";

import { type LucideIcon, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ReserveButtonProps {
  text?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ReserveButton({
  text = "Reserve",
  icon: Icon = ArrowUpRight,
  onClick,
  disabled = false,
  className = "",
}: ReserveButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const textEl = textRef.current;
    const iconEl = iconWrapperRef.current;

    if (!btn || !textEl || !iconEl) return;

    // Remove initial CSS hidden classes (if any) so GSAP controls visibility
    btn.classList.remove("opacity-0");
    btn.classList.remove("w-0");

    // First, set opacity and width to 0
    gsap.set(btn, { opacity: 0, width: 0 });
    gsap.set(textEl, { opacity: 0, x: -10 });
    gsap.set(iconEl, { opacity: 0, scale: 0 });

    // Measure final width
    const finalWidth = btn.scrollWidth;

    const tl = gsap.timeline();

    tl.to(btn, {
      opacity: 1,
      width: finalWidth,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        textEl,
        { opacity: 1, x: 0, duration: 0.3 },
        "+=0.1"
      )
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
  }, []);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      ref={btnRef}
      className={`
        flex items-center justify-between
        bg-[#f4efe7] hover:bg-[#f4efe7] 
        disabled:bg-gray-100 disabled:cursor-not-allowed
        transition-colors duration-200 
        rounded-full 
        shadow-sm border border-gray-300
        px-1 pl-5
        min-w-[100px] sm:min-w-[140px] md:min-w-[160px] lg:h-13 md:h-11 h-10
        group
        overflow-hidden
        opacity-0 w-0
        ${className}
      `}
    >
      <span
        ref={textRef}
        className="text-gray-800 font-medium text-sm sm:text-base md:text-lg mr-2 sm:mr-3 md:mr-4"
      >
        {text}
      </span>
      <div
        ref={iconWrapperRef}
        className="bg-gray-800 hover:bg-gray-900 group-disabled:bg-gray-400 transition-colors duration-200 rounded-full p-1.5 sm:p-2 flex-shrink-0"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#f4efe7] " />
      </div>
    </button>
  );
}
