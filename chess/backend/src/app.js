import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { puzzleRoutes } from "./routes/r_puzzle.js";
import { userPuzzleRoutes } from "./routes/r_userPuzzle.js";
import { userRoutes } from "./routes/r_user.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swaggerOptions.js";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// in order to sanatize
// allows newer express to edit query req after recieving
app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });
  next();
});

//sanatize below
app.use(
  mongoSanitize({
    replaceWith: "_",
    // only sanitize body & params, not query
    onSanitize: ({ req, key }) => {
      if (key === "query") return false;
    },
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
