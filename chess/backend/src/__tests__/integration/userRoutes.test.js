import request from "supertest";
import mongoose, { mongo } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app.js";
import { createUser } from "../../service/s_user.js";

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  for (const col of Object.values(mongoose.connection.collections)) {
    await col.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const createDummyUser = (overrides = {}) => ({
  username: "name",
  password: "password",
  score: 0,
  user_puzzles: 0,
  ...overrides,
});

const saveDummy = async (overrides) => User.create(createDummyUser(overrides));

describe("User routes", () => {
  it("POST /api/v1/user/signup - create user", async () => {
    const res = await request(app).post("/api/v1/user/signup").send({
      username: "test1",
      password: "password1",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("username", "test1");
  });

  it("POST /api/v1/user/login - login", async () => {
    await createUser({ username: "test", password: "pass" });

    const res = await request(app).post("/api/v1/user/login").send({
      username: "test",
      password: "pass",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
