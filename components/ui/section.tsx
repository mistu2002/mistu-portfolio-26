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
      className={cn("py-24 md:py-40", className)}
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
    <div className={cn("mb-16 md:mb-24 flex flex-col md:flex-row gap-8 md:gap-16 items-start", className)}>
      {number && (
        <span className="text-8xl md:text-9xl font-display font-bold text-foreground/5 leading-none -mt-4 select-none">
          {number}
        </span>
      )}
      <div>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
