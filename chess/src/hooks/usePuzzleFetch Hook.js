import { useQuery } from "@tanstack/react-query";
import { get_all_Puzzle } from "../api/api_puzzle";

export function useFetchAllPuzzles() {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles"],
    queryFn: get_all_Puzzle,
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
