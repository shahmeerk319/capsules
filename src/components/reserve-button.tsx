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
  textClassName?: string;
}

export default function ReserveButton({
  text = "Reserve",
  icon: Icon = ArrowUpRight,
  onClick,
  disabled = false,
  className = "",
  textClassName = "",
}: ReserveButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const textEl = textRef.current;
    const iconEl = iconWrapperRef.current;

    if (!btn || !textEl || !iconEl) return;

    btn.classList.remove("opacity-0");
    btn.classList.remove("w-0");

    gsap.set(btn, { opacity: 0, width: 0 });
    gsap.set(textEl, { opacity: 0, x: -10 });
    gsap.set(iconEl, { opacity: 0, scale: 0 });

    const tl = gsap.timeline();

    tl.to(btn, {
      opacity: 1,
     
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
        px-1 md:pl-5 pl-2 
        min-w-[80px]  md:min-w-[130px] lg:h-13 md:h-12 sm:h-8 h-7 mt-2 
        group
        overflow-hidden
        opacity-0 w-0
        ${className}
      `}
    >
      <span
        ref={textRef}
        className={`text-gray-800 font-medium text-[9px] sm:text-[10px] md:text-[15px]  sm:mr-1 ${textClassName}`}
      >
        {text}
      </span>
      <div
        ref={iconWrapperRef}
        className="bg-gray-800 hover:bg-gray-900 group-disabled:bg-gray-400 transition-colors duration-200 rounded-full flex-shrink-0 p-1"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 size-6 text-[#f4efe7] " />
      </div>
    </button> 
  );
}
