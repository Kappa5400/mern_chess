import express from "express";
import { routes } from "./routes/r_puzzle.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT;

app.use(cors({ origin: "*" , credentials: true, allowedHeaders:["Content-Type", "Authorization"]}));

app.use(express.json());

routes(app);

app.get("/", (req, res) => {
  res.send("Hi sekai");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export { app };
