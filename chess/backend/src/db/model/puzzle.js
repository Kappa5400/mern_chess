import mongoose, { Schema } from "mongoose";

const puzzleSchema = new Schema(
  {
    pgn: String,
    answer: String,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

export const puzzle = mongoose.model("puzzle", puzzleSchema);
