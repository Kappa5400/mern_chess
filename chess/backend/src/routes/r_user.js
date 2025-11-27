import {
  createUser,
  loginUser,
  getUserInfoByID,
  getTopUsers,
  raiseUserScore,
} from "../service/s_user.js";
import {
  createUserSchema,
  loginSchema,
  objectIdSchema,
  validate,
} from "../middleware/joi.js";
import { requireAuth } from "../middleware/jwt.js";

export function userRoutes(app) {
  app.get(
    "/api/v1/user/byuserid/:id",
    validate(objectIdSchema, "params"),
    async (req, res) => {
      const userInfo = await getUserInfoByID(req.params.id);
      return res.status(200).send(userInfo);
    }
  );

  app.get("/api/v1/user/topusers", async (req, res) => {
    const topScoringUsers = await getTopUsers();
    return res.status(200).send(topScoringUsers);
  });

  app.patch(
    "/api/v1/user/score_up/:id",
    requireAuth,
    validate(objectIdSchema, "params"),
    async (req, res) => {
      try {
        const score = await raiseUserScore(req.params.id);
        return res.json(score);
      } catch (err) {
        console.log(`Error updating score: ${err}`);
        return res.status(500).json({ error: "Error updating score" });
      }
    }
  );

  app.post(
    "/api/v1/user/signup",
    validate(createUserSchema),
    async (req, res) => {
      try {
        const user = await createUser(req.body);
        return res.status(201).json({ username: user.username });
      } catch (err) {
        return res.status(400).json({
          error: "failed to create the user, does the username already exist?",
        });
      }
    }
  );

  app.post("/api/v1/user/login", validate(loginSchema), async (req, res) => {
    try {
      const token = await loginUser(req.body);
      return res.status(200).send({ token });
    } catch (err) {
      return res.status(400).send({
        error: "login failed, did you enter correct username/pass?",
      });
    }
  });
}
