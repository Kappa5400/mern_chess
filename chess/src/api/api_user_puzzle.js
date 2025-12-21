//update befor deployment
const BASE_URL = "http://localhost:3001/";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Token from api send: ", token);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getUserPuzzles = async () => {
  console.log("local store", localStorage);
  const res = await fetch(`${BASE_URL}api/v1/userpuzzle/byuser/self`, {
    method: "GET",
    headers: {
      ...getHeaders(),
    },
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

export const getPublicPuzzleByID = async (puzzleID) => {
  const res = await fetch(
    `${BASE_URL}api/V1/userpuzzle/public/Bypuzzleid/${puzzleID}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) throw new Error("Failed to get public puzzle by puzzle id");
  return await res.json();
};

export const getAllUserPuzzles = async () => {
  console.log("Fetching all user puzzles");
  const res = await fetch(`${BASE_URL}api/v1/userpuzzle/all`, {
    headers: getHeaders(),
  });
  console.log("Status: ", res.status);
  console.log("Res: ", res);
  if (!res.ok) throw new Error("Failed to get all user puzzles");
  return await res.json();
};

export const createUserPuzzle = async ({ fen, answer, rating }, token) => {
  const res = await fetch(`${BASE_URL}api/v1/userpuzzle/createuserpuzzle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fen: fen, answer: answer, rating: rating }),
  });
  if (!res.ok) {
    const error = await res.json();
    console.error("Error: ", error);
    throw new Error(error.message || "Failed to make user puzzle");
  }
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
