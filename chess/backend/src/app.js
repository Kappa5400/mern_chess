import express from "express";
import { routes } from "./routes/r_puzzle.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("Dev"));
} else {
  app.use(morgan("combined"));
}

app.get("/", (req, res) => {
  res.send("Hi sekai");
});

routes(app);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ Error: "Invalid token" });
  }
  next(err);
});

export { app };
