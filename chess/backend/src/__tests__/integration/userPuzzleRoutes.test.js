import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser } from "../../service/s_user.js";
import {
  createUserPuzzle,
  getUserPuzzles,
} from "../../service/s_userPuzzle.js";
import { expect } from "@jest/globals";
import { User } from "../../db/model/user.js";
import { UserPuzzle } from "../../db/model/userPuzzle.js";
import app from "../../app.js";
import jwt from "jsonwebtoken";
import { getPuzzleByID } from "../../service/s_puzzle.js";

let mongoServer;
process.env.JWT_SECRET = "test";

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
  fen: "a3",
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
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const newUser = await createUser(dummyUser);

    const token = jwt.sign(
      { sub: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    expect(newUser).toBeDefined();
    const USER_ID_STRING = newUser._id.toString();

    const sendData = {
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const res = await request(app)
      .post("/api/v1/userpuzzle/createuserpuzzle")
      .set("Authorization", `Bearer ${token}`)
      .send(sendData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Created user puzzle");
  });

  it("GET /api/v1/userpuzzle/byuser/self get user puzzles", async () => {
    const dummyUser = {
      username: "test",
      password: "password",
    };
    const dummyPuz = {
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const newUser = await createUser(dummyUser);

    const token = jwt.sign(
      { sub: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const sendData = {
      user: newUser._id,
      fen: "e4",
      answer: "e5",
      rating: 0,
    };
    await createUserPuzzle(sendData);

    const res = await request(app)
      .get("/api/v1/userpuzzle/byuser/self")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body[0].fen).toBe("e4");
  });
  it("GET /api/v1/userpuzzle/Bypuzzleid/:id get puzzle from id", async () => {
    const dummyUser = {
      username: "test",
      password: "password",
    };
    const dummyPuz = {
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const newUser = await createUser(dummyUser);

    const token = jwt.sign(
      { sub: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const sendData = {
      user: newUser._id,
      fen: "e4",
      answer: "e5",
      rating: 0,
    };
    const savedP = await createUserPuzzle(sendData);

    const res = await request(app)
      .get(`/api/v1/userpuzzle/Bypuzzleid/${savedP._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.fen).toBe("e4");
  });
  it("PATCH /api/v1/updatepuzzle/:id update puzzle", async () => {
    const dummyUser = {
      username: "test",
      password: "password",
    };
    const dummyPuz = {
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const newfen = "a4";
    const newans = "a5";
    const newrating = 2;

    const newUser = await createUser(dummyUser);

    const token = jwt.sign(
      { sub: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const sendData = {
      user: newUser._id,
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const savedP = await createUserPuzzle(sendData);

    const newPuz = {
      fen: "a4",
      answer: "a5",
      rating: 2,
    };

    const res = await request(app)
      .patch(`/api/v1/userpuzzle/updatepuzzle/${savedP._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newPuz);

    expect(res.body.fen).toBe("a4");
  });

  it("DELETE /api/v1/userpuzzle/delete/:id Delete", async () => {
    const dummyUser = {
      username: "test",
      password: "password",
    };

    const newUser = await createUser(dummyUser);

    const token = jwt.sign(
      { sub: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const dummyPuz = {
      user: newUser._id,
      fen: "e4",
      answer: "e5",
      rating: 0,
    };

    const savedP = await createUserPuzzle(dummyPuz);

    const res = await request(app)
      .delete(`/api/v1/userpuzzle/delete/${savedP._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getPuzzleByID(savedP._id)).toBeNull;
  });
});
