import express from "express";
import { routes } from "./routes/r_puzzle.js";
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

routes(app);

app.get("/", (req, res) => {
  res.send("Hi sekai");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export { app };
