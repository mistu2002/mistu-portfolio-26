"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn("py-20 md:py-32", className)}
    >
      {children}
    </motion.section>
  );
}

interface SectionHeaderProps {
  number?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ number, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {number && (
        <span className="text-primary font-mono text-sm mb-2 block">
          _{number}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

