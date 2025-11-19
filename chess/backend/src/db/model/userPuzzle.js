import mongoose, { Schema } from "mongoose";

const userPuzzleSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  pgn: String,
  answer: String,
  date: String,
  rating: Number,
});

export const UserPuzzle = mongoose.model("UserPuzzle", userPuzzleSchema);
