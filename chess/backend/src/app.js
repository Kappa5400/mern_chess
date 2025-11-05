import express from "express";
import { routes } from "./routes/r_puzzle.js";

const app = express();

routes(app);

app.get("/", (req, res) => {
  res.send("Hi sekai");
});

export { app };
