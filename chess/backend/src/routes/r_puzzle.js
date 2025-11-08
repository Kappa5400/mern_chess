import { puzzle } from "../db/puzzle.js";
import {
  retrieveDailyPuzzle,
  getPuzzleByID,
  get_all_puzzles,
} from "../service/s_puzzle.js";

import mongoose from "mongoose";

export function routes(app) {
  app.post("/api/v1/get_dailypuzzle", async (req, res) => {
    const daily = await retrieveDailyPuzzle();
    return res.json(daily);
  });

  app.get("/api/v1/get_all_puzzles", async (req, res) => {
    const all_puzzles = await get_all_puzzles();
    return res.json(all_puzzles);
  });

  app.get("/api/v1/puzzle/:id", async (req, res) => {
    const { id } = req.params;
    const hit_puzzle = await puzzle.findById(id);
    if (!hit_puzzle) return res.status(404).json({ error: "Puzzle not found" });
    return res.json(hit_puzzle);
  });
}
