import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/model/user.js";
import { logger } from "../utils/logger.js";

export async function getUserInfoByID(userID) {
  try {
    const user = await User.findById(userID);
    if (!user) throw new Error("User not found");
    return { _id: userID, username: user.username };
  } catch (err) {
    logger.error("Error geting user info by ID:", err);
    throw err;
  }
}

export async function raiseUserScore(userID) {
  try {
    await User.findOneAndUpdate(
      { _id: userID },
      { $inc: { score: 1 } },
      { new: true }
    );

    const updatedUser = User.findById(userID);
    return updatedUser;
  } catch (err) {
    logger.info(`Error updating score: ${err.message}`);
    throw err;
  }
}

export async function getTopUsers() {
  try {
    const topUsers = await User.find({}).sort({ score: -1 }).limit(5);
    return topUsers;
  } catch (err) {
    logger.info("Error getting top users : ", err);
  }
}

//consider adding more return stuff for duplicate
//consider adding minimum login conditions (password stuff)
//evenutally  try  adding google login?
export async function createUser({ username, password }) {
  const checkDuplicate = await User.findOne({ username });
  if (checkDuplicate) {
    logger.error("Username already exists.");
    throw new Error("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  return await user.save();
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Username doesn't exist");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}
