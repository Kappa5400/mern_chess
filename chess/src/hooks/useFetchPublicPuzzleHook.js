import { useQuery } from "@tanstack/react-query";
import { getPublicPuzzleByID } from "../api/api_user_puzzle";

export function useFetchPublicPuzzleHook(id) {
  console.log("Hook id ", id);
  const puzzlesQuery = useQuery({
    queryKey: ["PublicPuzzle", id],
    queryFn: () => getPublicPuzzleByID(id),
    enabled: !!id,
  });

  const puzzle = puzzlesQuery.data;

  console.log("Puzzle data from hook:", puzzle);

  return {
    puzzle,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
