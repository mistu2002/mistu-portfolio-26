"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

interface ProjectCardProps {
  project: ProjectCardType;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const year = project.date ? new Date(project.date).getFullYear() : null;

  return (
    <Link href={`/project/${project.slug.current}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="space-y-4"
      >
        <div className={clsx("relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/20", featured && "aspect-[7/6]")}>
          {project.coverImage?.asset && (
            <Image
              src={urlFor(project.coverImage).width(1200).height(900).url()}
              alt={project.coverImage.alt || project.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
            />
          )}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
          
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight className="w-5 h-5 text-foreground" />
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-foreground/10 pt-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.tags && project.tags.length > 0 && (
              <p className="text-muted-foreground text-sm mt-1">
                {project.tags.slice(0, 3).join(" / ")}
              </p>
            )}
          </div>
          {year && (
            <span className="font-mono text-sm text-foreground/40">
              {year}
            </span>
          )}
        </div>
      </motion.article>
    </Link>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-[4/3] bg-muted rounded-2xl" />
      <div className="border-t border-muted pt-4 space-y-2">
        <div className="h-8 w-1/2 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded" />
      </div>
    </div>
  );
}
