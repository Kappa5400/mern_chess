import mongoose, { Schema } from "mongoose";

const puzzleSchema = new Schema({
  pgn: String,
  answer: String,
  date: String,
  rating: Number,
});

export const puzzle = mongoose.model("puzzle", puzzleSchema);
