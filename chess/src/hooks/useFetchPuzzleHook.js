import { useQuery } from "@tanstack/react-query";
import { getPuzzleById } from "../api/api_puzzle";

export function usePuzzleFetchHook(id) {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles", id],
    queryFn: () => getPuzzleById(id),
    enabled: !!id,
  });

  const puzzle = puzzlesQuery.data ?? null;

  console.log("Puzzle data from hook:", puzzle);

  return {
    puzzle,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
