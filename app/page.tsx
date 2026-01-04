import { Hero } from "@/components/sections/hero";
import { Projects, ProjectsSkeleton } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { getProjects, getCategories } from "@/app/_actions/sanity.actions";
import { Suspense } from "react";

async function ProjectsSection() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return <Projects projects={projects} categories={categories} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <About />
    </>
  );
}
