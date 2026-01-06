import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  projectBySlugQuery,
  featuredProjectsQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries";
import type { Project, ProjectCard } from "@/sanity/lib/types";

// Get all projects
export async function getProjects(): Promise<ProjectCard[]> {
  return client.fetch(projectsQuery);
}

// Get only featured projects
export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  return client.fetch(featuredProjectsQuery);
}

// Get single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(projectBySlugQuery, { slug });
}

// Get all project slugs for static generation
export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(projectSlugsQuery);
}

// =====================================
// DEPRECATED FUNCTIONS (Removed)
// =====================================

/*
export async function getProjectsByCategory(category: string): Promise<ProjectCard[]> {
  return client.fetch(projectsByCategory, { category });
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery);
}
*/
