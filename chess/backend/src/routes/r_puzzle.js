import {
  getDailyPuzzle,
  getPuzzleByID,
  get_all_puzzles,
  getMostRecent,
} from "../service/s_puzzle.js";

import { validate, objectIdSchema } from "../middleware/joi.js";

/**
 * @swagger
 * /puzzle/fetch:
 *   post:
 *     summary: Daily puzzle retrieval operation
 *     description: This endpoint fetches and initiates the daily puzzle process.
 *     tags:
 *       - Puzzles
 *     responses:
 *       200:
 *         description: Success
 *
 * /puzzle/GetAllPuzzles:
 *  get:
 *    summary: Get all puzzles.
 *    description: Get all puzzles in database from daily puzzle list.
 *    tags:
 *      - Puzzles
 *    responses:
 *      200:
 *        description: Success
 *
 * /puzzle/bypuzzleid/{id}:
 *  get:
 *    summary: Get puzzle by puzzle id.
 *    description: Get all puzzle in database from user by searching for puzzle ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: find puzzle by searching puzzle ID.
 *    tags:
 *      - Puzzles
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *
 * /puzzle/recent:
 *  get:
 *    summary: Get recent puzzle.
 *    description: Get most recent puzzle in database.
 *    tags:
 *      - Puzzles
 *    responses:
 *      200:
 *        description: Success
 */

export function puzzleRoutes(app) {
  app.post("/v1/puzzle/fetch", async (req, res) => {
    const daily = await getDailyPuzzle();
    return res.status(200).json({ message: "Daily puzzle was saved to db" });
  });

  app.get("/v1/puzzle/GetAllPuzzles", async (req, res) => {
    const all_puzzles = await get_all_puzzles();
    return res.json([all_puzzles]);
  });

  app.get(
    "/v1/puzzle/bypuzzleid/:id",
    validate(objectIdSchema),
    async (req, res) => {
      const { id } = req.params;
      const reqP = await getPuzzleByID(id);
      return res.json(reqP);
    }
  );

  app.get("/v1/puzzle/recent", async (req, res) => {
    const most_recent_puzzle = await getMostRecent();
    return res.json(most_recent_puzzle);
  });
}
