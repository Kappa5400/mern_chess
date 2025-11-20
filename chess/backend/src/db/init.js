import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "./utils/logger.js";

export async function initDB() {
  const DB_URL = process.env.DB_URL;
  mongoose.connection.on("open", () => {
    logger.info("Connected to DB: ", DB_URL);
  });

  const connection = await mongoose.connect(DB_URL);

  return connection;
}
