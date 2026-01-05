import * as admin from "firebase-admin";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.migration" });

// Validate required environment variables
const requiredEnvVars = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "SANITY_API_TOKEN",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const firestore = admin.firestore();
export const storage = admin.storage();

// Initialize Sanity Client with write access
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// Configuration
export const config = {
  // Firebase collection name (adjust if different)
  firebaseCollection: process.env.FIREBASE_COLLECTION || "projects",

  // Sanity document type
  sanityDocumentType: "project",

  // Image upload settings
  maxImageSize: 10 * 1024 * 1024, // 10MB
  supportedImageFormats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],

  // Migration settings
  batchSize: 10, // Process projects in batches
  skipExisting: true, // Skip projects that already exist in Sanity
  dryRun: false, // Set to true to test without actually uploading
};
