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
    const res = await request(app).post("/api/v1/user/login").send({
      username: "test1",
      password: "password1",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
