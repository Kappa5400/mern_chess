import dotenv from "dotenv";
import mongoose from "mongoose";

export async function initDB() {
  const DB_URL = process.env.DB_URL;
  mongoose.connection.on("open", () => {
    console.log("Connected to DB: ", DB_URL);
  });

  const connection = await mongoose.connect(DB_URL);

  return connection;
}
