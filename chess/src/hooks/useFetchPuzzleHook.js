import { useQuery } from "@tanstack/react-query";
import { getPuzzleById } from "../api/api_puzzle";

export function usePuzzleFetchHook(id) {
  const puzzlesQuery = useQuery({
    queryKey: ["SinglePuzzle", id],
    queryFn: () => getPuzzleById(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
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
