import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
});
afterAll(async () => {
  await mongoose.disconnect();
});
