import "dotenv/config";
import { app } from "./app.js";
import { initJobs } from "./service/jobs/dailypuzzleget.js";
import { initDB } from "./db/init.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT;

const start = async () => {
  try {
    await initDB();
    initJobs();
    app.listen(PORT, () => {
      logger.info(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
