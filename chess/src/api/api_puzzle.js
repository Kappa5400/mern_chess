export const get_all_Puzzle = async () => {
  const res = await fetch(
    `https://supernatural-crypt-pjpq5pvp6qgq399q7-3000.app.github.dev/api/v1/get_all_puzzles`,
    {
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Failed to get puzzles");
  return await res.json();
};
