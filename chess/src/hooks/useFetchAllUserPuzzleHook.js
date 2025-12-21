import { useQuery } from "@tanstack/react-query";
import { getAllUserPuzzles } from "../api/api_user_puzzle";

export function useFetchAllUserPuzzles() {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles"],
    queryFn: getAllUserPuzzles,
  });

  const data = puzzlesQuery.data ?? [];

  const puzzles = Array.isArray(data)
    ? Array.isArray(data[0])
      ? data[0]
      : data
    : [];

  console.log("Puzzle data from hook:", puzzles);

  return {
    puzzles,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
