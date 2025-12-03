//update befor deployment
const BASE_URL = "http://localhost:3001";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getUserPuzzles = async () => {
  const res = await fetch(`${BASE_URL}api/v1/userpuzzle/byuser/self`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to get user puzzles");
  return await res.json();
};

export const getPuzzleByPuzzleID = async (puzzleID) => {
  const res = await fetch(
    `${BASE_URL}api/v1/userpuzzle/Bypuzzleid/${puzzleID}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to get puzzle by puzzle id");
  return await res.json();
};

export const createUserPuzzle = async (Userid, pgn, answer, rating) => {
  const res = await fetch(`${BASE_URL}api/v1/userpuzzle/createuserpuzzle`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ user: Userid, pgn, answer, rating }),
  });
  if (!res.ok) throw new Error("Failed to create user puzzle");
  return await res.json();
};

export const updateUserPuzzle = async (
  Userid,
  puzzleID,
  pgn,
  answer,
  rating
) => {
  const res = await fetch(
    `${BASE_URL}api/v1/userpuzzle/updatepuzzle/${puzzleID}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ puzzleID, pgn, answer, rating }),
    }
  );
  if (!res.ok) throw new Error("Failed to update user puzzle");
  return await res.json();
};

export const deleteUserPuzzle = async (puzzleID) => {
  const res = await fetch(`${BASE_URL}api/v1/userpuzzle/delete/${puzzleID}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete user puzzle");
  return await res.json();
};
