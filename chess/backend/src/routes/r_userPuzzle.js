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
      const { pgn, answer, date, rating } = req.body;
      const data = {
        user: id,
        pgn: pgn,
        answer: answer,
        rating: rating,
      };
      const result = await createUserPuzzle(data);
      if (!result)
        return res.status(404).json({ Error: "Failed to create puzzle." });
      return res.status(200).json({ message: "OK" });
    }
  );

  app.patch(
    "/api/v1/updatepuzzle/:id",
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
      return res.status(200).json({ message: "OK" });
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
