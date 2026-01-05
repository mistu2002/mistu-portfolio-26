import { FirebaseProject } from "./types";
import { migrateImage } from "./upload-images";
import { sanityClient } from "./config";

/**
 * Generate a slug from a title
 */
function generateSlug(title: string): string {
  return title
    ?.toLowerCase()
    ?.replace(/[^a-z0-9]+/g, "-")
    ?.replace(/^-+|-+$/g, "");
}

/**
 * Convert markdown or plain text to Sanity block content
 */
function convertToBlockContent(content: string): any[] {
  if (!content) return [];

  // Simple conversion - splits by paragraphs
  const paragraphs = content.split(/\n\n+/);

  return paragraphs
    .filter((p) => p.trim())
    .map((paragraph) => ({
      _type: "block",
      _key: `block-${Math.random().toString(36).substr(2, 9)}`,
      style: "normal",
      children: [
        {
          _type: "span",
          _key: `span-${Math.random().toString(36).substr(2, 9)}`,
          text: paragraph.trim(),
          marks: [],
        },
      ],
    }));
}

/**
 * Find or create a category in Sanity
 */
async function findOrCreateCategory(
  categoryName: string
): Promise<{ _type: string; _ref: string } | undefined> {
  if (!categoryName) return undefined;

  try {
    const slug = generateSlug(categoryName);

    // Check if category exists
    const existingCategory = await sanityClient.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    );

    if (existingCategory) {
      return {
        _type: "reference",
        _ref: existingCategory._id,
      };
    }

    // Create new category
    const newCategory = await sanityClient.create({
      _type: "category",
      title: categoryName,
      slug: {
        _type: "slug",
        current: slug,
      },
    });

    return {
      _type: "reference",
      _ref: newCategory._id,
    };
  } catch (error) {
    console.error(`Error creating category: ${categoryName}`, error);
    return undefined;
  }
}

/**
 * Convert Firebase Timestamp to ISO string
 */
function convertTimestamp(timestamp: any): string {
  if (!timestamp) return new Date().toISOString();

  // Firebase Timestamp has toDate() method
  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp.toDate().toISOString();
  }

  // Handle regular Date object or string
  try {
    return new Date(timestamp).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Convert YouTube video ID to full URL
 */
function getYouTubeUrl(videoId: string): string | undefined {
  if (!videoId) return undefined;
  // If it's already a full URL, return it
  if (videoId.startsWith("http")) return videoId;
  // Convert video ID to full URL
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Build tags array from Software fields and Type
 */
function buildTagsArray(project: FirebaseProject): string[] {
  const tags: string[] = [];

  if (project.Software1) tags.push(project.Software1);
  if (project.Software2) tags.push(project.Software2);
  if (project.Software3) tags.push(project.Software3);
  if (project.Type) tags.push(project.Type);

  return tags.filter(Boolean);
}

/**
 * Transform Firebase project to Sanity project format
 */
export async function transformProject(
  firebaseProject: FirebaseProject
): Promise<any> {
  console.log(`Transforming project: ${firebaseProject.Name}`);

  // Migrate hero image (Cover field)
  let heroImage = null;
  if (firebaseProject.Cover) {
    heroImage = await migrateImage(
      firebaseProject.Cover,
      firebaseProject.Name
    );
  }

  // Handle category
  let category = undefined;
  if (firebaseProject.Category) {
    category = await findOrCreateCategory(firebaseProject.Category);
  }

  // Build tags from Software fields and Type
  const tags = buildTagsArray(firebaseProject);

  // Handle content from Description
  let content: any[] = [];
  if (firebaseProject.Description) {
    content = convertToBlockContent(firebaseProject.Description);
  }

  // Convert Relevance to order (lower relevance = higher priority)
  const order = firebaseProject.Relevance
    ? typeof firebaseProject.Relevance === "string"
      ? parseInt(firebaseProject.Relevance, 10)
      : firebaseProject.Relevance
    : 999;

  // Convert YouTube video ID to full URL
  const videoUrl = firebaseProject.Video
    ? getYouTubeUrl(firebaseProject.Video)
    : undefined;

  // Build Sanity document
  const sanityDoc = {
    _type: "project",
    title: firebaseProject.Name,
    slug: {
      _type: "slug",
      current: generateSlug(firebaseProject.Name),
    },
    category,
    tags,
    heroImage,
    heroVideo: videoUrl,
    excerpt: firebaseProject.Description?.substring(0, 200),
    projectInfo: {
      _type: "object",
      platform: firebaseProject.Type, // Using Type as platform
    },
    content,
    links: {
      _type: "object",
      live: firebaseProject.Link,
      video: videoUrl,
    },
    featured: order <= 3, // Auto-feature projects with high relevance
    order,
    hidden: firebaseProject.hidden || false,
    publishedAt: convertTimestamp(firebaseProject.Timestamp),
  };

  // Remove undefined/null fields
  return JSON.parse(JSON.stringify(sanityDoc));
}
