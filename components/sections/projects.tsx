"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  projects: ProjectCardType[];
  tags: string[];
}

export function Projects({ projects, tags }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.tags?.includes(activeCategory))
    : projects;

  return (
    <Section id="projects">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          number="01"
          title="Selected Work"
          subtitle="A collection of projects I've worked on, from UI/UX design to 3D animations."
        />

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={activeCategory === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(tag || null)}
              >
                {tag}
              </Button>
            ))}
          </div>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    project.featured && index === 0 && "md:col-span-2 md:row-span-2"
                  )}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    featured={project.featured && index === 0}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}

export function ProjectsSkeleton() {
  return (
    <Section id="projects">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          number="01"
          title="Selected Work"
          subtitle="A collection of projects I've worked on, from full-stack applications to design systems."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

