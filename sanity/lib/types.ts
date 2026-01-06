import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Image type for Sanity images
export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
}

// Full project type (for project detail pages)
export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  date?: string;
  coverImage?: SanityImage;
  projectImages?: SanityImage[];
  video?: string;
  websiteLink?: string;
  behanceLink?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
}

// Project card type (for listings/grids)
export interface ProjectCard {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  date?: string;
  coverImage?: SanityImage;
  tags?: string[];
  featured?: boolean;
}

// =====================================
// DEPRECATED TYPES (Kept for reference)
// =====================================

/*
export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface ProjectInfo {
  platform?: string;
  role?: string[];
  team?: string;
  duration?: string;
  client?: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  figma?: string;
  video?: string;
}
*/
