import { useQuery } from "@tanstack/react-query";
import { getUserPuzzles } from "../api/api_user_puzzle";
import { useAuth } from "../contexts/AuthContext";

export function useFetchAllOwnuserPuzzles() {
  const [token] = useAuth();

  const puzzlesQuery = useQuery({
    queryKey: ["OwnUserPuzzles"],
    queryFn: getUserPuzzles,
    enabled: !!token,
    staleTime: 0,
    gcTime: 0,
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
