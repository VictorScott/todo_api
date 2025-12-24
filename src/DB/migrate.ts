import db from "./db";

async function migrate() {
  try {
    await db.authenticate();
    console.log("Database connection established successfully.");

    // Sync all models
    // alter: true - will alter existing tables to match models
    // force: true - will drop tables and recreate (WARNING: data loss!)
    await db.sync({ alter: true });

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await db.close();
  }
}

// Run migration if executed directly
if (require.main === module) {
  migrate()
    .then(() => {
      console.log("Migration completed successfully.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

export default migrate;
