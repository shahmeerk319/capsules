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
          <ReserveButton icon={ArrowUpRight}
            text="Reserve"
            className="text-[9px]"
          />


        </div>
      )}
      {showContent && (

        <div className="absolute bottom-0 mb-[1vw]  w-full px-[2vw] lg:px-5 flex justify-between">
          <div className="">

            <BlurText
              text={`Closer to`}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl "
            />
            <BlurText
              text={`Nature—Closer`}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl "
            />
            <BlurText
              text={`to Yourself`}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl"
            />
          </div>
          <ReserveButton icon={AlignJustify}
            text="Menu"
            textClassName="lg:text-[16px]"
            iconClass="lg:w-5 lg:h-5 "
            iconBtnClass="lg:p-3"
          />


<ShinyText
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
  );
}
// <div className="absolute bottom-0 mb-[2vw] lg:mb-10 w-full px-[2vw] lg:px-5 flex justify-between">
//   <div>
//     <h1 className="text-[4vw] lg:text-[35px] lg:-mt-10 font-semibold leading-tight">
//       Closer to <br />
//       Nature-Closer <br />
//       to Yourself
//     </h1>
//   </div>

//   <div >
//     <Button className="bg-white hover:bg-white rounded-full cursor-pointer py-[2vw] px-[3vw] text-black mt-[1vw] lg:py-6 lg:px-5 lg:mt-5">
//       Menu{" "}
//       <span className="bg-[#2a2725] text-white rounded-full flex items-center justify-center ml-[1vw] w-[3vw] h-[3vw] lg:w-8 lg:h-8">
//         <AlignJustify className="w-[2vw] h-[2vw] lg:w-4 lg:h-4" />
//       </span>
//     </Button>
//   </div>

//   <div className="text-[2vw] lg:text-base">
//     <p>
//       Spend unforgettable and remarkable time <br />
//       in the Californian desert with—Capsules.
//     </p>
//   </div>
// </div>
