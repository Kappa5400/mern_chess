import { useQuery } from "@tanstack/react-query";
import { getAllPuzzle } from "../api/api_puzzle";

export function useFetchAllPuzzles() {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles"],
    queryFn: getAllPuzzle,
  });

  const raw = puzzlesQuery.data ?? [];
  const puzzles = Array.isArray(raw[0]) ? raw[0] : raw;

  //logging
  console.log("Puzzle data from hook:", JSON.stringify(puzzles));

  return {
    puzzles,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
