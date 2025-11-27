const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export const getAllPuzzle = async () => {
  const res = await fetch(`${BASE_URL}/puzzle/get_all_puzzles`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to get all puzzles");
  return await res.json();
};

export const getPuzzleById = async (_id) => {
  const res = await fetch(`${BASE_URL}/puzzle/${_id}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to retreive single puzzle by id");
  return await res.json();
};

export const GetMostRecent = async () => {
  const res = await fetch(`${BASE_URL}/puzzle/recent`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to retreive most recent puzzle");
  return await res.json();
};
