import request from "supertest";
import { requireAuth } from "../../middleware/jwt.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser } from "../../service/s_user.js";
import { createUserPuzzle } from "../../service/s_userPuzzle.js";
import { expect } from "@jest/globals";
import { User } from "../../db/model/user.js";
import { UserPuzzle } from "../../db/model/userPuzzle.js";
import { jest } from "@jest/globals";

jest.mock("../../middleware/jwt.js", () => ({
  // Assume 'requireAuth' is the named export we need to mock
  requireAuth: (req, res, next) => {
    // 💡 This is the core logic: We check for a dummy header set by supertest
    //    and use that value to simulate successful authentication.
    const mockUserId = req.headers["x-mock-user-id"];
    if (mockUserId) {
      req.auth = { sub: mockUserId };
      next();
    } else {
      // If the header is missing, fail authentication (or return a 401, but here we just call next to keep the test simple)
      next();
    }
  },
}));

import app from "../../app.js";

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

const createDummyUser = (overrides = {}) => ({
  username: "name",
  password: "password",
  score: 0,
  user_puzzles: 0,
  ...overrides,
});

const saveDummyUser = async (overrides) =>
  User.create(createDummyUser(overrides));

const createDummyPuzzle = (overrides = {}) => ({
  user: 0,
  pgn: "a3",
  answer: "a6",
  rating: 1,
  ...overrides,
});

const saveDummyPuzzle = async (overrides) =>
  UserPuzzle.create(createDummyPuzzle(overrides));

describe(" User puzzle routes ", () => {
  it("POST /api/v1/userpuzzle/createuserpuzzle - create puzzle", async () => {
    const dummyUser = {
      username: "test",
      password: "password",
    };
    const dummyPuz = {
      pgn: "e4",
      answer: "e5",
      rating: 0,
    };

    const newUser = await createUser(dummyUser);

    expect(newUser).toBeDefined();
    const USER_ID_STRING = newUser._id.toString();

    const sendData = {
      pgn: dummyPuz.pgn,
      answer: dummyPuz.answer,
      rating: dummyPuz.rating,
    };

    const res = await request(app)
      .post("/api/v1/userpuzzle/createuserpuzzle")
      .set("x-mock-user-id", USER_ID_STRING)
      .send(sendData);

    console.log(res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "OK");
  });
});
