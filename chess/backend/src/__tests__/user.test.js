import mongoose from "mongoose";
import { jest } from "@jest/globals";
import { puzzle } from "../db/model/puzzle.js";
import { describe, expect, test, beforeEach } from "@jest/globals";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db/model/user.js";

import {
  getUserInfoByID,
  raise_user_score,
  getTopUsers,
  createUser,
  loginUser,
} from "../service/s_user.js";

const createDummyUser = (overrides = {}) => ({
  username: "name",
  password: "password",
  score: 0,
  user_puzzles: 0,
  ...overrides,
});

const saveDummy = async (overrides) => {
  return await User.create(createDummyPuzzle(overrides));
};

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  jest.clearAllMocks();
});

describe("User service logic tests", () => {
  test("Can create user", async () => {
   //code here 
  }
}
)
