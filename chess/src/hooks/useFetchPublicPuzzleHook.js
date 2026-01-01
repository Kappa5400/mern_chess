import { useQuery } from "@tanstack/react-query";
import { getPublicPuzzleByID } from "../api/api_user_puzzle";

export function useFetchPublicPuzzleHook(id) {
  const puzzlesQuery = useQuery({
    queryKey: ["PublicUserPuzzle", id],
    queryFn: () => getPublicPuzzleByID(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });

  const puzzle = puzzlesQuery.data;

  return {
    puzzle,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
