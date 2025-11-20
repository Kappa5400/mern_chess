import { MongoBatchReExecutionError } from "mongodb";
import { puzzle } from "../db/model/puzzle.js";
import axios from "axios";

export async function duplicatecheck(p) {
  const checkPGN = p.pgn;
  const test = await puzzle.findOne({ pgn: checkPGN });
  if (!test) return 0;
  return 1;
}

export async function getDailyPuzzle() {
  let link = "https://lichess.org/api/puzzle/daily";

  try {
    console.log("Attempting to get daily puzzle...");

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

    console.log("Checking if duplicate...");

    const result = await duplicatecheck(retrieved_puzzle);
    if (result === 1) {
      console.log("Duplicate detected");
      return null;
    }
    console.log("Saving fetched puzzle");

    await retrieved_puzzle.save();
    return null;
  } catch (Error) {
    console.log(`Error saving puzzle to db: ${Error}`);
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
