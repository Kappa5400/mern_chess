import {
  retrieveDailyPuzzle,
  getPuzzleByID,
  get_all_puzzles,
} from "../service/s_puzzle.js";

export function routes(app) {
  app.post("/api/v1/get_dailypuzzle", async (req, res) => {
    const daily = await retrieveDailyPuzzle();
    return res.json(daily);
  });

  app.get("/api/v1/get_all_puzzles", async (req, res) => {
    const all_puzzles = await get_all_puzzles();
    return all_puzzles.jsonify();
  });

  app.get("api/v1/puzzle/:id", async (req, res) => {
    const { id } = req.params;
    const puzzle = await getPuzzleByID(id);
    return puzzle.jsonify();
  });
}
