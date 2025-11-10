import express from "express";
import { routes } from "./routes/r_puzzle.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT

app.use(express.json());

app.use(
  cors({
    origin: "https://supernatural-crypt-pjpq5pvp6qgq399q7-5173.app.github.dev",
    credentials: true,
  })
);

routes(app);

app.get("/", (req, res) => {
  res.send("Hi sekai");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export { app };
