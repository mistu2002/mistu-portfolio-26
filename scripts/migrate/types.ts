// Types for Firebase project data structure
export interface FirebaseProject {
  id?: string;

  // Basic info (matches actual Firebase field names)
  Name: string; // Project name
  Description?: string; // Project description
  Category?: string; // e.g., "development"
  Type?: string; // e.g., "Full Stack"

  // Media
  Cover?: string; // Cover image URL (Firebase Storage URL)
  Video?: string; // YouTube video ID (not full URL)

  // Technologies/Software
  Software1?: string; // Primary technology
  Software2?: string; // Secondary technology
  Software3?: string; // Tertiary technology (optional)

  // Links
  Link?: string; // Live project URL

  // Metadata
  Relevance?: string | number; // Used for ordering (lower = higher priority)
  Timestamp?: any; // Firebase Timestamp or Date
  hidden?: boolean; // Whether to hide the project
}

export interface SanityUploadResult {
  _id: string;
  url: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface MigrationResult {
  success: boolean;
  projectId?: string;
  title: string;
  error?: string;
}

export interface MigrationStats {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
  results: MigrationResult[];
}
