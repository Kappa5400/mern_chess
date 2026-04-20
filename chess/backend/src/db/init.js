import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export async function initDB() {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connection.on("open", () => {
    logger.info("Connected to DB: ", MONGO_URI);
  });

  const connection = await mongoose.connect(process.env.MONGO_URI);

  return connection;
}
