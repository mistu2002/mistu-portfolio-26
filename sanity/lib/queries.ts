import { groq } from "next-sanity";

// Get all projects for listing/grid view
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, date desc) {
    _id,
    title,
    slug,
    description,
    date,
    tags,
    featured,
    coverImage {
      asset->,
      alt
    }
  }
`;

// Get only featured projects
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, date desc) {
    _id,
    title,
    slug,
    description,
    date,
    tags,
    featured,
    coverImage {
      asset->,
      alt
    }
  }
`;

// Get single project by slug with full details
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    date,
    tags,
    featured,
    coverImage {
      asset->,
      alt
    },
    projectImages[] {
      asset->,
      alt,
      caption
    },
    video,
    websiteLink,
    behanceLink
  }
`;

// Get all project slugs for static generation
export const projectSlugsQuery = groq`
  *[_type == "project"].slug.current
`;

// =====================================
// DEPRECATED QUERIES (Kept for reference)
// =====================================

/*
// Projects filtered by category
export const projectsByCategory = groq`
  *[_type == "project" && !hidden && category->slug.current == $category] | order(order asc) {
    ...
  }
`;

// All categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;
*/
