import Image from "next/image";
import ScrollReveal from "../animation/scroll-reveal";
import { sectionTwoImage1, sectionTwoImage2 } from "@/assets";

export default function SectionTwo() {
    return (
        <section className="md:my-30 ">
            <div className="md:my-20 my-10  ">
                <ScrollReveal baseOpacity={0} blurStrength={10}>
                    Welcome to a world of wild California desert with Capsules®, where you will
                    discover exquisite nature observing it from capsule houses, nestled in the
                    one of the most breathtaking destination on the United States.
                </ScrollReveal>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-10 max-w-6xl mx-auto">
                <div className="flex gap-4 flex-wrap justify-center">
                    <Image
                        src={sectionTwoImage2.src}
                        className="w-60 h-40 rounded-full object-cover"
                        alt="Section Two Image"
                        width={1000}
                        height={1000}
                    />
                    <Image
                        src={sectionTwoImage1.src}
                        className="w-60 h-40 rounded-full object-cover"
                        alt="Section Two Image"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="lg:w-[600px] px-4">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-[#aa9f90] text-center lg:text-left">
                        A place where you can be with yourself and your loved ones.
                        <br />
                        A place where you can experience unforgettable desert things.
                    </p>
                </div>
            </div>
        </section>
    );
}
