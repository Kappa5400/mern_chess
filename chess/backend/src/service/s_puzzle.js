import { puzzle } from "../db/puzzle.js";
import axios from "axios";

export async function retrieveDailyPuzzle() {
  let link = "https://lichess.org/api/puzzle/daily";

  try {
    console.log("Attempting to get daily puzzle...");

    const { data } = await axios.get(link);

    const retrieved_puzzle = new puzzle({
      pgn: data.game.pgn,
      answer: data.game.solution,
      date: data.game.createdAt,
      rating: data.game.rating,
    });

    console.log("Saving fetched puzzle");

    return await retrieved_puzzle.save();
  } catch (Error) {
    console.log(`Error retrieving daily puzzle: ${Error}`);
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
