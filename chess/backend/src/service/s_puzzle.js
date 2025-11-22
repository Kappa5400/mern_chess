import { puzzle } from "../db/model/puzzle.js";
import axios from "axios";
import { logger } from "../utils/logger.js";

export async function duplicatecheck(p) {
  const checkPGN = p.pgn;
  const test = await puzzle.findOne({ pgn: checkPGN });
  if (!test) return 0;
  return 1;
}

export async function getDailyPuzzle() {
  let link = "https://lichess.org/api/puzzle/daily";

  try {
    logger.info("Attempting to get daily puzzle...");

    const { data } = await axios.get(link);

    const retrieved_puzzle = new puzzle({
      pgn: data.game.pgn,
      answer: data.puzzle.solution.join(" "),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rating: data.puzzle.rating,
    });

    logger.info("Checking if duplicate...");

    const result = await duplicatecheck(retrieved_puzzle);
    if (result === 1) {
      logger.info("Duplicate detected");
      return null;
    }
    logger.info("Saving fetched puzzle");

    await retrieved_puzzle.save();
    return null;
  } catch (Error) {
    logger.info(`Error saving puzzle to db: ${Error}`);
  }
}

export async function get_all_puzzles(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {}
) {
  return await puzzle.find(query).sort({ [sortBy]: sortOrder });
}

export async function list_all_puzzles(options) {
  return get_all_puzzles({}, options);
}

export async function getPuzzleByID(puzzleId) {
  return await puzzle.findById(puzzleId);
}

export async function getMostRecent() {
  return await puzzle.findOne().sort({ createdAt: -1 });
}

export async function deleteOldest() {
  return await puzzle.findOneAndDelete().sort({ createdAt: 1 });
}
