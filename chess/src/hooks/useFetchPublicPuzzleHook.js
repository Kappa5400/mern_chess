import { useQuery } from "@tanstack/react-query";
import { getPublicPuzzleByID } from "../api/api_user_puzzle";

export function useFetchPublicPuzzleHook(id) {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles", id],
    queryFn: () => getPublicPuzzleByID(id),
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
