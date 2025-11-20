import mongoose from "mongoose";
import { getDailyPuzzle } from "../s_puzzle.js";
import "dotenv/config";

const run = async () => {
  console.log("Starting dailypuzzle fetch script");
  console.log("Connecting to DB...");
  try {
    console.log("Loaded DB_URL:", process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("Success");
  } catch (err) {
    console.log("Error connecting to db: ", err);
    process.exit(1);
  }
  console.log("Attempting to get daily puzzle from manual script");
  try {
    await getDailyPuzzle();
  } catch (err) {
    console.log("Error getting daily puzzle: ", err);
    process.exit(2);
  }
  await mongoose.connection.close();
  console.log("Closed db connection.");
  process.exit(0);
};
run();
