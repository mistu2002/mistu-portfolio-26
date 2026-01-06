import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/app/_actions/sanity.actions";
import { CaseStudyHero } from "@/components/case-study/hero";
import { RelatedProjects } from "@/components/case-study/related-projects";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description || "",
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-20">
      <CaseStudyHero project={project} />
      <RelatedProjects currentSlug={params.slug} />
    </article>
  );
}

