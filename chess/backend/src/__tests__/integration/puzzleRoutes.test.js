jest.mock("axios", () => ({
  default: {
    get: jest.fn(),
  },
}));

import axios from "axios";
axios.get = jest.fn();
import { jest } from "@jest/globals";
import request from "supertest";
import mongoose, { mongo } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
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

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

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
});
