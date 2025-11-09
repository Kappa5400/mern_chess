export const get_all_Puzzle = async () => {
  const res = await fetch("/api/v1/get_all_puzzles");
  if (!res.ok) throw new Error("Failed to get puzzles");
  return await res.json();
};
