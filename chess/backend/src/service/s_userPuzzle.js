import { UserPuzzle } from "../db/model/userPuzzle.js";
import { logger } from "../utils/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUserPuzzles(userID) {
  try {
    console.log("Test from service :", userID);
    const userP = await UserPuzzle.find({ user: userID });
    return userP;
  } catch (err) {
    logger.info("Error fetching user puzzles: ", err);
    throw new Error(err);
  }
}

export async function getPuzzleByPuzzleID(userid, puzzleId) {
  try {
    const reqP = await UserPuzzle.findOne({ _id: puzzleId, user: userid });
    return reqP;
  } catch (err) {
    logger.info("Error getting puzzle from puzzleId: ", err);
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
        $set: newPuzzle,
      },
      {
        new: true,
      }
    );
    return update;
  } catch (err) {
    logger.info("Error updating puzzle: ", err);
    throw new Error(err);
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
    logger.info("Error deleting puzzle: ", err);
    throw new Error(err);
  }
}

export async function createUserPuzzle(data) {
  try {
    const createdPuzzle = new UserPuzzle({
      user: data.user,
      fen: data.fen,
      answer: data.answer,
      rating: data.rating,
    });
    return await createdPuzzle.save();
  } catch (err) {
    logger.info("Error creating puzzle: ", err);
    throw err;
  }
}
