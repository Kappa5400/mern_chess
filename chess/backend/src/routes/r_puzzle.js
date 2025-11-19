import {
  getDailyPuzzle,
  getPuzzleByID,
  get_all_puzzles,
  getMostRecent,
} from "../service/s_puzzle.js";

export function routes(app) {
  app.post("/api/v1/get_dailypuzzle", async (req, res) => {
    const daily = await getDailyPuzzle();
    return jsonify({ message: "Daily puzzle was saved to db." }), 200;
  });

  app.get("/api/v1/get_all_puzzles", async (req, res) => {
    const all_puzzles = await get_all_puzzles();
    return res.json([all_puzzles]);
  });

  app.get("/api/v1/puzzle/:id", async (req, res) => {
    const { id } = req.params;
    const reqP = await getPuzzleByID(id);
    return res.json(reqP);
  });

  app.get("/api/v1/recent", async (req, res) => {
    const most_recent_puzzle = await getMostRecent();
    return res.json(most_recent_puzzle);
  });
}
