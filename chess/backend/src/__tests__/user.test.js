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

const { createUser, loginUser, getUserInfoByID, raiseUserScore, getTopUsers } =
  await import("../service/s_user.js");

const createDummyUser = (overrides = {}) => ({
  username: "name",
  password: "password",
  score: 0,
  user_puzzles: 0,
  ...overrides,
});

const saveDummy = async (overrides) => User.create(createDummyUser(overrides));

beforeEach(async () => {
  for (const col of Object.values(mongoose.connection.collections)) {
    await col.deleteMany({});
  }
  jest.clearAllMocks();
});

describe("User service logic tests", () => {
  test("Can create user", async () => {
    const newUser = await createUser({ username: "test", password: "pass" });
    expect(newUser).toBeDefined();
    expect(newUser.username).toBe("test");
    expect(newUser.password).toBe("hashed_password");
  });

  test("Duplicate username on create user returns null", async () => {
    const newUser = await createUser({ username: "test", password: "pass" });
    const res = await createUser({ username: "test", password: "word" });
    expect(res).toBeNull();
  });

  test("Can login", async () => {
    await createUser({ username: "test", password: "pass" });
    const token = await loginUser({ username: "test", password: "pass" });
    expect(token).toBeDefined();
  });

  test("Incorrect username returns Username doesn't exist error", async () => {
    await createUser({ username: "test", password: "pass" });
    await expect(
      loginUser({ username: "wrong", passwrod: "pass" })
    ).rejects.toThrow("Username doesn't exist");
  });

  test("Incorrect password returns invalid password error", async () => {
    await createUser({ username: "test", password: "pass" });
    await expect(
      loginUser({ username: "test", passwrod: "wrong" })
    ).rejects.toThrow("Invalid Password");
  });

  test("Can get user by ID", async () => {
    const newUser = await createUser({ username: "test", password: "pass" });
    const res = await getUserInfoByID(newUser._id);
    expect(res._id.toString()).toBe(newUser._id.toString());
    expect(res.username).toBe("test");
  });

  test("Incorrect ID returns null", async () => {
    const newUser = await createUser({ username: "test", password: "pass" });
    const res = await getUserInfoByID(newUser.username);
    expect(res).toBeNull;
  });

  test("Can raise user score", async () => {
    const newUser = await createUser({ username: "test", password: "pass" });
    const res = await raiseUserScore(newUser._id);
    expect(res.score).toBe(1);
  });

  test("Raise user score returns null if error", async () => {
    const newUser = await createUser({ username: "test", password: "pass" });
    const res = await raiseUserScore(newUser.username);
    expect(res).toBeNull;
  });

  test("Get top user returns top 5 users", async () => {
    for (let i = 0; i < 6; i++) {
      await saveDummy({
        username: `test ${i}`,
        password: `pass ${i}`,
        score: i,
      });
    }
    const res = await getTopUsers();
    expect(res.length).toBe(5);
    expect(res[0].score).toBe(5);
    expect(res[4].score).toBe(1);
  });
});
