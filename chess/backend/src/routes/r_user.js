import { createUser, loginUser, getUserInfoByID } from "../services/s_user.js";
import { createUserSchema, validate } from "../middleware/joi.js";

export function userRoutes(app) {
  app.get("/api/v1/users/:id", async (req, res) => {
    const userInfo = await getUserInfoByID(req.params.id);
    return res.status(200).send(userInfo);
  });

  app.patch("/api/v1/user/score_up/:id", async (req, res) => {
    try {
      const score = await raise_user_score(req.params.id, req.auth?.sub);
      return res.json(score);
    } catch (err) {
      console.log(`Error updating score: ${err}`);
      return res.status(500).json({ error: "Error updating score" });
    }
  });

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

  app.post("/api/v1/user/login", async (req, res) => {
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
