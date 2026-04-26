import { useQuery } from "@tanstack/react-query";
import { getPuzzleByPuzzleID } from "../api/api_user_puzzle";

export function useUserPuzzleFetchHook(id) {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles", id],
    queryFn: () => getPuzzleByPuzzleID(id),
    enabled: !!id,
  });

  const puzzle = puzzlesQuery.data ?? null;

  return {
    puzzle,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
