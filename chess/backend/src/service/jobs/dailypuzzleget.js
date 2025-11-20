import { getDailyPuzzle } from "../s_puzzle.js";
import { CronJob } from "cron";

async function getterpuzzlejobber() {
  console.log("Cron job to get daily puzzle");
  try {
    getDailyPuzzle();
    console.log("Success");
  } catch (err) {
    console.log("Error fetching daily puzzle: ", err);
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
  console.log("Nightshift and dayshift jobs started");
};
