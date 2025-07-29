"use client";
import { sectionOneImage } from "@/assets/index.js";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitText from "../animation/split-text";
import ReserveButton from "../reserve-button";
import TextType from "../animation/text-type";
import BlurText from "../animation/text-type";
import { AlignJustify, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import ShinyText from "../animation/shiny-text";
import ScrollReveal from "../animation/scroll-reveal";
import SectionTwo from "../section-two/section-two";

export default function Page() {
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
    <>
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
                textAlign="center"
              />
            </h1>
            <ReserveButton icon={ArrowUpRight}
              text="Reserve"
              className="text-[9px]"
            />


          </div>
        )}
        {showContent && (

         <div className="absolute bottom-0 mb-[1vw] w-full px-[2vw] lg:px-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
  <div className="flex flex-col">
    <BlurText
      text={`Closer to`}
      delay={150}
      animateBy="words"
      direction="top"
      className="text-[4vw] md:text-[2.5vw] lg:text-[1.2vw]"
    />
    <BlurText
      text={`Nature—Closer`}
      delay={150}
      animateBy="words"
      direction="top"
      className="text-[4vw] md:text-[2.5vw] lg:text-[1.2vw]"
    />
    <BlurText
      text={`to Yourself`}
      delay={150}
      animateBy="words"
      direction="top"
      className="text-[4vw] md:text-[2.5vw] lg:text-[1.2vw]"
    />
  </div>

  <ReserveButton
    icon={AlignJustify}
    text="Menu"
    
  />

  <ShinyText
  className="text-[3vw] md:text-[2vw] lg:text-[16px]"
    text={
      <>
        Spend unforgettable and remarkable time <br />
        in the Californian desert with—Capsules.
      </>
    }
  />
</div>

        )}

      </section>

      {showContent && (
        <SectionTwo />
      )}

    </>
  );
}

