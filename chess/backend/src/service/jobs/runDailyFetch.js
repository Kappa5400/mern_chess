import mongoose from "mongoose";
import { getDailyPuzzle } from "../s_puzzle.js";
import "dotenv/config";
import { logger } from "../../utils/logger.js";

const run = async () => {
  logger.info("Starting dailypuzzle fetch script");
  logger.info("Connecting to DB...");
  try {
    logger.info("Loaded DB_URL:", process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    logger.info("Success");
  } catch (err) {
    logger.info("Error connecting to db: ", err);
    process.exit(1);
  }
  logger.info("Attempting to get daily puzzle from manual script");
  try {
    await getDailyPuzzle();
  } catch (err) {
    logger.info("Error getting daily puzzle: ", err);
    process.exit(2);
  }
  await mongoose.connection.close();
  logger.info("Closed db connection.");
  process.exit(0);
};
run();
