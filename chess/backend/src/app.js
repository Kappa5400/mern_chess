import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { puzzleRoutes } from "./routes/r_puzzle.js";
import { userPuzzleRoutes } from "./routes/r_userPuzzle.js";
import { userRoutes } from "./routes/r_user.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swaggerOptions.js";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.get("/", (req, res) => {
  console.log("--- DEBUG: Reached GET / route ---");
  res.send("Hi sekai");
});

userRoutes(app);
userPuzzleRoutes(app);
puzzleRoutes(app);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ Error: "Invalid token" });
  }
  next(err);
});

export default app;
