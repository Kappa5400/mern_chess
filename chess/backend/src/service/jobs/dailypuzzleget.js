import { getDailyPuzzle } from "../s_puzzle.js";
import { CronJob } from "cron";
import { logger } from "./utils/logger.js";

async function getterpuzzlejobber() {
  logger.info("Cron job to get daily puzzle");
  try {
    getDailyPuzzle();
    logger.info("Success");
  } catch (err) {
    logger.info("Error fetching daily puzzle: ", err);
  }
}

const nightshift = new CronJob(
  "0 3 * * *",
  () => getterpuzzlejobber(),
  null,
  true,
  "UTC"
);

const dayshift = new CronJob(
  "0 13 * * *",
  () => getterpuzzlejobber(),
  null,
  true,
  "UTC"
);

export const initJobs = () => {
  nightshift.start();
  dayshift.start();
  logger.info("Nightshift and dayshift jobs started");
};
