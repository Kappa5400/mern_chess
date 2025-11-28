jest.mock("axios", () => ({
  default: {
    get: jest.fn(),
  },
}));

import axios from "axios";
axios.get = jest.fn();
import { afterEach, expect, jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app.js";
import { puzzle } from "../../db/model/puzzle.js";

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

const createDummyPuzzle = (overrides = {}) => ({
  pgn: "test",
  answer: "test",
  rating: 0,
  ...overrides,
});

const saveDummy = async (overrides) => {
  return await puzzle.create(createDummyPuzzle(overrides));
};

const FAKE_PUZZLE_ID = new mongoose.Types.ObjectId("60c23a7e5f396e0004c867a1");

const dummyFixedId = {
  _id: FAKE_PUZZLE_ID,
  pgn: "e4",
  answer: "e5",
  rating: 0,
  createdAt: new Date("2025-01-01"),
};

describe("Puzzle routes", () => {
  it("POST /api/v1/puzzle/fetch - fetch daily", async () => {
    const mockApiCall = {
      game: {
        id: "eTsruvkx",
        pgn: "e4 c5 Nf3 d6 c3 Nf6 Qc2 Nc6 d4 cxd4 cxd4 e6 Nc3 Bd7 a3 Rc8 Qd3 Be7 Be2 O-O b4 Re8 Bb2 a6 O-O h6 d5 exd5 exd5 Ne5 Nxe5 dxe5 d6 Bf8 Ne4 Nxe4 Qxe4 Bc6 Qf5 Qxd6 Rfd1 Qe6 Qh5 g5 Rac1 Bg7 Bg4 f5 Be2 Red8",
      },
      puzzle: {
        id: "tDqkO",
        rating: 1700,
        solution: ["e2c4", "c6d5", "c4d5"],
      },
    };
    axios.get.mockResolvedValue({
      data: mockApiCall,
    });

    const res = await request(app).post("/api/v1/puzzle/fetch").send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Daily puzzle was saved to db");
  });

  it("GET /api/v1/puzzle/GetAllPuzzles - Get puzzles", async () => {
    const dummy1 = await saveDummy({
      pgn: "e4",
      createdAt: new Date("2025-01-01"),
    });
    const dummy2 = await saveDummy({
      pgn: "e3",
      createdAt: new Date("1900-01-01"),
    });
    const res = await request(app).get("/api/v1/puzzle/GetAllPuzzles");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].length).toBe(2);
  });

  it("GET /api/v1/puzzle/recent - get most recent", async () => {
    const dummy1 = await saveDummy({
      pgn: "e4",
      createdAt: new Date("2025-01-01"),
    });
    const dummy2 = await saveDummy({
      pgn: "e3",
      createdAt: new Date("1900-01-01"),
    });
    const res = await request(app).get("/api/v1/puzzle/recent");
    expect(res.statusCode).toBe(200);
    expect(res.body.createdAt).toBe("2025-01-01T00:00:00.000Z");
  });

  it("GET /api/v1/puzzle/byuserid/:id", async () => {
    const dummy1 = await saveDummy(dummyFixedId);
    const dummy2 = await saveDummy({
      pgn: "e3",
      createdAt: new Date("1900-01-01"),
    });
    const res = await request(app).get(
      `/api/v1/puzzle/byuserid/${FAKE_PUZZLE_ID}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.pgn).toBe("e4");
  });
});
