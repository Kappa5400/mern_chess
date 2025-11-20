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
  createPuzzleSchema,
  validate,
} from "../middleware/joi.js";

export function routes(app) {
  app.get("/api/v1/userpuzzle/byuserid", requireAuth, async (req, res) => {
    const id = req.auth.sub;
    const allUserP = await getUserPuzzles(id);
    if (!allUserP)
      return res.status(500).json({ Error: "Failed to fetch puzzles" });
    return res.json(allUserP);
  });

  app.get(
    "/api/v1/userpuzzle/Bypuzzleid/:id",
    requireAuth,
    async (req, res) => {
      const userid = req.auth.sub;
      const { id } = req.params;
      const fetchedP = await getPuzzleByPuzzleID(userid, id);
      if (!fetchedP) return res.status(404).json({ Error: "Puzzle not found" });
      return res.json(fetchedP);
    }
  );

  app.post(
    "/api/v1/createuserpuzzle",
    requireAuth,
    validate(createPuzzleSchema),
    async (req, res) => {
      const id = req.auth.sub;
      const { pgn, answer, date, rating } = req.body;
      const result = await createUserPuzzle(id, pgn, answer, date, rating);
      if (!result)
        return res.status(500).json({ Error: "Failed to create puzzle." });
      return res.status(200).json({ message: "OK" });
    }
  );

  app.patch(
    "/api/v1/updatepuzzle/:puzzleid",
    requireAuth,
    validate(updatePuzzleSchema),
    async (req, res) => {
      const userid = req.auth.sub;
      const { puzzleid } = req.params;
      const { updated } = req.body;
      const result = await updateUserPuzzle(userid, puzzleid, updated);
      if (!result)
        return res.status(500).json({ Error: "Failed to update puzzle." });
      return res.status(200).json({ message: "OK" });
    }
  );

  app.delete(
    "/api/v1/deleteuserpuzzle/:puzzleid",
    requireAuth,
    async (req, res) => {
      const userid = req.auth.sub;
      const { puzzleid } = req.params;
      const result = await deleteUserPuzzle(userid, puzzleid);
      if (!result)
        return res.status(500).json({ Error: "Failed to delete puzzle." });
      return res.status(200).json({ message: "OK" });
    }
  );
}
