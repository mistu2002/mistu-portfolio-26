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
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        right,
        y,
        filter: `blur(${blur}px)`,
        opacity,
        zIndex,
        scale,
      }}
      className="pointer-events-none select-none"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-auto h-auto max-w-none"
      />
    </motion.div>
  );
}

export function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Top Section Clouds */}
      <Cloud
        src="/cloud-small.png"
        alt="Large Cloud"
        width={800}
        height={400}
        top="-10%"
        right="-30%"
        speed={-0.5}
        blur={2}
        opacity={0.8}
        zIndex={-100}
        scrollY={scrollY}
      />
      {/* <Cloud
        src="/cloud-small.png"
        alt="Small Cloud"
        width={300}
        height={150}
        top="15%"
        left="5%"
        speed={0.8}
        blur={0}
        opacity={0.9}
        zIndex={-1}
        scrollY={scrollY}
      /> */}

      {/* Mid Section Clouds */}
      {/* <Cloud
        src="/cloud-med.png"
        alt="Medium Cloud"
        width={600}
        height={300}
        top="40%"
        right="15%"
        speed={-0.3}
        blur={4}
        opacity={0.6}
        zIndex={-2}
        scrollY={scrollY}
      /> */}
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
        right="25%"
        speed={1.2}
        blur={2}
        opacity={0.4}
        zIndex={-100}
        scrollY={scrollY}
      />
       <Cloud
        src="/cloud-med.png"
        alt="Medium Cloud Bottom"
        width={500}
        height={250}
        top="100%"
        left="10%"
        speed={-0.8}
        blur={3}
        opacity={0.7}
        zIndex={-100}
        scrollY={scrollY}
      />
    </div>
  );
}

