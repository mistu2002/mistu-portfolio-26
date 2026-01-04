"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animation?: "fade" | "slide" | "blur" | "chars";
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Component = "p",
  animation = "chars",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (animation === "chars") {
    const chars = text.split("");
    return (
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn("inline-block", className)}
        style={{ transitionDelay: `${delay}s` }}
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  const MotionComponent = motion.create(Component);
  
  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLParagraphElement>}
      initial={{ opacity: 0, y: animation === "slide" ? 30 : 0, filter: animation === "blur" ? "blur(10px)" : "none" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {text}
    </MotionComponent>
  );
}

interface AnimatedWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function AnimatedWords({ text, className, wordClassName, delay = 0 }: AnimatedWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={cn("inline-block mr-[0.25em]", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

