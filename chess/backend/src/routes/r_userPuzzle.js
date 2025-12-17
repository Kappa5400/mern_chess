import {
  getUserPuzzles,
  getPuzzleByPuzzleID,
  updateUserPuzzle,
  deleteUserPuzzle,
  createUserPuzzle,
} from "../service/s_userPuzzle.js";

import { requireAuth } from "../middleware/jwt.js";
import {
  updatePuzzleSchema,
  createUserPuzzleSchema,
  validate,
  objectIdSchema,
} from "../middleware/joi.js";

/**
 * @swagger
 * /userpuzzle/createuserpuzzle:
 *   post:
 *     summary: Create a user puzzle
 *     description: Creates a user puzzle
 *     tags:
 *       - User Puzzles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pgn:
 *                 type: string
 *               answer:
 *                 type: string
 *               rating:
 *                 type: number
 *             required:
 *               - pgn
 *               - answer
 *               - rating
 *     responses:
 *       200:
 *         description: Puzzle created
 *       404:
 *         description: Failed to create puzzle
 *
 * /userpuzzle/byuser/self:
 *   get:
 *     summary: Get all user puzzles
 *     description: Get all puzzles from a user that is logged in.
 *     tags:
 *       - User Puzzles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *
 * /userpuzzle/Bypuzzleid/{id}:
 *   get:
 *     summary: Get puzzle by id
 *     description: Get all puzzles from a user that is logged in.
 *     tags:
 *       - User Puzzles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: puzzle id to find puzzle.
 *     responses:
 *       200:
 *         description: Success
 *
 * /userpuzzle/updatepuzzle/{id}:
 *   patch:
 *     summary: Patch puzzle via id
 *     tags:
 *       - User Puzzles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Puzzle ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pgn:
 *                 type: string
 *               answer:
 *                 type: string
 *               rating:
 *                 type: number
 *             required:
 *               - pgn
 *               - answer
 *               - rating
 *     responses:
 *       200:
 *         description: Success
 */

export function userPuzzleRoutes(app) {
  app.get("/api/v1/userpuzzle/byuser/self", requireAuth, async (req, res) => {
    const id = req.auth.sub;
    const allUserP = await getUserPuzzles(id);
    if (!allUserP)
      return res.status(404).json({ Error: "Failed to fetch puzzles" });
    return res.json(allUserP);
  });

  app.get(
    "/api/v1/userpuzzle/Bypuzzleid/:id",
    requireAuth,
    validate(objectIdSchema, "params"),
    async (req, res) => {
      const userid = req.auth.sub;
      const { id } = req.params;
      const fetchedP = await getPuzzleByPuzzleID(userid, id);
      if (!fetchedP) return res.status(404).json({ Error: "Puzzle not found" });
      return res.json(fetchedP);
    }
  );

  app.post(
    "/api/v1/userpuzzle/createuserpuzzle",
    requireAuth,
    validate(createUserPuzzleSchema),
    async (req, res) => {
      const id = req.auth.sub;
      const { fen, answer, rating } = req.body;
      const data = {
        user: id,
        fen: fen,
        answer: answer,
        rating: rating,
      };
      const result = await createUserPuzzle(data);
      if (!result)
        return res.status(404).json({ Error: "Failed to create puzzle." });
      return res.status(200).json({ message: "Created user puzzle" });
    }
  );

  app.patch(
    "/api/v1/userpuzzle/updatepuzzle/:id",
    requireAuth,
    validate(objectIdSchema, "params"),
    validate(updatePuzzleSchema, "body"),
    async (req, res) => {
      const userid = req.auth.sub;
      const { id } = req.params;
      const updated = req.body;
      const result = await updateUserPuzzle(userid, id, updated);
      if (!result)
        return res.status(404).json({ Error: "Failed to update puzzle." });
      return res.status(200).json(result);
    }
  );

  app.delete(
    "/api/v1/userpuzzle/delete/:id",
    requireAuth,
    validate(objectIdSchema, "params"),
    async (req, res) => {
      const userid = req.auth.sub;
      const { id } = req.params;
      const result = await deleteUserPuzzle(userid, id);
      if (!result)
        return res.status(404).json({ Error: "Failed to delete puzzle." });
      return res.status(200).json({ message: "OK" });
    }
  );
}
