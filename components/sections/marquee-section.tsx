"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const skills = [
  "Adobe XD",
  "Figma",
  "Sketch",
  "Adobe After Effects",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Cinema 4D",
  "Prototyping",
];

const domains = [
  "UI Design",
  "UX Research",
  "Interaction Design",
  "Motion Graphics",
  "2D Animation",
  "3D Animation",
  "Branding",
  "Design Systems",
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-8 px-4">
      <span className="text-4xl md:text-6xl font-display font-bold text-foreground/10 hover:text-primary transition-colors duration-300 uppercase tracking-tighter">
        {text}
      </span>
      <span className="w-3 h-3 bg-primary/20 rounded-full" />
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="relative -rotate-2 scale-110">
        <Marquee pauseOnHover duration="40s" className="border-y border-foreground/5 py-8 bg-background/30 backdrop-blur-sm">
          {skills.map((skill) => (
            <MarqueeItem key={skill} text={skill} />
          ))}
        </Marquee>
      </div>
      <div className="relative rotate-1 scale-110 -mt-12">
        <Marquee pauseOnHover reverse duration="45s" className="border-y border-foreground/5 py-8 bg-background/50 backdrop-blur-sm">
          {domains.map((domain) => (
            <MarqueeItem key={domain} text={domain} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
