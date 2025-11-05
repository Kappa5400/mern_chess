import dotenv from "dotenv";

dotenv.config();

import { initDB } from "./db/init.js";
import { app } from "./app.js";

try {
  await initDB();
  const PORT = process.env.PORT;
  app.listen(PORT);
  console.info(`Express server running on port ${PORT}`);
} catch (err) {
  console.error("Error connecting to database:", err);
}
