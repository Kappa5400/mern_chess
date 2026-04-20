import dotenv from "dotenv";

dotenv.config();

import { initDB } from "./db/init.js";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";

try {
  await initDB();
  const PORT = process.env.PORT;
  app.listen(PORT);
  logger.info(`Express server running on port ${PORT}`);
} catch (err) {
  logger.error("Error connecting to database:", err);
}
