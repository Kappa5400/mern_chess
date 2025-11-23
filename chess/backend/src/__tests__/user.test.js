import mongoose from "mongoose";
import { jest } from "@jest/globals";
import { describe, expect, test, beforeEach } from "@jest/globals";
jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn().mockResolvedValue("hashed_password"),
    compare: jest.fn().mockResolvedValue(true),
  },
}));
import bcrypt from "bcrypt";
jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn().mockReturnValue("mocktoken"),
  },
}));

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

const saveDummy = async (overrides) => {
  return await User.create(createDummyUser(overrides));
};

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  jest.clearAllMocks();
  bcrypt.default.compare.mockImplementation((password, hash) =>
    Promise.resolve(password === "pass")
  );
});

describe("User service logic tests", () => {
  test("Can create user", async () => {
    const newUser = await createUser({
      username: "test",
      password: "pass",
    });
    expect(newUser).toBeDefined();
    expect(newUser.username).toBe("test");
    expect(newUser.password).toBe("hashed_password");
  });

  test("Can login", async () => {
    await createUser({
      username: "test",
      password: "pass",
    });

    const token = await loginUser({
      username: "test",
      password: "pass",
    });

    expect(token).toBeDefined();
  });

  test("Bad login password returns err", async () => {
    await createUser({ username: "test", password: "pass" });

    await expect(
      loginUser({ username: "test", password: "fail" })
    ).rejects.toThrow("invalid password!");
  });

  test("Can get user by ID", async () => {
    const newUser = await createUser({
      username: "test",
      password: "pass",
    });

    const res = await getUserInfoByID(newUser._id);
    expect(res._id.toString()).toBe(newUser._id.toString());
    expect(res.username).toBe("test");
  });
});
