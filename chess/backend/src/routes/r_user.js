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

/**
 * @swagger
 * user/signup:
 *   post:
 *     summary: Signup
 *     description: Make an account.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Created login info.
 *
 * /user/login:
 *   post:
 *     summary: Login
 *     description: Authenticate user and return a token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Success, returns token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 * /user/byuserid/{id}:
 *   get:
 *     summary: Get user information.
 *     description: Get user information by searching with user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Get user information by searching with user ID.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Success
 *
 * /user/topusers:
 *   get:
 *     summary: Get top scoring users.
 *     description: Get the top five high score users in the database.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Success
 *
 * /userscore_up/{id}:
 *   patch:
 *     summary: Increase user score
 *     description: Increase the user score by one.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Get user information by searching with user ID.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Success
 */

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
