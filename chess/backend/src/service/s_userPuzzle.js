import { UserPuzzle } from "../db/models/userPuzzle.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUserPuzzles(userID) {
  try {
    const userP = await UserPuzzle.find({ user: userID });
    return userP;
  } catch (err) {
    console.log("Error fetching user puzzles: ", err);
    return null;
  }
}

export async function getPuzzleByPuzzleID(userid, puzzleId) {
  try {
    const reqP = await UserPuzzle.findOne({ _id: puzzleId, user: userid });
    return reqP;
  } catch (err) {
    console.log("Error getting puzzle from puzzleId: ", err);
  }
}

export async function updateUserPuzzle(userid, userPuzzleID, newPuzzle) {
  try {
    const update = await UserPuzzle.findOneAndUpdate(
      {
        _id: userPuzzleID,
        user: userid,
      },
      {
        pgn: newPuzzle.pgn,
        answer: newPuzzle.answer,
        rating: newPuzzle.rating,
      },
      {
        new: true,
      }
    );
    return update;
  } catch (err) {
    console.log("Error updating puzzle: ", err);
    return null;
  }
}

export async function deleteUserPuzzle(userid, userPuzzleID) {
  try {
    const del = await UserPuzzle.findOneAndDelete({
      _id: userPuzzleID,
      user: userid,
    });
    return del;
  } catch (err) {
    console.log("Error deleting puzzle: ", err);
    return null;
  }
}

export async function createUserPuzzle(userID, pgn, answer, date, rating) {
  try {
    const createdPuzzle = new UserPuzzle({
      user: userID,
      pgn,
      answer,
      date,
      rating,
    });
    return await createdPuzzle.save();
  } catch (err) {
    console.log("Error creating puzzle: ", err);
    return null;
  }
}
