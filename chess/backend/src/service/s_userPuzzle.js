import { UserPuzzle } from "../db/models/userPuzzle.js";

export async function getUserPuzzles(userID) {
  try {
    const userP = await UserPuzzle.find({ user: userID });
    return userP;
  } catch (err) {
    console.log("Error fetching user puzzles: ", err);
    return null;
  }
}

export async function updateUserPuzzle(userPuzzleID, newPuzzle) {
  try {
    await UserPuzzle.findByIdAndUpdate(userPuzzleID, newPuzzle, { new: true });
  } catch (err) {
    console.log("Error updating puzzle: ", err);
    return null;
  }
}

export async function deleteUserPuzzle(userPuzzleID) {
  try {
    await UserPuzzle.findByIdAndDelete(userPuzzleID);
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
