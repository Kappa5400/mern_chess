import mongoose, { Schema } from "mongoose";

const userPuzzleSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fen: { type: String, required: true },
    answer: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserPuzzle = mongoose.model("UserPuzzle", userPuzzleSchema);
