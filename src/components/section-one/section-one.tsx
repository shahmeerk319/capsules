"use client";
import { sectionOneImage } from "@/assets/index.js";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitText from "../split-text";
import ReserveButton from "../reserve-button";

export default function SectionOne() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setShowContent(true), // Show content after animation completes
    });

    tl.fromTo(
      sectionRef.current,
      {
        height: 0,
        yPercent: 50,
        opacity: 0,
      },
      {
        height: "98vh",
        yPercent: 0,
        opacity: 1,
        duration: 5,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative lg:p-2 h-[90vh] lg:m-2 lg:rounded-4xl rounded m-1 overflow-y-hidden overflow-x-hidden opacity-0"
      style={{
        backgroundImage: `url(${sectionOneImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showContent && (
        <div className="flex justify-between">
          <h1>
            <SplitText
              text="Capsules"
              className="text-[10vw] lg:text-[160px] font-[500] leading-none"
              delay={200}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>
          <ReserveButton onClick={() => alert("Reserve clicked!")} />
        </div>
      )}
    </section>
  );
}
