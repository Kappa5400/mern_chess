import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/model/user.js";

export async function getUserInfoByID(userID) {
  try {
    const user = await User.findById(userID);
    if (!user) return { username: userID };
    return { username: user.username };
  } catch (err) {
    return { username: userID };
  }
}

export async function raise_user_score(userID) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { $inc: { score: 1 } },
      { new: true }
    );
    return updatedUser;
  } catch (err) {
    console.log(`Error updating score: ${err.message}`);
    return null;
  }
}

export async function getTopUsers() {
  try {
    const topUsers = await User.find({}).sort({ score: -1 }).limit(5);
  } catch (err) {
    console.log("Error getting top users : ", err);
  }
}

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return await user.save();
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("invalid username!");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("invalid password!");
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}
