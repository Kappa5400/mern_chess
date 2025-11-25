import { jest } from "@jest/globals";
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed_password"),
  compare: jest.fn().mockImplementation((pass) => pass === "pass"),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mocktoken"),
}));

import mongoose from "mongoose";
import { describe, expect, test, beforeEach } from "@jest/globals";
import { User } from "../db/model/user.js";
import { UserPuzzle } from "../db/model/userPuzzle.js";

const {
  getUserPuzzles,
  getPuzzleByPuzzleID,
  updateUserPuzzle,
  deleteUserPuzzle,
  createUserPuzzle,
} = await import("../service/s_userPuzzle.js");

const { createUser } = await import("../service/s_user.js");

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

beforeEach(async () => {
  for (const col of Object.values(mongoose.connection.collections)) {
    await col.deleteMany({});
  }
  jest.clearAllMocks();
});

describe("User puzzle service tests", () => {
  test("Can create user puzzle", async () => {
    const newUser = await createUser({
      username: "test",
      password: "pass",
    });
    const puz = createDummyPuzzle({
      user: newUser._id,
      pgn: "1. e4",
      answer: "e5",
      rating: 100,
    });
    expect(await createUserPuzzle(puz)).toBeDefined();
  });

  test("Incorrect puzzle creation throws error", async () => {
    const newUser = await createUser({
      username: "test2",
      password: "pass",
    });
    const puz = createDummyPuzzle({
      user: newUser._id,
      pgn: null,
      answer: "e5",
      rating: 100,
    });
    await expect(createUserPuzzle(puz)).rejects.toThrow();
  });

  test("getUserPuzzles Fetches user puzzles", async () => {
    const newUser = await createUser({
      username: "test3",
      password: "pass",
    });
    const puz1 = createDummyPuzzle({
      user: newUser._id,
      pgn: "e4",
      answer: "e5",
      rating: 100,
    });
    const puz2 = createDummyPuzzle({
      user: newUser._id,
      pgn: "d4",
      answer: "e5",
      rating: 120,
    });

    await createUserPuzzle(puz1);
    await createUserPuzzle(puz2);

    const res = await getUserPuzzles(newUser._id);
    expect(res.length).toBe(2);
  });

  test("Getpuzzlebypuzzleid finds puzzle by puzzle id", async () => {
    const newUser = await createUser({
      username: "test3",
      password: "pass",
    });
    const puz1 = createDummyPuzzle({
      user: newUser._id,
      pgn: "e4",
      answer: "e5",
      rating: 100,
    });
    const puz2 = createDummyPuzzle({
      user: newUser._id,
      pgn: "d4",
      answer: "e5",
      rating: 120,
    });

    const saved_p = await createUserPuzzle(puz1);
    await createUserPuzzle(puz2);

    const res = await getPuzzleByPuzzleID(newUser._id, saved_p._id);
    expect(res.pgn).toBe("e4");
  });

  test("updateUserPuzzle Updates puzzle", async () => {
    const newUser = await createUser({
      username: "test5",
      password: "pass",
    });

    const puz = createDummyPuzzle({
      user: newUser._id,
      pgn: "e4",
      answer: "e5",
      rating: 100,
    });

    const update_p = createDummyPuzzle({
      user: newUser._id,
      pgn: "a4",
      answer: "a5",
      rating: 200,
    });

    const saved_p = await createUserPuzzle(puz);
    const res = await updateUserPuzzle(newUser._id, saved_p._id, update_p);
    expect(res._id.toString()).toBe(saved_p._id.toString());
    expect(res.pgn).toBe("a4");
  });

  test("Delete user puzzle deleats puzzle", async () => {
    const newUser = await createUser({
      username: "test6",
      password: "pass",
    });

    const puz = createDummyPuzzle({
      user: newUser._id,
      pgn: "e4",
      answer: "e5",
      rating: 100,
    });

    const saved_p = await createUserPuzzle(puz);
    const res = await deleteUserPuzzle(newUser._id, saved_p._id);
    expect(res._id.toString()).toBe(saved_p._id.toString());
    expect(await getPuzzleByPuzzleID(newUser._id, saved_p._id)).toBeNull();
  });
});
