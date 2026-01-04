"use client";

import { useEffect, useState } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { getProjects } from "@/app/_actions/sanity.actions";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";

interface RelatedProjectsProps {
  currentSlug: string;
}

export function RelatedProjects({ currentSlug }: RelatedProjectsProps) {
  const [projects, setProjects] = useState<ProjectCardType[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const allProjects = await getProjects();
      const related = allProjects
        .filter((p) => p.slug.current !== currentSlug)
        .slice(0, 3);
      setProjects(related);
    }
    fetchProjects();
  }, [currentSlug]);

  if (projects.length === 0) return null;

  return (
    <Section className="border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="More Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

