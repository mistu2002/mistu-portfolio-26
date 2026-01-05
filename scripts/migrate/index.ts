import { firestore, sanityClient, config } from "./config";
import { transformProject } from "./transform";
import { FirebaseProject, MigrationStats, MigrationResult } from "./types";

/**
 * Fetch all projects from Firebase
 */
async function fetchFirebaseProjects(): Promise<FirebaseProject[]> {
  console.log(`\nFetching projects from Firebase collection: ${config.firebaseCollection}`);

  try {
    const snapshot = await firestore.collection(config.firebaseCollection).get();

    const projects: FirebaseProject[] = [];
    snapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data(),
      } as FirebaseProject);
    });

    console.log(`✓ Found ${projects.length} projects in Firebase\n`);
    return projects;
  } catch (error) {
    console.error("Error fetching Firebase projects:", error);
    throw error;
  }
}

/**
 * Check if a project already exists in Sanity
 */
async function projectExistsInSanity(title: string): Promise<boolean> {
  try {
    const query = `*[_type == "project" && title == $title][0]`;
    const existing = await sanityClient.fetch(query, { title });
    return !!existing;
  } catch (error) {
    console.error("Error checking Sanity for existing project:", error);
    return false;
  }
}

/**
 * Migrate a single project
 */
async function migrateProject(
  firebaseProject: FirebaseProject
): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: false,
    title: firebaseProject.Name,
  };

  try {
    // Check if project already exists
    if (config.skipExisting) {
      const exists = await projectExistsInSanity(firebaseProject.Name);
      if (exists) {
        console.log(`⊘ Skipping existing project: ${firebaseProject.Name}`);
        return { ...result, success: false, error: "Already exists" };
      }
    }

    // Transform the project
    const sanityDoc = await transformProject(firebaseProject);

    // Upload to Sanity (unless dry run)
    if (config.dryRun) {
      console.log(`[DRY RUN] Would create project: ${firebaseProject.Name}`);
      console.log(JSON.stringify(sanityDoc, null, 2));
      return { ...result, success: true };
    }

    const created = await sanityClient.create(sanityDoc);
    console.log(`✓ Migrated project: ${firebaseProject.Name} (${created._id})`);

    return {
      ...result,
      success: true,
      projectId: created._id,
    };
  } catch (error: any) {
    console.error(`✗ Failed to migrate: ${firebaseProject.Name}`, error);
    return {
      ...result,
      success: false,
      error: error.message || String(error),
    };
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log("╔════════════════════════════════════════════════╗");
  console.log("║   Firebase → Sanity Portfolio Migration       ║");
  console.log("╚════════════════════════════════════════════════╝\n");

  if (config.dryRun) {
    console.log("⚠️  DRY RUN MODE - No changes will be made\n");
  }

  const stats: MigrationStats = {
    total: 0,
    successful: 0,
    failed: 0,
    skipped: 0,
    results: [],
  };

  try {
    // Fetch projects from Firebase
    const firebaseProjects = await fetchFirebaseProjects();
    stats.total = firebaseProjects.length;

    if (firebaseProjects.length === 0) {
      console.log("No projects found in Firebase. Exiting.");
      return;
    }

    // Migrate projects
    console.log("Starting migration...\n");
    for (const project of firebaseProjects) {
      const result = await migrateProject(project);
      stats.results.push(result);

      if (result.success) {
        stats.successful++;
      } else if (result.error === "Already exists") {
        stats.skipped++;
      } else {
        stats.failed++;
      }

      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Print summary
    console.log("\n╔════════════════════════════════════════════════╗");
    console.log("║              Migration Summary                 ║");
    console.log("╚════════════════════════════════════════════════╝");
    console.log(`Total projects:      ${stats.total}`);
    console.log(`✓ Successful:        ${stats.successful}`);
    console.log(`⊘ Skipped:           ${stats.skipped}`);
    console.log(`✗ Failed:            ${stats.failed}`);
    console.log("");

    if (stats.failed > 0) {
      console.log("Failed projects:");
      stats.results
        .filter((r) => !r.success && r.error !== "Already exists")
        .forEach((r) => {
          console.log(`  - ${r.title}: ${r.error}`);
        });
      console.log("");
    }

    console.log("Migration complete! 🎉\n");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run migration
migrate()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
