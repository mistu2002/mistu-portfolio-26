"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

function Cloud({
  src,
  alt,
  width,
  height,
  top,
  left,
  right,
  speed = 1,
  blur = 0,
  opacity = 1,
  scale = 1,
  zIndex = -10,
  scrollY,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  speed?: number;
  blur?: number;
  opacity?: number;
  scale?: number;
  zIndex?: number;
  scrollY: MotionValue<number>;
}) {
  const yRaw = useTransform(scrollY, [0, 5000], [0, 5000 * speed * 0.2]);
  const y = useSpring(yRaw, { stiffness: 50, damping: 20 });

  return (
    <div
      className="fixed pointer-events-none select-none scale-[0.6] md:scale-[0.8] lg:scale-100 origin-center will-change-transform"
      style={{
        top,
        left,
        right,
        zIndex,
      }}
    >
      <motion.div
        style={{
          y,
          filter: `blur(${blur}px)`,
          opacity,
          scale,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-auto h-auto max-w-none"
        />
      </motion.div>
    </div>
  );
}

export function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1000]"
    >
      {/* Top Section Clouds */}
      <Cloud
        src="/cloud-small.png"
        alt="Large Cloud"
        width={800}
        height={400}
        top="-10%"
        right="-10%"
        speed={-0.5}
        blur={2}
        opacity={0.8}
        zIndex={-99}
        scrollY={scrollY}
      />
      
      {/* Mid Section Clouds */}
      <Cloud
        src="/cloud-small.png"
        alt="Large Cloud Background"
        width={1000}
        height={500}
        top="20%"
        left="-20%"
        speed={0.2}
        blur={8}
        opacity={0.4}
        zIndex={-100}
        scrollY={scrollY}
      />

      {/* Lower Section Clouds */}
      <Cloud
        src="/cloud-small.png"
        alt="Small Cloud Floating"
        width={250}
        height={120}
        top="105%"
        right="5%"
        speed={1.2}
        blur={2}
        opacity={0.2}
        zIndex={-100}
        scrollY={scrollY}
      />
       <Cloud
        src="/cloud-med.png"
        alt="Medium Cloud Bottom"
        width={500}
        height={250}
        top="100%"
        left="40%"
        speed={-0.8}
        blur={3}
        opacity={0.7}
        zIndex={-100}
        scrollY={scrollY}
      />
    </div>
  );
}
