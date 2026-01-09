const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export const getAllPuzzle = async () => {
  console.log("Fetching all puzzles");
  const res = await fetch(`${BASE_URL}/api/v1/puzzle/GetAllPuzzles`, {
    headers: getHeaders(),
  });
  console.log("Status: ", res.status);
  console.log("Res: ", res);
  if (!res.ok) throw new Error("Failed to get all puzzles");
  return await res.json();
};

export const getPuzzleById = async (_id) => {
  const res = await fetch(`${BASE_URL}/api/v1/puzzle/bypuzzleid/${_id}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to retreive single puzzle by id");
  return await res.json();
};

export const GetMostRecent = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/puzzle/recent`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to retreive most recent puzzle");
  return await res.json();
};
