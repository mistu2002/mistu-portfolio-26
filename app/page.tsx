import { Hero } from "@/components/sections/hero";
import { Projects, ProjectsSkeleton } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { getProjects } from "@/app/_actions/sanity.actions";
import { Suspense } from "react";

async function ProjectsSection() {
  const projects = await getProjects();

  return <Projects projects={projects} tags={[]} />;
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
