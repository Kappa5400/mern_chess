import mongoose from "mongoose";
import { getDailyPuzzle } from "../s_puzzle.js";
import "dotenv/config";
import { logger } from "../../utils/logger.js";
import { deleteOldest } from "../s_puzzle.js";

const run = async () => {
  logger.info("Starting dailypuzzle fetch script");
  let del_flag = 0;
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
    del_flag = 1;
  } catch (err) {
    logger.info("Error getting daily puzzle: ", err);
    process.exit(2);
  }

  if (del_flag == 1) {
    try {
      logger.info("Attempting to delete oldest in db...");
      deleteOldest();
      logger.info("Oldest deleted.");
    } catch (err) {
      logger.info("Error deleting oldest puzzle in db: ", err);
    }
  }
  del_flag = 0;

  await mongoose.connection.close();
  logger.info("Closed db connection.");
  process.exit(0);
};
run();
