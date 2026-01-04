import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  projectsByCategory,
  projectBySlugQuery,
  featuredProjectsQuery,
  categoriesQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries";
import type { Project, ProjectCard, Category } from "@/sanity/lib/types";

export async function getProjects(): Promise<ProjectCard[]> {
  return client.fetch(projectsQuery);
}

export async function getProjectsByCategory(category: string): Promise<ProjectCard[]> {
  return client.fetch(projectsByCategory, { category });
}

export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  return client.fetch(featuredProjectsQuery);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(projectBySlugQuery, { slug });
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery);
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(projectSlugsQuery);
}

