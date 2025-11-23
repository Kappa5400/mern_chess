jest.mock("axios", () => ({
  default: {
    get: jest.fn(),
  },
}));

import axios from "axios";
axios.get = jest.fn();
import mongoose from "mongoose";
import { jest } from "@jest/globals";
import { puzzle } from "../db/model/puzzle.js";
import { describe, expect, test, beforeEach } from "@jest/globals";
import {
  getDailyPuzzle,
  get_all_puzzles,
  getPuzzleByID,
  getMostRecent,
  deleteOldest,
} from "../service/s_puzzle.js";

const createDummyPuzzle = (overrides = {}) => ({
  pgn: "test",
  answer: "test",
  rating: 0,
  ...overrides,
});

const saveDummy = async (overrides) => {
  return await puzzle.create(createDummyPuzzle(overrides));
};

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  jest.clearAllMocks();
});

describe("Puzzle service logic tests", () => {
  test("Get daily puzzle", async () => {
    axios.get.mockResolvedValue({
      data: {
        game: { pgn: "1. e4 e5" },
        puzzle: {
          solution: ["d4"],
          rating: 10,
        },
      },
    });

    await getDailyPuzzle();

    const saved = await puzzle.findOne({});

    expect(saved).toBeDefined();
    expect(saved.pgn).toBe("1. e4 e5");
  });

  test("Daily fetch if duplicate throw error don't save to DB", async () => {
    axios.get.mockResolvedValue({
      data: {
        game: { pgn: "1. e4 e5" },
        puzzle: {
          solution: ["d4"],
          rating: 10,
        },
      },
    });

    await getDailyPuzzle();

    axios.get.mockResolvedValue({
      data: {
        game: { pgn: "1. e4 e5" },
        puzzle: {
          solution: ["d4"],
          rating: 10,
        },
      },
    });

    await expect(getDailyPuzzle()).rejects.toThrow("Puzzle exists in DB");
    const count = await puzzle.countDocuments();
    expect(count).toBe(1);
  });

  test("Daily puzzle returns API error if error fetching", async () => {
    axios.get.mockRejectedValue(new Error("API error"));
    await expect(getDailyPuzzle()).rejects.toThrow("API error");
  });

  test("Get newest puzzle", async () => {
    await saveDummy({
      pgn: "e4",
      createdAt: new Date("2025-01-01"),
    });
    await saveDummy({
      pgn: "e3",
      createdAt: new Date("1900-01-01"),
    });

    const result = await getMostRecent();

    expect(new Date(result.createdAt).toISOString()).toBe(
      new Date("2025-01-01").toISOString()
    );
  });

  test("Get puzzle by ID", async () => {
    const puzzle1 = await saveDummy({ pgn: "e4" });
    const puzzle2 = await saveDummy({ pgn: "e3" });

    const fetched = await getPuzzleByID(puzzle1._id);
    expect(fetched.pgn).toBe("e4");
  });

  test("Get all puzzles", async () => {
    await saveDummy({ pgn: "e4" });
    await saveDummy({ pgn: "e3" });

    const fetched = await get_all_puzzles();

    expect(fetched.length).toBe(2);
  });

  test("Delete 11th puzzle", async () => {
    for (let i = 0; i < 11; i++) {
      await saveDummy({
        pgn: `p${i}`,
        createdAt: new Date(2020, 0, i + 1),
      });
    }

    await deleteOldest();

    const count = await puzzle.countDocuments();
    expect(count).toBe(10);
    const oldest = await puzzle.findOne({ pgn: "p0" });
    expect(oldest).toBeNull();
  });
});
