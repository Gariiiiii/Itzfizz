"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const textRef = useRef(null);
  const boxRefs = useRef([]);

  const letters = "WELCOME ITZFIZZ".split("");

  const stats = [
    {
      value: "58%",
      text: "Increase in pick up point use",
      position: "top-[10%] right-[30%]",
      bg: "bg-[#def54f]",
      textColor: "text-[#111]",
      delay: 0.25,
    },
    {
      value: "23%",
      text: "Decreased in customer phone calls",
      position: "bottom-[10%] right-[35%]",
      bg: "bg-[#6ac9ff]",
      textColor: "text-[#111]",
      delay: 0.42,
    },
    {
      value: "27%",
      text: "Increase in pick up point use",
      position: "top-[10%] right-[10%]",
      bg: "bg-[#333]",
      textColor: "text-white",
      delay: 0.6,
    },
    {
      value: "40%",
      text: "Decreased in customer phone calls",
      position: "bottom-[10%] right-[12.5%]",
      bg: "bg-[#fa7328]",
      textColor: "text-[#111]",
      delay: 0.78,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const car = carRef.current;
    const trail = trailRef.current;

    if (!section || !track || !car || !trail) return;

    const ctx = gsap.context(() => {
      const carWidth = car.getBoundingClientRect().width;
      const roadWidth = track.getBoundingClientRect().width;

      const carEndX = roadWidth - carWidth / 2;
      const trailEndX = carEndX + 100;

      // Initial positions
      gsap.set(car, {
        x: 0,
      });

      gsap.set(trail, {
        width: 75,
      });

      gsap.set(boxRefs.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(textRef.current?.children, {
        opacity: 0,
        y: 15,
      });

      // Main scroll timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=830",
          scrub: 1,
          pin: track,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Car movement
      mainTimeline.to(
        car,
        {
          x: carEndX,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // Green trail
      mainTimeline.to(
        trail,
        {
          width: trailEndX,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // Welcome text animation
      const letterElements = textRef.current?.children;

      if (letterElements) {
        mainTimeline.to(
          letterElements,
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "power2.out",
            duration: 0.25,
          },
          0.05,
        );
      }

      // Stats animation
      stats.forEach((stat, index) => {
        mainTimeline.to(
          boxRefs.current[index],
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
          },
          stat.delay,
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#d1d1d1] font-sans text-neutral-900">
      <section ref={sectionRef} className="relative min-h-[200vh] w-full">
        <div
          ref={trackRef}
          className="relative flex h-screen w-full items-center overflow-visible"
        >
          {/* Road */}
          <div className="absolute left-0 top-1/2 h-50 w-full -translate-y-1/2 overflow-hidden bg-neutral-900">
            {/* Green trail */}
            <div
              ref={trailRef}
              className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[#45db7d]"
            />

            {/* Welcome text */}
            <div
              ref={textRef}
              className="pointer-events-none absolute left-[43%] top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap text-9xl font-bold text-neutral-900"
            >
              {letters.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 will-change-transform"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            {/* Car */}
            <Image
              ref={carRef}
              src="/itzfizz/car.png"
              alt="car"
              width={300}
              height={200}
              priority
              className="absolute left-0 top-1/2 z-20 h-50 w-auto -translate-y-1/2 object-contain will-change-transform"
            />
          </div>

          {/* Stat boxes */}
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              ref={(element) => {
                boxRefs.current[index] = element;
              }}
              className={`
                absolute
                z-30
                flex
                w-70
                flex-col
                items-start
                justify-center
                gap-1
                rounded-xl
                p-5
                opacity-0
                will-change-transform
                ${stat.position}
                ${stat.bg}
                ${stat.textColor}
              `}
            >
              <span className="text-5xl font-bold leading-none">
                {stat.value}
              </span>

              <span className="text-[14px] leading-snug">{stat.text}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
