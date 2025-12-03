import { useQuery } from "@tanstack/react-query";
import { getAllPuzzle } from "../api/api_puzzle";

export function useFetchAllPuzzles() {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles"],
    queryFn: getAllPuzzle,
  });

  const data = puzzlesQuery.data;

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
