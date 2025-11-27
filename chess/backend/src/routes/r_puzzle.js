import {
  getDailyPuzzle,
  getPuzzleByID,
  get_all_puzzles,
  getMostRecent,
} from "../service/s_puzzle.js";

import { validate, objectIdSchema } from "../middleware/joi.js";

export function puzzleRoutes(app) {
  app.post("/api/v1/puzzle/getAllPuzzle", async (req, res) => {
    const daily = await getDailyPuzzle();
    return jsonify({ message: "Daily puzzle was saved to db." }), 200;
  });

  app.get("/api/v1/puzzle/GetAllPuzzles", async (req, res) => {
    const all_puzzles = await get_all_puzzles();
    return res.json([all_puzzles]);
  });

  app.get(
    "/api/v1/puzzle/byuserid/:id",
    validate(objectIdSchema),
    async (req, res) => {
      const { id } = req.params;
      const reqP = await getPuzzleByID(id);
      return res.json(reqP);
    }
  );

  app.get("/api/v1/puzzle/recent", async (req, res) => {
    const most_recent_puzzle = await getMostRecent();
    return res.json(most_recent_puzzle);
  });
}
