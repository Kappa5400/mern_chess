import mongoose from "mongoose";
import { getDailyPuzzle } from "../s_puzzle.js";
import "dotenv/config";
import { logger } from "../../utils/logger.js";

const run = async () => {
  logger.log("Starting dailypuzzle fetch script");
  logger.log("Connecting to DB...");
  try {
    logger.log("Loaded DB_URL:", process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    logger.log("Success");
  } catch (err) {
    logger.log("Error connecting to db: ", err);
    process.exit(1);
  }
  logger.log("Attempting to get daily puzzle from manual script");
  try {
    await getDailyPuzzle();
  } catch (err) {
    logger.log("Error getting daily puzzle: ", err);
    process.exit(2);
  }
  await mongoose.connection.close();
  logger.log("Closed db connection.");
  process.exit(0);
};
run();
