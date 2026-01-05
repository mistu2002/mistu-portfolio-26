import { storage, sanityClient, config } from "./config";
import { SanityUploadResult } from "./types";
import { createReadStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

/**
 * Check if a string is a Firebase Storage path
 */
function isFirebaseStoragePath(path: string): boolean {
  return (
    path.startsWith("gs://") ||
    path.includes("firebasestorage.googleapis.com") ||
    (!path.startsWith("http://") && !path.startsWith("https://"))
  );
}

/**
 * Download image from Firebase Storage
 */
async function downloadFromFirebaseStorage(
  path: string
): Promise<Buffer | null> {
  try {
    // Remove gs:// prefix if present
    const cleanPath = path.replace(/^gs:\/\/[^/]+\//, "");

    const bucket = storage.bucket();
    const file = bucket.file(cleanPath);

    const [exists] = await file.exists();
    if (!exists) {
      console.warn(`File not found in Firebase Storage: ${cleanPath}`);
      return null;
    }

    const [buffer] = await file.download();
    return buffer;
  } catch (error) {
    console.error(`Error downloading from Firebase Storage: ${path}`, error);
    return null;
  }
}

/**
 * Download image from URL
 */
async function downloadFromUrl(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to download image from URL: ${url}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Error downloading from URL: ${url}`, error);
    return null;
  }
}

/**
 * Upload image buffer to Sanity
 */
async function uploadToSanity(
  buffer: Buffer,
  filename: string
): Promise<SanityUploadResult | null> {
  try {
    // Save to temp file
    const tempPath = join(tmpdir(), filename);
    await writeFile(tempPath, buffer);

    // Upload to Sanity
    const asset = await sanityClient.assets.upload("image", createReadStream(tempPath), {
      filename,
    });

    // Clean up temp file
    await unlink(tempPath);

    return {
      _id: asset._id,
      url: asset.url,
      asset: {
        _ref: asset._id,
        _type: "reference",
      },
    };
  } catch (error) {
    console.error(`Error uploading to Sanity: ${filename}`, error);
    return null;
  }
}

/**
 * Main function to migrate an image
 */
export async function migrateImage(
  imagePath: string,
  altText?: string
): Promise<any | null> {
  if (!imagePath) return null;

  if (config.dryRun) {
    console.log(`[DRY RUN] Would migrate image: ${imagePath}`);
    return null;
  }

  try {
    console.log(`Migrating image: ${imagePath}`);

    // Download the image
    let buffer: Buffer | null = null;

    if (isFirebaseStoragePath(imagePath)) {
      buffer = await downloadFromFirebaseStorage(imagePath);
    } else {
      buffer = await downloadFromUrl(imagePath);
    }

    if (!buffer) {
      return null;
    }

    // Check file size
    if (buffer.length > config.maxImageSize) {
      console.warn(
        `Image too large (${buffer.length} bytes): ${imagePath}`
      );
      return null;
    }

    // Generate filename
    const filename = imagePath.split("/").pop() || `image-${Date.now()}.jpg`;

    // Upload to Sanity
    const result = await uploadToSanity(buffer, filename);

    if (result) {
      return {
        _type: "image",
        asset: result.asset,
        alt: altText || "",
      };
    }

    return null;
  } catch (error) {
    console.error(`Failed to migrate image: ${imagePath}`, error);
    return null;
  }
}

/**
 * Migrate multiple images
 */
export async function migrateImages(
  imagePaths: string[]
): Promise<any[]> {
  const results = [];

  for (const path of imagePaths) {
    const result = await migrateImage(path);
    if (result) {
      results.push(result);
    }
  }

  return results;
}
