"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Firebase",
  "Figma",
  "UI/UX Design",
  "Full-Stack",
  "HCI Research",
];

const domains = [
  "Web Development",
  "Mobile Apps",
  "Design Systems",
  "Product Design",
  "Motion Graphics",
  "User Research",
  "Prototyping",
  "Frontend",
  "Backend",
];

function MarqueeItem({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-6 py-3 rounded-full border",
        highlight
          ? "bg-primary/10 border-primary/30 text-primary"
          : "bg-card border-border text-muted-foreground"
      )}
    >
      <span className="text-sm font-medium whitespace-nowrap">{text}</span>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section className="py-16 overflow-hidden border-y border-border bg-card/30">
      <Marquee pauseOnHover duration="30s" gap="1rem">
        {skills.map((skill, index) => (
          <MarqueeItem key={skill} text={skill} highlight={index % 3 === 0} />
        ))}
      </Marquee>
      <div className="h-4" />
      <Marquee pauseOnHover reverse duration="35s" gap="1rem">
        {domains.map((domain, index) => (
          <MarqueeItem key={domain} text={domain} highlight={index % 2 === 0} />
        ))}
      </Marquee>
    </section>
  );
}

